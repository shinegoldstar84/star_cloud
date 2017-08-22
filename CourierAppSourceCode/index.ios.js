/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import codePush                 from "react-native-code-push";

export default class AlopeykCourier extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

/*============================================
=            CodePush-ify the App            =
============================================*/

/**
 * Alternatively, if you want fine-grained control over when the check happens
 * (e.g. a button press or timer interval), you can call CodePush.sync() at any time with your desired SyncOptions,
 * and optionally turn off CodePush’s automatic checking by specifying a manual checkFrequency:
 * 
 * let codePushOptions = { checkFrequency: codePush.CheckFrequency.MANUAL };
 * class MyApp extends Component {
 *     onButtonPress() {
 *         codePush.sync({
 *             updateDialog: true,
 *             installMode: codePush.InstallMode.IMMEDIATE
 *         });
 *     }
 * 
 *     render() {
 *         <View>
 *             <TouchableOpacity onPress={this.onButtonPress}>
 *                 <Text>Check for updates</Text>
 *             </TouchableOpacity>
 *         </View>
 *     }
 * }
 * 
 * MyApp = codePush(codePushOptions)(MyApp);
 *
 */

let codePushOptions =
{
  updateDialog: false,
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.IMMEDIATE
};
AlopeykCourier = codePush( codePushOptions )( AlopeykCourier );

/*=====  End of CodePush-ify the App  ======*/

AppRegistry.registerComponent('AlopeykCourier', () => AlopeykCourier);
