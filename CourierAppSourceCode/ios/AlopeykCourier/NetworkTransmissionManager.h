//
//  DownloadManager.h
//  AlopeykCourier
//
//  Created by water on 8/25/17.
//  Copyright © 2017 Facebook. All rights reserved.
//

#ifndef NetworkTransmissionManager_h
#define NetworkTransmissionManager_h

#import <Foundation/Foundation.h>

#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface NetworkTransmissionManager : RCTEventEmitter<RCTBridgeModule>

-(void) start:(NSString*)url body:(NSData*) body;

+(NetworkTransmissionManager *)sharedInstance;

@end

#endif /* NetworkTransmissionManager_h */
