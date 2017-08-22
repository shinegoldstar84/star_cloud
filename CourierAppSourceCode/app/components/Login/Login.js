import React 						from 'react';
import { 
	TextInput,
	StyleSheet,
	View 
} from 'react-native';
import Text 				from '../../custom/Text';
import Card 				from '../../custom/Card';
import { GetColor }			from '../../custom/Utils/color';
import FloatingLabel		from '../../custom/FloatingLabel';
import Button	           	from '../../custom/Button';
import Hyperlink			from 'react-native-hyperlink';

export default function Login( props )
{
	return (
		<View style={ styles.primary }>
			<View style={ styles.cardWrapper }>
				<Card isLight collapsed={ true }>
					<View role="header" headerStyles={ styles.cardHeader }>
						<Text color={ GetColor('blue-a') } size={ 17 }>به الوپیک خوش آمدید</Text>
					</View>
					<View role="body" >
						<FloatingLabel 
				        	onChangeText={ props.textChange }
				        	keyboardType='phone-pad'
				        	maxLength={ 11 }
				            autoFocus={ true }
				        >
				        	شماره تلفن همراه
				        </FloatingLabel>
					</View>
				</Card>
				<Hyperlink
					onPress={ () => props.launchRules() }
					style={ styles.hyperlink }
					linkStyle={ { color: GetColor('blue-a') } }
					linkText={ url => url === 'https://alopeyk.com/terms-couriers' ? 'قوانین و مقررات الو‌پیک' : url }
				>
					<Text size={ 14 } align="center">فشردن دکمه ادامه به معنای پذیرفتن https://alopeyk.com/terms-couriers می‌باشد.</Text>
				</Hyperlink>
			</View>
			<Button
				color={ GetColor('white') }
				background={ GetColor('blue-a') }
				isLoading={ props.isLoading }
				onPress={ props.handlePress }
				disabled={ props.disabled }
				title="ادامه"
				padding="large"
				size="xxlarge"
				wide
			/>
		</View>
	);
}

const styles = StyleSheet.create(
{
	primary:
	{
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: GetColor('navy-b')
	},
	cardWrapper:
	{
		flex: 1,
		margin: 15,
	},
	cardHeader:
	{
		flexDirection: 'column',
		alignItems: 'center',
		backgroundColor: GetColor('gray-d'),
		borderTopLeftRadius: 3,
		borderTopRightRadius: 3,
	},
	hyperlink:
	{
		// flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		flexWrap: 'wrap',
	},
	rules:
	{
		flex: 1,
		alignItems: 'flex-start',
	},
})