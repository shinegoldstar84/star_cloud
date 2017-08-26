//
//  Notify.h
//  AlopeykCourier
//
//  Created by water on 8/27/17.
//  Copyright © 2017 Facebook. All rights reserved.
//

#ifndef Notify_h
#define Notify_h

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

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

@interface Notify : RCTEventEmitter <RCTInvalidating>

@end

#endif /* Notify_h */
