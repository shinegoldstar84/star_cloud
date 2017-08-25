//
//  DownloadManager.m
//  AlopeykCourier
//
//  Created by water on 8/25/17.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import "NetworkTransmissionManager.h"
#import "AppDelegate.h"

static NSString *BackgroundSessionConfigurationID = @"SimpleBackgroundSessionConfiguration";

static NetworkTransmissionManager* _instance = nil;

@interface NetworkTransmissionManager()

@property (nonatomic) NSURLSession *session;
@property (nonatomic) NSURLSessionDataTask *dataTask;

@end

@implementation NetworkTransmissionManager

NSMutableData *_responseData;

// singleton method
+(NetworkTransmissionManager *)sharedInstance
{
  if(_instance == nil)
    _instance = [[NetworkTransmissionManager alloc] init];
  return _instance;
}


// send location info for get response
-(void) start:(NSString*)url body:(NSData*) body
{
  NSURLSession *session = [self backgroundSession];
  NSURL *requestURL = [NSURL URLWithString:url];
  NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:requestURL
                                                     cachePolicy:NSURLRequestUseProtocolCachePolicy
                                                     timeoutInterval:60.0];
  
  [request setHTTPMethod:@"POST"];
  
  // TODO: must resolve token value!!!
  NSString *strToken = @"";
  NSString* strAuth = [NSString stringWithFormat:@"%@ %@", @"Bearer", strToken];
  [request addValue:strAuth forHTTPHeaderField:@"Authorization"];
  
  [request setHTTPBody:body];
  
  NSURLSessionDataTask *task = [session dataTaskWithRequest:request
                                    completionHandler:^(NSData *data, NSURLResponse *response, NSError *error)
  {
    if (error) {
      NSLog(@"send location info failed!");
      return;
    }
    
    // Parse response/data and determine whether new content was available
    NSDictionary *dicResponse = (NSDictionary *)[NSJSONSerialization JSONObjectWithData:_responseData options:0 error:nil];
    if([[dicResponse objectForKey:@"response"] isEqualToString:@"success"])
    {
      // TODO: must wake up and bring to front
    }
    NSLog(@"server response received!");
  }];
  
  // Start the task
  [task resume];
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
    session = [NSURLSession sessionWithConfiguration:configuration delegate:self delegateQueue:nil];
  });
  return session;
}
@end
