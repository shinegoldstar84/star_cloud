import { NativeModules, Platform }	from 'react-native';

if(Platform.OS == 'android')
{
	module.exports = NativeModules.BringToFront;	
}