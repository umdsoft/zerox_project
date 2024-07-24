//
//  MyIdModule.m
//  zerox
//
//  Created by AlisherRakhimov on 10/04/23.
//

#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"
#import "React/RCTEventEmitter.h"

@interface RCT_EXTERN_MODULE(MyIdModule, RCTEventEmitter)

RCT_EXTERN_METHOD(startMyId)

//RCT_EXTERN_METHOD(startMyId:
//  (NSString *) clientId
//  (NSString *) passportData
//  (NSString *) dateOfBirth
//)

@end
