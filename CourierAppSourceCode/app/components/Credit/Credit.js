import React 		from 'react';
import { 
	View,
	TouchableNativeFeedback,
	StyleSheet,
	ScrollView,
	TouchableHighlight
}	from 'react-native';
import CustomChart 			from '../../custom/Chart';
import { currencyFormat }	from '../../lib/Helpers';
import Text 				from '../../custom/Text';
import Button 				from '../../custom/Button';
import Icon 				from '../../custom/Icon';
import Card 				from '../../custom/Card';
import { GetColor }			from '../../custom/Utils/color';
import {
	PaddingStyles
} from '../../config/styles';

export default function Credit( props )
{
	return (
		<ScrollView style={ styles.container } contentContainerStyle={{ paddingVertical: 25, paddingHorizontal: 15 }}>
			<Card style={ styles.content } isLight>
				<View role="header">
					<Text color={ GetColor('gray-a') } size="large">اعتبار</Text>
				</View>
				<View role="body" style={{ ...PaddingStyles.none }}>
					<View style={ styles.price }>
						<Text size='extraLarge' color={ GetColor( props.credit < 0 ? 'red-a' : 'green-a' ) } >
							{ currencyFormat( props.credit ? props.credit : 0 ) }
						</Text>
						<Text color={ GetColor( 'gray-a' ) } style={{ marginLeft: 10 }}>تومان</Text>
					</View>
					<View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', backgroundColor: GetColor('gray-f'), borderTopWidth: 1, borderTopColor: GetColor('gray-e') }} >
						<View style={{ marginHorizontal: 25, marginVertical: 10, flexDirection: 'row' }}>
							<Icon name='info' size='medium' color={ GetColor( 'gray-a', 0.9 ) } style={{ marginRight: 5, marginTop: 5 }} />
							<Text color={ GetColor( 'gray-a', 0.9 ) } >اعتبار شما به صورت روزانه به غیر از روزهای تعطیل رسمی به حسابتان واریز می‌شود.</Text>
						</View>
					</View>
				</View>
				<View role="footer">
					<View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginRight: 3 }}>
						<Button 
							title="مشاهده جزئیات"
							onPress={ props.transactionCallback }
							color={ GetColor('navy-f') }
							borderColor={ GetColor( 'navy-f' ) }
							padding="medium"
							radius="few"
							size="large"
							wide
							style={{ borderColor: GetColor('navy-f'), borderWidth: 1 }}
						/>
					</View>
					<View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginLeft: 3 }}>
						<TouchableHighlight 
							onPress={ props.topup }
							underlayColor="transparent"
							style={{ paddingVertical: 8, flex: 1, borderRadius: 5, backgroundColor: GetColor('gray-e'), alignItems: 'center', justifyContent: 'center' }}
						>
							<Text color={ GetColor('navy-f') }>افزایش اعتبار</Text>
						</TouchableHighlight>
						<TouchableHighlight
							onPress={ props.topup }
							style={{ width: 40, height: 40, borderRadius: 5, backgroundColor: GetColor('green-a'), marginLeft: -5, elevation: 3, alignItems: 'center', justifyContent: 'center' }}
						>
							<Icon name="plus" />
						</TouchableHighlight>
					</View>
				</View>
			</Card>
			<Card isLight style={{ marginTop: 5 }}>
				<View role="body" style={{ ...PaddingStyles.none }}>
					<View style={ styles.row } >
						<Text color={ GetColor('gray-a') } size='large' >درآمد روز</Text>
						<Text color={ GetColor( 'green-a' ) } size='large' >{ currencyFormat( props.dailyIncome ) } تومان</Text>
					</View>
					<View style={ styles.row } >
						<Text color={ GetColor('gray-a') } size='large' >درآمد هفته</Text>
						<Text color={ GetColor( 'green-a' ) } size='large' >{ currencyFormat( props.weeklyIncome ) } تومان</Text>
					</View>
					<View style={[ styles.row, { borderBottomWidth: 0 } ]} >
						<Text color={ GetColor('gray-a') } size='large' >درآمد ماه</Text>
						<Text color={ GetColor( 'green-a' ) } size='large' >{ currencyFormat( props.monthlyIncome ) } تومان</Text>
					</View>
				</View>
			</Card>
			<Card isLight style={{ marginTop: 5 }}>
				<View role="header">
					<Text color={ GetColor('gray-a') } size="large">درآمد</Text>
				</View>
				<View role="body">
					<View style={{ flex: 1, alignItems: 'center' }}>
						<CustomChart summaryData={ props.summaryData } changeFilter={ props.changeFilter } type="transactionsSummary" />
					</View>
				</View>
			</Card>
			<Card isLight style={{ marginTop: 5 }}>
				<View role="header">
					<Text color={ GetColor('gray-a') } size="large">ساعات آنلاین</Text>
				</View>
				<View role="body">
					<View style={{ flex: 1, alignItems: 'center' }}>
						<CustomChart summaryData={ props.onlineSummaryData } changeFilter={ props.changeFilter } type="onlineSummary" />
					</View>
				</View>
			</Card>
		</ScrollView>
	);
}

const styles = StyleSheet.create(
{
	container: {
		flex: 1,
		backgroundColor: GetColor('navy-a'),
	},
	content: {
		// height: 200,
		// backgroundColor: 'white',
		// padding: 8,
		// borderRadius: 6
	},
	alignRight: {
		// textAlign: 'right'
	},
	incomeStat: {
		height: 200,
		backgroundColor: 'white',
		padding: 8,
		borderRadius: 6,
		marginTop: 10,
		justifyContent: 'center',
		alignItems: 'center'
	},
	price: {
		flex: 1,
		// height: 200,
		paddingHorizontal: 20,
		paddingVertical: 20,
		flexDirection: 'row',
		backgroundColor: GetColor('gray-e'),
		justifyContent: 'center',
		alignItems: 'center',
		direction: 'rtl'
	},
	bigText: {
		textAlign: 'center',
		fontSize: 24

	},
	textColorGreen: {
		color: '#00c853',
	},
	textColorRed: {
		color: '#e53935',
	},
	button: {
		backgroundColor: '#fff',
		justifyContent: 'center',
		alignItems: 'center',
		height: 36,
		marginTop: 10,
		borderColor: 'black',
		borderWidth: 1,
		borderRadius: 4,

	},
	buttons: {
		flexDirection: 'row',
		marginTop: 20
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		flex: 1,
		alignItems: 'center',
		paddingHorizontal: 25,
		paddingVertical: 10,
		borderBottomWidth: 1,
		borderBottomColor: GetColor('gray-e')
	}
})