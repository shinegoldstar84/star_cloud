import React from 'react';
import {
	View,
	StyleSheet
} from 'react-native';
import Button 			from '../../custom/Button';
import Text   			from '../../custom/Text';
import Icon   			from '../../custom/Icon';
import { GetColor }		from '../../custom/Utils/color';

export default function BanWarning( props )
{
	return (
		<View style={ styles.container }>
			<Icon name='info' color={ GetColor( 'red-a' ) } style={{ fontSize: 100, marginTop: 20, padding: 8 }} />
			<Text size='veryLarge' >هشدار</Text>
			<View style={ styles.box } >
				{
					props.keys && props.keys.map( ( key, index ) =>
					{
						return <Text size='xlarge' key={ index } color='white'>{ ' - ' + props.warnings[ key ] }</Text>;
					})
				}
			</View>
			<Text size='xxlarge' color={ GetColor( 'red-a' ) } style={ styles.mt10, { textAlign: 'center' } }>باعث مسدود شدن حساب شما خواهد شد.</Text>
		</View>
	);
}

const styles = StyleSheet.create(
{
	container: {
		flex: 1,
		backgroundColor: GetColor( 'navy-b' ),
		alignItems: 'center',
		paddingHorizontal: 15
	},
	box: {
		marginTop: 20
	},
	mt10: {
		marginTop: 30
	}
})