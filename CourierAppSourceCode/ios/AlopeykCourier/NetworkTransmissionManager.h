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

@interface NetworkTransmissionManager : NSObject

-(void) start:(NSString*)url body:(NSData*) body;

+(NetworkTransmissionManager *)sharedInstance;

@end

#endif /* NetworkTransmissionManager_h */
