
import React, { PropTypes, Component } from 'react';

import {
  View,
  NetInfo,
  I18nManager,
  Text,
  StyleSheet,
  Button,
  AppRegistry, 
  NativeModules,
  NativeEventEmitter
} from 'react-native';

import { showAlert }    from './app/lib/Helpers';
import codePush         from "react-native-code-push";
import BackgroundGeolocation from './app/lib_ios/Backgroundgeolocation'
import Notify           from './app/lib_ios/Notify'
// import NetworkMonitor   from './app/lib_ios/NetworkMonitor'

var NetworkTransmissionManager = NativeModules.NetworkTransmissionManager;
const myNativeExt = new NativeEventEmitter(NetworkTransmissionManager);


export default class AlopeykCourier extends Component {
  
  constructor(props) {
    super(props);
    I18nManager.forceRTL(true);
    
    this.state = {online: false, connected: true, nTimerID: 0};        
  }

  componentWillMount() 
  { 
    /* Check online status */
      NetInfo.isConnected.fetch().then(isConnected => {
        this.setState(previousState => {
          return ({online: isConnected});
        });        
      });

      /*  monitoring online status change */
      NetInfo.isConnected.addEventListener( 'change', ( isConnected ) =>
      {
        this.setState(previousState => {
          return ({online: isConnected});
        });   

        if ( !isConnected )
        {
          showAlert( 'Network connection failed!' );
        }
      });

      NetworkTransmissionManager.connectWithNative(); // must call this before add listener to notifying native for singleton object setting
      this.listener = myNativeExt.addListener('positionHttpResponse', this.onBgLocationResponse.bind(this));
  }

  _onPressButton() 
  {
    // reset connected state
    this.setState(previousState => {
        return ({ connected: !previousState.connected});
      });

    console.log('button state: ', this.state.connected);

    if(this.state.connected) 
    {      
      BackgroundGeolocation.start(function(state) {
        if(state.enabled)
        {
          console.log('backgroundgeolocation started normally.');
          
          //Fetch current position
          // BackgroundGeolocation.getCurrentPosition({}, function(location) {
          //   console.log('- [js] location data received current position: ', location);
          // }, function(error) {
          //   console.log('location data receive error: ', error);
          // });
        }              
      });           
    }
    else
    {
      BackgroundGeolocation.stop();
    }    
  }    

  /**
   * handles the BGLocation Http Response.
   * @returns Promise
   */
  onBgLocationResponse( response )
  {
    console.log('received the event message!!!');

    return new Promise( resolve =>
    {
      if ( response )
      {
        console.log('received response', response);
        Notify.showNotification({id: 12345, title:'Order', content:'New order came'});

      //   try
      //   {
          
      //     const { object } = JSON.parse( response );
      //     if ( object )
      //     {
            
      //     }
      //     resolve();
      //   }
      //   catch( e )
      //   {
      //     console.log( 'JSONPARSE: ', e );
      //   }
      }
    });
  }

  componentWillUnmount() {
    this.listener && this.listener.remove();
    this.listener = null;
  }

  render() 
  {
    let strTitle = this.state.connected ? 'Start' : 'Stop';
    return (      
        <View style={styles.container}> 
          <Text style={styles.welcome}>
            Please press button for test!
          </Text>
          <Button
            onPress={() => this._onPressButton()}
            title={strTitle}
            color="#841584"
            accessibilityLabel="localhost test button"
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



