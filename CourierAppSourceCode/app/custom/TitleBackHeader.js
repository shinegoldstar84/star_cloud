import React from 'react';
import {
	View,
	StyleSheet,
	TouchableHighlight
} 	from 'react-native';
import Text 				from './Text';
import { GetColor }			from './Utils/color';
import { PaddingStyles }	from '../config/styles';
import Icon 				from './Icon';
import { Platform } 		from 'react-native';

export default function TitleBackHeader( props, title )
{
	const data = props.scene && typeof props.getScreenDetails === 'function'
				? props.getScreenDetails( props.scene )
				: { options: { title: title ? title : '', hideBackIcon: false, hideBackText: false } };
	const { navigation } = props;
	title = title ? title : data.options.title;
	return (
		<View style={{ backgroundColor: GetColor( 'navy-a' ) }}>
			<View style={[ styles.container ]}>
				<TouchableHighlight
					onPress={ () => 
						{
							if ( data && data.options && data.options.backNav )
							{
								data.options.backNav();
							}
							else
							{
								navigation.goBack() 
							}
						}
					}
					underlayColor='transparent'
					style={ styles.iconBox }
				>
					<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} >
						{
							!data.options.hideBackIcon
							? (
								<Icon 
									name="arrow-right"
									color={ GetColor( 'white' ) }
									style={{ marginRight: 5 }}
									size="xsmall"
								/>
							)
							: null
						}
						{
							!data.options.hideBackText
							?
							(
								<Text color={ GetColor( 'white' ) } style={ styles.backTitle }>{ 'برگشت' }</Text>
							)
							: null
						}
					</View>
				</TouchableHighlight>
				<View style={ styles.titleBox }>
					<Text color={ GetColor( 'white' ) } size='large' style={ styles.titleText }>{ title }</Text>
				</View>
			</View>
		</View>
	)
}

const styles =
{
	container:
	{
		flexDirection: 'row',
		flexWrap: 'nowrap',
		height: 46,
		justifyContent: 'flex-start',
		alignItems: 'center',
		position: 'relative',
		...PaddingStyles.medium,
	},
	titleBox:
	{
		flex: 1,
		justifyContent: 'center',
		flexDirection: 'row',
	},
	titleText:
	{
		// fontSize: 16,
		// fontWeight: '400',
	},
	iconBox:
	{
		zIndex: 1, 
		flexDirection: 'row',
		alignItems: 'center',
		position: 'absolute',
		top: 0,
		bottom:0,
		left: 0,
		paddingHorizontal: 15,
	},
	backTitle:
	{
		// fontSize: 14
	}
};