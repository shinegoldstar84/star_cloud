//
//  Notify.m
//  AlopeykCourier
//
//  Created by water on 8/27/17.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import "Notify.h"

#if __has_include("RCTEventDispatcher.h")
#import "RCTEventDispatcher.h"
#else
#import <React/RCTEventDispatcher.h>
#endif

@implementation Notify

RCT_EXPORT_METHOD(showNotification:(NSDictionary *)map)
{
  if([[UIApplication sharedApplication] applicationState] == UIApplicationStateBackground)
  {
    UILocalNotification* notification = [[UILocalNotification alloc] init];
    [notification setUserInfo:@{@"UUID":[map objectForKey:@"id"]}];
    [notification setAlertTitle:[map objectForKey:@"title"]];
    [notification setAlertBody:[map objectForKey:@"content"]];
    [[UIApplication sharedApplication] presentLocalNotificationNow:notification];
  }
}

- (void)invalidate
{
  
}

@end