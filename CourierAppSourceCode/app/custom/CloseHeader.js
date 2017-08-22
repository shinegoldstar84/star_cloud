import React from 'react';
import {
	View,
	StyleSheet,
	TouchableHighlight,
	Platform
} 	from 'react-native';
import Text 				from './Text';
import { GetColor }			from './Utils/color';
import { PaddingStyles }	from '../config/styles';
import Icon 				from './Icon';

export default function CloseHeader( props, title )
{
	const data = props.scene && typeof props.getScreenDetails === 'function'
				? props.getScreenDetails( props.scene )
				: { options: { title: title ? title : '', middleText: '' } };
	const { navigation } = props;
	title = title ? title : data.options.title;

	return (
		<View style={ styles.container }>
			<TouchableHighlight
				underlayColor='transparent'
				style={{ padding: 15 }}
				onPress={ () =>
					{
						navigation.navigate( 'Main' )
					}
				}
			>
				<View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
					<Icon 
						name="cross-narrow"
						color={ GetColor( 'white' ) }
						style={{ marginRight: 2 }} 
						size="medium" 	
					/>
				</View>
			</TouchableHighlight>
		</View>
	)
}

const styles = StyleSheet.create(
{
	container: {
		zIndex: 1,
		flexDirection: 'row',
		height: 46,
		justifyContent: 'flex-start',
		alignItems: 'center',
		backgroundColor: GetColor( 'navy-a' ),
	}
})