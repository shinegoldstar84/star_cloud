import React 		from 'react';
import {
	View,
	StyleSheet,
	ScrollView
}	from 'react-native';
import Text 				from '../../custom/Text';
import Card 				from '../../custom/Card';
import Icon 				from '../../custom/Icon';
import { GetColor }			from '../../custom/Utils/color';
import Button 				from '../../custom/Button';
import { currencyFormat }	from '../../lib/Helpers';
import {
	PaddingStyles,
	BorderRadiusStyles
} from '../../config/styles';

export default function Reward( props )
{
	return (
		<ScrollView style={{ flex: 1, backgroundColor: GetColor('navy-a') }} contentContainerStyle={ styles.container }>
			<Card collapsed={ true } isLight>
				<View role="body" style={{ backgroundColor: '#eeeff1', borderTopLeftRadius: BorderRadiusStyles.few.borderRadius, borderTopRightRadius: BorderRadiusStyles.few.borderRadius, paddingTop: 30, paddingBottom: 20 }}>
					<View style={{ justifyContent: 'center', alignItems: 'center' }}>
						<Icon name="gift" size="extraLarge" style={{ marginBottom: 15 }} color={ GetColor( 'blue-a' ) } />
					</View>
					<Text color={ GetColor( 'blue-a' ) } align="center">
						دوستان و آشنایان خود را با استفاده از کد معرفی به الوپیک معرفی کنید و جایزه خود را دریافت کنید.
					</Text>
					<View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
						<View style={{ marginRight: 10, marginTop: 7 }}>
							<Text color={ GetColor( 'blue-a' ) } size="veryLarge" >کد</Text>
						</View>
						<View>
							<Text color={ GetColor( 'blue-a' ) } size="xveryLarge" isLatin style={{ fontWeight: 'bold' }}>{ props.referralCode }</Text>
						</View>
					</View>
				</View>
				<View role="footer" style={{ borderTopWidth: 0, paddingVertical: 20 }}>
					<View style={{ position: 'absolute', top: -10, left: '50%', marginLeft: 7.5, width: 15, height: 15, backgroundColor: '#eeeff1', transform: [{ rotate: '45deg' }] }} />
					<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
						<Button background="#fec540" color={ GetColor( 'white' ) } icon="message" onPress={ () => { props.share( 'sms' ) } } iconSize="large" radius="very" padding="medium" style={{ marginHorizontal: 5 }} />
						<Button background="#84c5f9" color={ GetColor( 'white' ) } icon="telegram" onPress={ () => { props.share( 'social' ) } } iconSize="large" radius="very" padding="medium" style={{ marginHorizontal: 5 }} />
						<Button background="#74cd20" color={ GetColor( 'white' ) } icon="pocket" onPress={ () => { props.share( 'email' ) } } iconSize="large" radius="very" padding="medium" style={{ marginHorizontal: 5 }} />
						<Button background="#ced4d8" color={ GetColor( 'white' ) } icon="dots" onPress={ () => { props.share( 'other' ) } } iconSize="large" radius="very" padding="medium" style={{ marginHorizontal: 5 }} />
					</View>
				</View>
			</Card>
			{/*
			<Text size="xlarge" align="center" color={ GetColor('white') } style={{ marginTop: 30 }}>فعالیت‌ها</Text>
			<Card isLight style={{ marginTop: 15 }}>
				<View role="body" style={{ ...PaddingStyles.none }}>
					<View style={ styles.infoRow }>
						<View style={{ flex: 1, paddingRight: 10 }}>
							<Text color={ GetColor('navy-f') }>سفیر ۱۰ درخواست انجام داده</Text>
						</View>
						<View style={{ alignItems: 'flex-end' }}>
							<Text color={ GetColor('navy-a') } size="large">33</Text>
						</View>
					</View>
					<View style={[ styles.infoRow, { borderBottomWidth: 0, backgroundColor: GetColor('gray-f'), borderBottomLeftRadius: BorderRadiusStyles.few.borderRadius, borderBottomRightRadius: BorderRadiusStyles.few.borderRadius } ]}>
						<View style={{ flex: 1 }}>
							<Text color={ GetColor('navy-f') }>درآمد کسب شده</Text>
						</View>
						<View style={{ alignItems: 'flex-end' }}>
							<Text>
								<Text color={ GetColor('gray-b') }>تومان  </Text>
								<Text color={ GetColor('navy-a') } size="xlarge" color={ GetColor('green-a') }>{ currencyFormat( 250000 ) }</Text>
							</Text>
						</View>
					</View>
				</View>
			</Card>
			*/}
		</ScrollView>
	);
}

const styles = StyleSheet.create(
{
	container: {
		paddingVertical: 25,
		paddingHorizontal: 15
	},
	infoRow: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderBottomWidth: 1,
		borderBottomColor: GetColor('gray-e')
	}
})