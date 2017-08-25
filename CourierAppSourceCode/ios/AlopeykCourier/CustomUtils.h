//
//  CustomUtils.h
//  AlopeykCourier
//
//  Created by water on 8/25/17.
//  Copyright © 2017 Facebook. All rights reserved.
//

#ifndef CustomUtils_h
#define CustomUtils_h

@interface CustomUtils : NSObject

// send location info to server and recieve response from server
-(void)processLocationInfo:(NSDictionary *)location;

// singleton method
+(CustomUtils *)sharedInstance;

@end

#endif /* CustomUtils_h */
