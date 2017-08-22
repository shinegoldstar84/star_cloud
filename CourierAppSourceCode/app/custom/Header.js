import React from 'react';
import {
	View,
	StyleSheet,
	TouchableHighlight,
	Keyboard,
	DeviceEventEmitter
} 	from 'react-native';
import Text 				from './Text';
import { GetColor }			from './Utils/color';
import { PaddingStyles }	from '../config/styles';
import Icon 				from './Icon';
import { Platform } 		from 'react-native';
import { 
	callToSupport,
	callToNumber
}	from '../lib/Helpers';

export default function Header( props, title )
{
	const data = props.scene && typeof props.getScreenDetails === 'function'
				? props.getScreenDetails( props.scene )
				: { options: { title: title ? title : '' } };
	const { navigation } = props;
	const { drawerOpen } = props;
	title = title ? title : data.options.title;
	return (
		<View style={{ backgroundColor: GetColor( 'navy-a' ) }}>
			<View style={[ styles.container ]}>
				<View style={ styles.titleWrapper }>
					<Text color={ GetColor( 'white' ) } size="xlarge">{ title }</Text>
					<View style={{ flexDirection: 'row' }}>
						<Icon name='info' color='white' size='xxlarge' onPress={ () => { DeviceEventEmitter.emit( 'show:info:modal', {} ) } } style={{ padding: 10 }} />
						<Icon name='headset' color='white' size='xxlarge' onPress={ callToSupport } style={{ marginLeft: 10, padding: 10 }} />
					</View>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create(
{
	container:
	{
		zIndex: 1,
		flexDirection: 'row',
		height: 46,
		alignItems: 'center',
	},
	iconWrapper:
	{
		zIndex: 1,
		position: 'absolute',
		top: 0,
		bottom: 0,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 15,
	},
	titleWrapper:
	{
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 8
	},
})