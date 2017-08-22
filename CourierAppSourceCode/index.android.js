import React, { Component } 	from 'react';
import {
	View,
	StatusBar,
	AppRegistry,
	NetInfo,
	I18nManager,
	Text,
	BackHandler
} from 'react-native';
import { Provider }				from 'react-redux';
import AppWithNavigationState 	from './app/navigators/AppNavigator';
import { store } 				from './app/store';
import { bgLocation }			from './app/lib/BGLocation';
import { showAlert }			from './app/lib/Helpers';
import Config 					from 'react-native-config';
import { GetColor }             from './app/custom/Utils/color';
import codePush                 from "react-native-code-push";

export default class AlopeykCourier extends Component
{

	constructor( props )
	{
		super(props);
		I18nManager.forceRTL(true);
	}

	componentWillMount() 
	{
		NetInfo.isConnected.addEventListener( 'change', ( isConnected ) =>
		{
			if ( !isConnected )
			{
				showAlert( 'عدم دسترسی به اینترنت. لطفا اینترنت دستگاه خود را روشن نمایید.' );
			}
		});
		BackHandler.addEventListener('hardwareBackPress', () =>
		{
			BackHandler.exitApp();
			return true;
		});
	}

	render()
	{
		return (
			<View style={{ flex: 1 }} >
				<StatusBar barStyle="light-content" backgroundColor={GetColor('navy-b')} />
				<Provider store={ store }>
					<AppWithNavigationState />
				</Provider>
				{
					Config.ENVIRONMENT != 'production' &&
						<View style={{ 
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
						}} >
							<View style={{ backgroundColor: GetColor( Config.ENVIRONMENT === 'staging' ? 'blue-a' : 'green-a' ), height: 100, width: 5 }} >

							</View>
						</View>
				}
			</View>
		);
	}
	
}

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
AppRegistry.registerHeadlessTask('HeadlessTask', () => require('./app/lib/HeadlessTask'));
AppRegistry.registerComponent('AlopeykCourier', () => AlopeykCourier);
