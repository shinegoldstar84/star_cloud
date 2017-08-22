import React from 'react';
import {
	Image,
	View,
	StyleSheet,
	Platform
}	from 'react-native';
import Text 			from '../../custom/Text';
import Button 			from '../../custom/Button';
import { GetColor }		from '../../custom/Utils/color';
import Calc 			from '../../assets/styles/calc';
import Video 			from 'react-native-video';

export default function Walkthrough( props )
{

	return (
		<View style={ styles.container } >
			<Video
				source={{ uri : 'video' + ( Platform.OS.toLowerCase() == 'ios' ? '.mp4' : '' ) }}
				rate={ 1 }
				muted={ true }
				paused={ false }
				resizeMode='cover'
				repeat={ true }
				style={ styles.video }
			/>
			<View style={ styles.content } >
				<Image source={ require( '../../assets/image/logo.png' ) } style={ styles.logo } />
			</View>
			<View style={ styles.bottomBox } >
				<Button 
					onPress={ props.navigate }
					color='white'
					background={ GetColor( 'blue-a' ) }
					size="xlarge"
					padding="xlarge"
					wide
					title="ورود"
				/>
			</View>
		</View>
	);

}

const styles = StyleSheet.create(
{
	container: {
		flex: 1,
		backgroundColor: GetColor( 'navy-a' ),
		padding: 24
	},
	bgBox: {
		...StyleSheet.absoluteFillObject,
		zIndex: -1,
		top: Calc.height( 50 ),
	},
	bgImage: {
		flex: 1,
		width: null,
		height: null,
	},
	content: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	logo: {
		width: 150,
		resizeMode: 'contain'
	},
	bottomBox: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0
	},
	video: {
		position: 'absolute',
    	top: 0,
    	left: 0,
    	bottom: 0,
    	right: 0,
    	flex: 1
	}
})