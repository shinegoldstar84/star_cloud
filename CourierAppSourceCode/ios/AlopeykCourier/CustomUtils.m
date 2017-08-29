//
//  CustomUtils.m
//  AlopeykCourier
//
//  Created by water on 8/25/17.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "CustomUtils.h"
#import "NetworkTransmissionManager.h"

#define KEY_MOCK_LOCATION @"???"

#define MINIMUM_LATITUDE_VALUE 32
#define MAXIMUM_LATITUDE_VALUE 37
#define MINIMUM_LONGITUDE_VALUE 49
#define MAXIMUM_LONGITUDE_VALUE 55

static BOOL CHECK_RANGE_FLAG  = NO; // for test

//static NSString *downloadURLString = @"http://localhost/";

static CustomUtils* _instance = nil;

@implementation CustomUtils

+(CustomUtils *)sharedInstance
{
  if(_instance == nil)
    _instance = [[CustomUtils alloc] init];
  return _instance;
}

// transform BOOL value to true/false type string
-(NSString *)GetBooleanString:(BOOL) value
{
    return value? @"true": @"false";
}

// confirm post message body
-(NSData *)getRequestBody:(NSDictionary*) location
{
  // get data from location object
  NSDictionary *dicCoords = (NSDictionary *)location[@"coords"];
  double valLatitude = [dicCoords[@"latitude"] doubleValue];
  double valLongitude = [dicCoords[@"longitude"] doubleValue];
  
  if(CHECK_RANGE_FLAG)
  {
    // check if location is in specified range
    if((valLatitude <= MINIMUM_LATITUDE_VALUE) || (valLatitude >= MAXIMUM_LATITUDE_VALUE)
       || (valLongitude <= MINIMUM_LONGITUDE_VALUE) || (valLongitude >= MAXIMUM_LONGITUDE_VALUE))
      return nil;
  }

  BOOL isMockLocation = NO;
  NSDictionary *dicExtras = (NSDictionary *)dicCoords[@"extras"];
  if(dicExtras != nil)
  {
    id mock = [dicExtras valueForKey:KEY_MOCK_LOCATION];
    if(mock != nil) isMockLocation = [mock boolValue];
  }
  
  BOOL isOffline = NO;
  
  // confirm body dictionary object
  NSMutableDictionary *dicCoordsNew = [NSMutableDictionary new];
  [dicCoordsNew setObject:[NSNumber numberWithDouble:valLatitude] forKey:@"latitude"];
  [dicCoordsNew setObject:[NSNumber numberWithDouble:valLongitude] forKey:@"longitude"];
  [dicCoordsNew setObject:[self GetBooleanString:isMockLocation] forKey:@"mock"];
  
  NSMutableDictionary *dicLocation= [NSMutableDictionary new];
  [dicLocation setObject:dicCoordsNew forKey:@"coords"];
  
  NSMutableDictionary*dicResult = [NSMutableDictionary new];
  [dicResult setObject:dicLocation forKey:@"location"];
  [dicResult setObject:[self GetBooleanString:isOffline] forKey:@"offline"];
  
  // convert to json object
  NSData* result = [NSJSONSerialization dataWithJSONObject:dicResult options:0 error:nil];
  return result;
}

-(NSString *)getRequestURL
{
  NSUserDefaults *preferences = [NSUserDefaults standardUserDefaults];
  return [preferences objectForKey:@"url"];
}

-(void)processLocationInfo:(NSDictionary *)location
{
  NSData *requestBody = [self getRequestBody:location];
  if(requestBody == nil) return;
  
  NSString *url = [self getRequestURL];
  [[NetworkTransmissionManager sharedInstance] start:url body:requestBody];  
}


@end
