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

static NSString *const KEY_GEO_TIMER_INTERVAL = @"bgGeoInterval";

@implementation BackgroundGeolocation {
  BOOL isConfigured;
  
  void(^onTimer)(NSTimer *);
  
  BOOL isMonitoring;
  
  NSTimer *timer;
  
}

@synthesize locationManager;

RCT_EXPORT_MODULE();

-(instancetype)init {
  if(self = [super init]) {
//    isConfigured = NO;
    timer = nil;
    isMonitoring = NO;
    
    __typeof(self) __weak me = self;
    
    // create & init location manager object
    locationManager = [[CLLocationManager alloc] init];
    [locationManager setAllowsBackgroundLocationUpdates:YES];
    [locationManager setDelegate:me];
    [locationManager setDistanceFilter:kCLHeadingFilterNone];
    [locationManager setPausesLocationUpdatesAutomatically:NO];
    [locationManager setDesiredAccuracy:kCLLocationAccuracyBest];
    [locationManager requestAlwaysAuthorization];
    
    // define timer
    onTimer = ^void(NSTimer *timer) {
      [me getCurrentPosition];
    };
  }
  
  return self;
}

/*  Implementation of RCTBridgeModule */
- (NSArray<NSString *> *)supportedEvents {
  return @[];
}

/*  
 *  Request current position to location manager
 */
-(void)getCurrentPosition {
  [locationManager requestLocation];
  [self processCurrentPosition:[locationManager location]];
}

-(void)processCurrentPosition:(CLLocation *)newLocation
{
  NSDateFormatter *df = [[NSDateFormatter alloc] init];
  [df setDateFormat:@"HH:mm:ss"];
  NSString* strTime = [df stringFromDate:newLocation.timestamp];
  NSLog(@"processed position info: (%.2f, %2f) -> %@", newLocation.coordinate.latitude, newLocation.coordinate.longitude, strTime);

  [[CustomUtils sharedInstance] processLocationInfo:newLocation];
}

/*  
 *  Processing after get a new location info  
 */
- (void)locationManager:(CLLocationManager *)manager
    didUpdateToLocation:(CLLocation *)newLocation
           fromLocation:(CLLocation *)oldLocation
{
//  NSLog(@"didUpdateTo & From method!");
}

- (void)locationManager:(CLLocationManager *)manager
     didUpdateLocations:(NSArray<CLLocation *> *)locations
{
//  NSLog(@"new location captured from didUpdate method!");
//  [self processCurrentPosition:[locations lastObject]];
}

- (void)locationManager:(CLLocationManager *)manager
       didFailWithError:(NSError *)error
{
//  NSLog(@"location get failed!");
}

- (void)locationManager:(CLLocationManager *)manager
didFinishDeferredUpdatesWithError:(NSError *)error
{
//  NSLog(@"didFinishDeferredUpdatesWithError");
}

/**
 * Turn on background geolocation
 */
RCT_EXPORT_METHOD(start:(RCTResponseSenderBlock)success failure:(RCTResponseSenderBlock)failure)
{
  if(![CLLocationManager locationServicesEnabled])
    failure(@[]);
  
  do{
    if(isMonitoring) break;
    
//    [locationManager startUpdatingLocation];
    
    // set default interval
    int nTimerInterval = 3;
    
    // get configured value and convert into seconds value
    id interval = [[NSUserDefaults standardUserDefaults] objectForKey:KEY_GEO_TIMER_INTERVAL];
    if(interval != nil) nTimerInterval = (int)([interval integerValue] / 1000);
    
    // create timer object and insert into runloop to execute
    timer = [NSTimer timerWithTimeInterval:nTimerInterval repeats:YES block:onTimer];
    [[NSRunLoop mainRunLoop] addTimer:timer forMode:NSRunLoopCommonModes];
    
    isMonitoring = YES;
  }while(NO);
  
  success(@[@{@"enabled":@YES}]);
}

/**
 * Turn it off
 */
RCT_EXPORT_METHOD(stop)
{
  if(!isMonitoring) return;
  
  isMonitoring = NO;
  
//  [locationManager stopUpdatingLocation];

  [timer invalidate];
  timer = nil;
}

/**
 *  Restart service
 */
-(void)restart {
  [self stop];
  [self start:^(NSArray *response) {} failure:^(NSArray *response) {}];
}

/*  
 *  Change previous configuration setting
 */
RCT_EXPORT_METHOD(setConfig:(NSDictionary*)config)
{
  // save configuration value to preference
  NSUserDefaults *preferences = [NSUserDefaults standardUserDefaults];
  for(NSString* key in [config allKeys])
  {
    [preferences setObject:[config objectForKey:key] forKey:key];
  }
  [preferences synchronize];
  
  // force restart
  [self restart];
}

/**
 * Configure service with specified parameters
 */
RCT_EXPORT_METHOD(configure:(NSDictionary*)config success:(RCTResponseSenderBlock)success)
{
  NSUserDefaults *preferences = [NSUserDefaults standardUserDefaults];

  for(NSString* key in [config allKeys])
  {
    [preferences setObject:[config objectForKey:key] forKey:key];
  }

  [preferences synchronize];

  success(@[@{@"enabled":@YES}]);
}

@end
