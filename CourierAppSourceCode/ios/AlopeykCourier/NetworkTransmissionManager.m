//
//  DownloadManager.m
//  AlopeykCourier
//
//  Created by water on 8/25/17.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import "NetworkTransmissionManager.h"
#import "AppDelegate.h"

#if __has_include("RCTEventDispatcher.h")
#import "RCTEventDispatcher.h"
#else
#import <React/RCTEventDispatcher.h>
#endif

static NSString *BackgroundSessionConfigurationID = @"SimpleBackgroundSessionConfiguration";

static const NSString* POSITION_HTTP_RESPONSE = @"positionHttpResponse";
static const NSString* POSITION_HTTP_REQUEST_FAIL = @"positionHttpRequestFail";

static NetworkTransmissionManager* _instance = nil;

@interface NetworkTransmissionManager()

@property (nonatomic) NSURLSession *session;
@property (nonatomic) NSURLSessionDataTask *dataTask;

@end

@implementation NetworkTransmissionManager

@synthesize bridge = _bridge;

NSMutableData *_responseData;
BOOL hasListeners;

RCT_EXPORT_MODULE();

// singleton method
+(NetworkTransmissionManager *)sharedInstance
{
  if(_instance == nil)
    _instance = [[NetworkTransmissionManager alloc] init];
  return _instance;
}

-(instancetype)init
{
  if(self = [super init])
  {
//    AppDelegate* delegate = (AppDelegate* )[[UIApplication sharedApplication] delegate];
//    [self setBridge:[delegate rootBridge]];
  }
  
  return self;
}

- (NSArray<NSString *> *)supportedEvents {
  return @[
           POSITION_HTTP_RESPONSE,
           POSITION_HTTP_REQUEST_FAIL
           ];
}

// send location info for get response
RCT_EXPORT_METHOD(start:(NSString*)url body:(NSData*) body)
{
  NSURLSession *session = [self backgroundSession];
  NSURL *requestURL = [NSURL URLWithString:url];
  NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:requestURL
                                                     cachePolicy:NSURLRequestUseProtocolCachePolicy
                                                     timeoutInterval:60.0];
  
  [request setHTTPMethod:@"POST"];
  
  NSUserDefaults *preferences = [NSUserDefaults standardUserDefaults];
  NSString *strToken = [preferences objectForKey:@"token"];
  NSString* strAuth = [NSString stringWithFormat:@"%@ %@", @"Bearer", strToken];
  [request addValue:strAuth forHTTPHeaderField:@"Authorization"];
  
  [request setHTTPBody:body];
  
  // comment for local test
  /*NSURLSessionDataTask *task = [session dataTaskWithRequest:request
                                    completionHandler:^(NSData *data, NSURLResponse *response, NSError *error)
  {
    if (error) {
      [self sendEvent:(NSString *)POSITION_HTTP_REQUEST_FAIL body:nil];
      return;
    }
    
    // Parse response/data and determine whether new content was available
    NSDictionary *dicResponse = (NSDictionary *)[NSJSONSerialization JSONObjectWithData:_responseData options:0 error:nil];
    [self sendEvent:(NSString *)POSITION_HTTP_RESPONSE body:dicResponse];
    NSLog(@"server response received!");
  }];
  
  // Start the task
  [task resume];*/  
  
  [self sendEventWithName:(NSString *)POSITION_HTTP_RESPONSE body:@{@"orderid":[NSNumber numberWithInteger:12345]}];

  NSLog(@"send location info finished!");
}

- (NSURLSession *)backgroundSession
{
  /*
   Using disptach_once here ensures that multiple background sessions with the same identifier are not created in this instance of the application. If you want to support multiple background sessions within a single process, you should create each session with its own identifier.
   */
  static NSURLSession *session = nil;
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    NSURLSessionConfiguration *configuration = [NSURLSessionConfiguration backgroundSessionConfigurationWithIdentifier:BackgroundSessionConfigurationID];
    configuration.sessionSendsLaunchEvents = YES;
    configuration.discretionary = YES;
    session = [NSURLSession sessionWithConfiguration:configuration];
  });
  return session;
}

// Will be called when this module's first listener is added.
-(void)startObserving {
  hasListeners = YES;
  
}

// Will be called when this module's last listener is removed, or on dealloc.
-(void)stopObserving {
  hasListeners = NO;
}

// Will be used for setting instance object as JS created object. 
RCT_EXPORT_METHOD(connectWithNative)
{
  _instance = self;
}

@end
