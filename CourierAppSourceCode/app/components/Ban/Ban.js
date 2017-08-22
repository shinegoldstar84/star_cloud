import React from 'react';
import { 
	View,
	StyleSheet
} from 'react-native';
import Button 			from '../../custom/Button';
import Text   			from '../../custom/Text';
import Icon   			from '../../custom/Icon';
import { GetColor }		from '../../custom/Utils/color';

export default function Ban( props )
{

	return (
		<View style={ styles.container } >
			<Icon name='cross-circled' color={ GetColor( 'red-a' ) } style={{ fontSize: 100, marginTop: 20, marginBottom: 20 }} />
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
				<Text size='xlarge' style={{ textAlign: 'center', marginBottom: 20 }} >{ props.text }</Text>
				<Button 
					title="تلاش مجدد" 
					onPress={ props.retry } 
					size='xlarge'
					padding='large'
					color='black'
					background='white'
					radius='few'
					isLoading={ props.isLoading }
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
		// justifyContent: 'center',
		alignItems: 'center'
	}
})