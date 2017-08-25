
import React, { PropTypes, Component } from 'react';

import {
  View,
  StatusBar,
  AppRegistry,
  NetInfo,
  I18nManager,
  Text,
  StyleSheet,
  Button
} from 'react-native';

import { Provider }       from 'react-redux';
// import AppWithNavigationState   from './app/navigators/AppNavigator';
// import { store }        from './app/store';
import { bgLocation }     from './app/lib/BGLocation';
import { showAlert }      from './app/lib/Helpers';
import Config           from 'react-native-config';
import { GetColor }             from './app/custom/Utils/color';
import codePush                 from "react-native-code-push";
// import NetworkMonitor from './app/lib_ios/NetworkMonitor'
import BackgroundGeolocation from './app/lib_ios/backgroundgeolocation'

export default class AlopeykCourier extends Component { 


  constructor(props) {
    super(props);
    this.state = {online: false, connected: true, nTimerID: 0};    

    // This handler fires whenever bgGeo receives a location update.
    // BackgroundGeolocation.on('location', function(location){
    //   console.log('location:', location);
    // });
  }

  componentWillMount() 
  {
      /* Check online status */
      NetInfo.isConnected.fetch().then(isConnected => {
        console.log('First, is ' + (isConnected ? 'online' : 'offline'));
        this.state.online = isConnected;
      });

      /*  monitoring online status change */
      NetInfo.isConnected.addEventListener( 'change', ( isConnected ) =>
      {
        this.state.online = isConnected;
        if ( !isConnected )
        {
          console.log('Network connection failed!');
          showAlert( 'Network connection failed!' );
        }
      });
  } 

  _onPressButton() 
  {
    // reset connected state
    this.setState(previousState => {
        return ({ connected: !previousState.connected});
      });

    if(this.state.connected) 
    {      
      BackgroundGeolocation.start(function(state) {
        if(state.enabled)
        {
          console.log('backgroundgeolocation started normally.');
          
          // Fetch current position
          BackgroundGeolocation.getCurrentPosition({}, function(location) {
            console.log('- [js] BackgroundGeolocation received current position: ', location);
          }, function(error) {
            console.log('BackgroundGeolocation receive error: ', error);
          });
        }              
      });

      // let nTimeInterval = 2000;   
      // let nID = setInterval(() => {
      //    // Fetch current position
      //     BackgroundGeolocation.getCurrentPosition({}, function(location) {
      //       console.log('- [js] BackgroundGeolocation received current position: ', location); //JSON.stringify(location));
      //     }, function(error){
      //       console.log('get location info failed -', error);
      //     });
      //   }, nTimeInterval);
      // this.setState({nTimerID: nID});      
    }
    else
    {
      // clearInterval(this.state.nTimerID);
      BackgroundGeolocation.stop();
    }    
  }       

  render() 
  {
    let strTitle = this.state.connected ? 'Start' : 'Stop';
    let isDiabled = !this.state.connected;
    return (      
        <View style={styles.container}> 
          <Button
            onPress={() => this._onPressButton()}
            title={strTitle}
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
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
  mainpart: {
    position: 'absolute',
    // left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    flex: 1,
    justifyContent: 'center',
    // zIndex: 1, 
    backgroundColor: 'transparent',
    alignItems: 'flex-end'
  }
});

/*============================================
=            CodePush-ify the App            =
============================================*/
let codePushOptions =
{
  updateDialog: false,
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.IMMEDIATE
};
AlopeykCourier = codePush( codePushOptions )( AlopeykCourier );

/*=====  End of CodePush-ify the App  ======*/
// AppRegistry.registerHeadlessTask('HeadlessTask', () => require('./app/lib/HeadlessTask'));
AppRegistry.registerComponent('AlopeykCourier', () => AlopeykCourier);



