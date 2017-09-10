//
//  BackgroundGeolocation.h
//  AlopeykCourier
//
//  Created by water on 8/24/17.
//  Copyright © 2017 Facebook. All rights reserved.
//

#ifndef BackgroundGeolocation_h
#define BackgroundGeolocation_h

#import <Foundation/Foundation.h>
#import <CoreLocation/CoreLocation.h>
#import <UIKit/UIKit.h>
#import <AudioToolbox/AudioToolbox.h>

#if __has_include("RCTEventEmitter.h")
#import "RCTEventEmitter.h"
#else
#import <React/RCTEventEmitter.h>
#endif

#if __has_include("RCTInvalidating.h")
#import "RCTInvalidating.h"
#else
#import <React/RCTInvalidating.h>
#endif

@interface BackgroundGeolocation : RCTEventEmitter <CLLocationManagerDelegate, RCTBridgeModule>


//@property (nonatomic, strong) TSLocationManager* locationManager;
@property (nonatomic, strong) CLLocationManager* locationManager;


@end

#endif /* BackgroundGeolocation_h */
