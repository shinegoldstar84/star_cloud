import React from 'react';
import { 
	Image,
	StyleSheet,
	StatusBar,
	ActivityIndicator,
	Platform,
	View
}	from 'react-native';
import { GetColor } from '../../custom/Utils/color';

export default function SplashScreen( props )
{
	return(
		<View style={{ flex: 1 }}>
			<View style={{ backgroundColor: GetColor('navy-b'), height: Platform.OS.toLowerCase() === 'ios' ? 20 : 0 }}>
				<StatusBar barStyle="light-content" backgroundColor={GetColor('navy-b')} />
			</View>
			<Image source={ require( '../../assets/image/screen.png' ) } style={ styles.splash }>
				<ActivityIndicator 
					animating={ true }
					color="#ffffff"
					style={ styles.loadingIndicator }
				/>
			</Image>
		</View>
	);
}

const styles = StyleSheet.create(
{
	splash: {
		flex: 1,
		width: null,
		height: null,
		justifyContent: 'center',
		alignItems: 'center'
	},
	loadingIndicator: {
		marginTop: '60%'
	}
})