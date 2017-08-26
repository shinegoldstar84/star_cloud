//
//  BackgroundGeolocation.m
//  AlopeykCourier
//
//  Created by water on 8/24/17.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import "BackgroundGeolocation.h"
#import "CustomUtils.h"

#if __has_include("RCTEventDispatcher.h")
#import "RCTEventDispatcher.h"
#else
#import <React/RCTEventDispatcher.h>
#endif

static NSString *const TS_LOCATION_MANAGER_TAG = @"TSLocationManager";
static NSString *const EVENT_LOCATIONCHANGE     = @"location";
static NSString *const EVENT_ERROR              = @"error";
static NSString *const KEY_GEO_TIMER_INTERVAL = @"bgGeoInterval";

// TODO: must implement here!
//BackgroundGeolocation.configure({
//desiredAccuracy: 0,
//stationaryRadius: 50,
//distanceFilter: 50,
//disableElasticity: true, // <-- [iOS] Default is 'false'.  Set true to disable speed-based distanceFilter elasticity
//locationUpdateInterval: 5000,
//minimumActivityRecognitionConfidence: 80,   // 0-100%.  Minimum activity-confidence for a state-change
//fastestLocationUpdateInterval: 5000,
//activityRecognitionInterval: 10000,
//stopTimeout: 0,
//activityType: 'AutomotiveNavigation',
//  
//  // Application config
//debug: true, // <-- enable this hear sounds for background-geolocation life-cycle.
//forceReloadOnLocationChange: false,  // <-- [Android] If the user closes the app **while location-tracking is started** , reboot app when a new location is recorded (WARNING: possibly distruptive to user)
//forceReloadOnMotionChange: false,    // <-- [Android] If the user closes the app **while location-tracking is started** , reboot app when device changes stationary-state (stationary->moving or vice-versa) --WARNING: possibly distruptive to user)
//forceReloadOnGeofence: false,        // <-- [Android] If the user closes the app **while location-tracking is started** , reboot app when a geofence crossing occurs --WARNING: possibly distruptive to user)
//stopOnTerminate: false,              // <-- [Android] Allow the background-service to run headless when user closes the app.
//startOnBoot: true,                   // <-- [Android] Auto start background-service in headless mode when device is powered-up.
//}, function(state) {
//  console.log("Background Geolocation configure successed.  Current state: ", state.enabled);
//}, function(error) {
//  console.warn("Background Geolocation failed to configure");
//}
//                                );

static BackgroundGeolocation *_instance = nil;

@implementation BackgroundGeolocation {
  BOOL isConfigured;
  
  NSMutableDictionary *listeners;
  
  void(^onLocation)(TSLocation*);
  void(^onLocationError)(NSError*);
  void(^onTimer)(NSTimer *);
  
  BOOL isMonitoring;
  
  NSTimer *timer;
  
}

@synthesize locationManager;

RCT_EXPORT_MODULE();

+(BackgroundGeolocation *)sharedInstance
{
  if(_instance == nil)
  {
    _instance = [[BackgroundGeolocation alloc] init];
  }
  
  return _instance;
}

-(instancetype)init {
  if(self = [super init]) {
    isConfigured = NO;
    timer = nil;
    isMonitoring = NO;
        
    __typeof(self) __weak me = self;
    
    // Build event-listener blocks
    onLocation = ^void(TSLocation *location) {
      [me sendEvent:EVENT_LOCATIONCHANGE body:[location toDictionary]];
      NSLog(@"Location changed:");
      
      [me postPosition:location];
    };
    
    onLocationError = ^void(NSError *error) {
      [me sendEvent:EVENT_ERROR body: @{@"type":@"location", @"code":@(error.code)}];
    };
    
    onTimer = ^void(NSTimer *timer) {
      [me getCurrentPosition];
    };
    
    // EventEmitter listener-counts
    listeners = [NSMutableDictionary new];
    
    // TSLocationManager instance
    locationManager = [TSLocationManager sharedInstance];
    
    // Provide reference to rootViewController for #emailLog method.
    UIViewController *root = [[[[UIApplication sharedApplication] delegate] window] rootViewController];
    locationManager.viewController = root;
  }
  
  return self;
}

- (NSArray<NSString *> *)supportedEvents {
  return @[
           EVENT_LOCATIONCHANGE,
           EVENT_ERROR
           ];
}

/**
 * configure plugin
 */
RCT_EXPORT_METHOD(configure:(NSDictionary*)config success:(RCTResponseSenderBlock)success failure:(RCTResponseSenderBlock)failure)
{
  NSUserDefaults *preferences = [NSUserDefaults standardUserDefaults];
  [preferences setObject:[config objectForKey:@"url"] forKey:@"url"];
  [preferences setObject:[config objectForKey:KEY_GEO_TIMER_INTERVAL] forKey:KEY_GEO_TIMER_INTERVAL];
  [preferences setObject:[config objectForKey:@"version"] forKey:@"version"];
  [preferences setObject:[config objectForKey:@"token"] forKey:@"token"];
  [preferences setObject:[NSNumber numberWithBool:NO] forKey:@"backgroundMode"];
  [preferences synchronize];
  
  success(@{@"enabled":[NSNumber numberWithBool:YES]});
  
//  if (isConfigured) {
//    [self setConfig:config success:success failure:failure];
//    return;
//  }
//  
//  dispatch_async(dispatch_get_main_queue(), ^{
//    NSDictionary *state = [locationManager configure:config];
//    isConfigured = (state != nil);
//    if (state != nil) {
//      success(@[state]);
//    } else {
//      failure(@[]);
//    }
//  });
}

RCT_EXPORT_METHOD(configure:(NSDictionary*)config success:(RCTResponseSenderBlock)success)
{
  [self configure:config success:success failure:nil];
}

//RCT_EXPORT_METHOD(setConfig:(NSDictionary*)config success:(RCTResponseSenderBlock)success failure:(RCTResponseSenderBlock)failure)
//{
//  NSDictionary *state = [locationManager setConfig:config];
//  success(@[state]);
//}

// configuration setting change process
RCT_EXPORT_METHOD(setConfig:(NSDictionary*)config)
{
  NSUserDefaults *preferences = [NSUserDefaults standardUserDefaults];
  for(NSString* key in [config allKeys])
  {
    [preferences setObject:[config objectForKey:key] forKey:key];
  }
  [preferences synchronize];
}

RCT_EXPORT_METHOD(addListener:(NSString*)event)
{
  // Careful:  we're overrideing a RCTEventEmitter method here.
  [super addListener:event];
  
  @synchronized(listeners) {
    if ([listeners objectForKey:event]) {
      // Increment listener-count for this event
      NSInteger count = [[listeners objectForKey:event] integerValue];
      count++;
      [listeners setObject:@(count) forKey:event];
    } else {
      // First listener for this event
      [listeners setObject:@(1) forKey:event];
      
      if ([event isEqualToString:EVENT_LOCATIONCHANGE]) {
          [locationManager onLocation:onLocation failure:onLocationError];
      }
    }
  }
}

RCT_EXPORT_METHOD(removeListener:(NSString*)event)
{
  @synchronized(listeners) {
    if ([listeners objectForKey:event]) {
      // Decrement listener-count for this event.
      NSInteger count = [[listeners objectForKey:event] integerValue];
      count--;
      if (count > 0) {
        [listeners setObject:@(count) forKey:event];
      } else {
        // No more listeners: tell TSLocationManager to removeListeners for this event.
        [locationManager removeListeners];
        [listeners removeObjectForKey:event];
      }
    }
  }
}

RCT_EXPORT_METHOD(removeAllListeners)
{
  @synchronized(listeners) { [listeners removeAllObjects]; }
  [locationManager removeListeners];
}

-(NSDictionary*)getState
{
  return [locationManager getState];
}

RCT_EXPORT_METHOD(getState:(RCTResponseSenderBlock)callback failure:(RCTResponseSenderBlock)failure)
{
  NSDictionary *state = [locationManager getState];
  callback(@[state]);
}

/**
 * Turn on background geolocation
 */
RCT_EXPORT_METHOD(start:(RCTResponseSenderBlock)success)
{
  if(!isConfigured || isMonitoring) return;
  
  dispatch_async(dispatch_get_main_queue(), ^{
    [locationManager start];
    success(@[[locationManager getState]]);
  });
  
  [self addListener:EVENT_LOCATIONCHANGE];
  
  isMonitoring = YES;
  
  // set default interval
  int nTimerInterval = 3;
  
  // get configured value and convert into seconds value
  id interval = [[NSUserDefaults standardUserDefaults] objectForKey:KEY_GEO_TIMER_INTERVAL];
  if(interval != nil) nTimerInterval = (int)([interval integerValue] / 1000);
  
  // create timer object and insert into runloop to execute
  timer = [NSTimer timerWithTimeInterval:nTimerInterval repeats:YES block:onTimer];
  [[NSRunLoop mainRunLoop] addTimer:timer forMode:NSRunLoopCommonModes];
}

/**
 * Turn it off
 */
//RCT_EXPORT_METHOD(stop:(RCTResponseSenderBlock)success failure:(RCTResponseSenderBlock)failure)
//{
//  [locationManager stop];
//  success(@[[locationManager getState]]);
//}
RCT_EXPORT_METHOD(stop)
{
  [locationManager stop];
  isMonitoring = NO;
  
  [timer invalidate];
  timer = nil;
}

RCT_EXPORT_METHOD(getCurrentPosition:(NSDictionary*)options success:(RCTResponseSenderBlock)success failure:(RCTResponseSenderBlock)failure)
{
  [locationManager getCurrentPosition:options success:^(TSLocation* location) {
    success(@[[location toDictionary]]);
  } failure:^(NSError* error) {
    failure(@[@(error.code)]);
  }];
}

RCT_EXPORT_METHOD(playSound:(int)soundId)
{
  [locationManager playSound: soundId];
}

//RCT_EXPORT_METHOD(on:(NSString *)event success:(RCTResponseSenderBlock)success)
//{
//  [[BackgroundGeolocation sharedInstance] addListener:event];
//  
//  if ([event isEqualToString:EVENT_LOCATIONCHANGE]) {
//    [locationManager onLocation:^(TSLocation* location) {
//      success(@[[location toDictionary]]);
//    } failure:onLocationError];
//  }
//}
//
//RCT_EXPORT_METHOD(un:(NSString *)event)
//{
//  [self removeListener:event];
//}

-(void)getCurrentPosition
{
  [locationManager getCurrentPosition:nil success:^(TSLocation* location) {
    [self postPosition:location];
  }  failure:^(NSError* error) {
    NSLog(@"get position error: %@", @[@(error.code)]);
  }];
}

-(void) postPosition:(TSLocation *)location
{
  NSDictionary* dicLocation = [location toDictionary];
  [[CustomUtils sharedInstance] processLocationInfo:dicLocation];
  NSLog(@"processed position info: %@", [dicLocation descriptionInStringsFileFormat]);
}

-(void) sendEvent:(NSString*)event body:(id)body
{
  [self sendEventWithName:event body:body];
}

- (void)invalidate
{
  [self removeAllListeners];
  dispatch_async(dispatch_get_main_queue(), ^{
    [locationManager stopWatchPosition];
  });
}

- (void)dealloc
{
  [self removeAllListeners];
  locationManager = nil;
}

@end
