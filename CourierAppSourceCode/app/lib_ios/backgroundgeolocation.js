/*============================================
=            Background Geolocation          =
============================================*/
'use strict';

import { NativeModules }  from 'react-native';

var BackgroundGeolocation = NativeModules.BackgroundGeolocation;
// var BackgroundGeolocation = require('react-native-background-geolocation');

// BackgroundGeolocation.configure({
//     desiredAccuracy: 0,
//     stationaryRadius: 50,
//     distanceFilter: 50,
//     disableElasticity: true, // <-- [iOS] Default is 'false'.  Set true to disable speed-based distanceFilter elasticity
//     locationUpdateInterval: 5000,
//     minimumActivityRecognitionConfidence: 80,   // 0-100%.  Minimum activity-confidence for a state-change 
//     fastestLocationUpdateInterval: 5000,
//     activityRecognitionInterval: 10000,
//     stopTimeout: 0,
//     activityType: 'AutomotiveNavigation',

//     // Application config
//     debug: true, // <-- enable this hear sounds for background-geolocation life-cycle.
//     forceReloadOnLocationChange: false,  // <-- [Android] If the user closes the app **while location-tracking is started** , reboot app when a new location is recorded (WARNING: possibly distruptive to user) 
//     forceReloadOnMotionChange: false,    // <-- [Android] If the user closes the app **while location-tracking is started** , reboot app when device changes stationary-state (stationary->moving or vice-versa) --WARNING: possibly distruptive to user) 
//     forceReloadOnGeofence: false,        // <-- [Android] If the user closes the app **while location-tracking is started** , reboot app when a geofence crossing occurs --WARNING: possibly distruptive to user) 
//     stopOnTerminate: false,              // <-- [Android] Allow the background-service to run headless when user closes the app.
//     startOnBoot: true,                   // <-- [Android] Auto start background-service in headless mode when device is powered-up.          
//   }, function(state) {
//       console.log("Background Geolocation configure successed.  Current state: ", state.enabled);  
//   }, function(error) {
//       console.warn("Background Geolocation failed to configure");
//   }
// );

module.exports = BackgroundGeolocation;