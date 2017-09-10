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

RCT_EXPORT_MODULE();

- (NSArray<NSString *> *)supportedEvents {
  return @[];
}

/**
 *  Show notification
 */
RCT_EXPORT_METHOD(showNotification:(NSDictionary *)map)
{
    UILocalNotification* notification = [[UILocalNotification alloc] init];
//    [notification setUserInfo:@{@"UUID":[map objectForKey:@"id"]}];
    notification.soundName = UILocalNotificationDefaultSoundName;
    notification.applicationIconBadgeNumber = notification.applicationIconBadgeNumber + 1;
    notification.alertTitle = [map objectForKey:@"title"];
  
    NSDateFormatter *df = [[NSDateFormatter alloc] init];
    [df setDateFormat:@"HH:mm:ss"];
    NSString* strTime = [df stringFromDate:[NSDate new]];
  
    notification.alertBody = [NSString stringWithFormat:@"%@ at %@", [map objectForKey:@"content"], strTime];
    [[UIApplication sharedApplication] presentLocalNotificationNow:notification];
//  }
}

- (void)invalidate
{
  
}

@end
