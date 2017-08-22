import React 			from 'react';
import { 
	View,
	Image,
	StyleSheet,
	ScrollView,
	ActivityIndicator,
	TouchableHighlight
}	from 'react-native';
import Avatar 					from '../../custom/Avatar';
import Text 					from '../../custom/Text';
import Icon 					from '../../custom/Icon';
import Card 					from '../../custom/Card';
import { GetColor }				from '../../custom/Utils/color';
import {
	PaddingStyles,
	DisabledStyles,
	BorderRadiusStyles
} from '../../config/styles';

export default function Leaderboard( props )
{
	return(
		<ScrollView style={{ flex: 1, backgroundColor: GetColor('navy-a') }} contentContainerStyle={ styles.container }>
			<View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 30 }} >
				<Icon name='gift' color={ GetColor( 'blue-a' ) } style={{ fontSize: 96, marginBottom: 10 }} />
				<Text size='xlarge' style={{ marginBottom: 10 }}>معرفی کنید و جایزه بگیرید</Text>
				<Text color={ GetColor('gray-d') } align="center" style={{ marginBottom: 20 }}>دوستان وآشنایان خود را با استفاده از کد معرفی به الوپیک معرفی کنید و جایزه خود را دریافت کنید.</Text>
				<TouchableHighlight
					disabled={ props.isLoading }
					onPress={ () => props.navigation.navigate( 'Reward' ) }
					underlayColor={ GetColor('gray-f') }
					style={[{ width: '100%', backgroundColor: GetColor('white'), paddingHorizontal: 25, paddingVertical: 20, ...BorderRadiusStyles.few }, props.isLoading ? DisabledStyles : {}]}
				>
					<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
						<Text size="xlarge" color={ GetColor('navy-c') }>معرفی به الوپیک</Text>
						<Icon name="arrow-left" color={ GetColor('navy-c') } size={12} />
					</View>
				</TouchableHighlight>
			</View>
			<View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 20 }} >
				<Icon name='medal' color={ GetColor( 'blue-a' ) } style={{ fontSize: 96, marginBottom: 10 }} />
				<Text size='xlarge' >سفیران برتر هفته جاری</Text>
			</View>
			<Card isLight>
				<View role="body" style={{ ...PaddingStyles.none }}>
					<View style={[ styles.row, { paddingVertical: 10, borderBottomWidth: 1.5 } ]}>
						<View style={[ styles.tableCol, styles.colSmall ]}>
							<Text style={ styles.rowItem } color='black'>رتبه</Text>
						</View>
						<View style={[ styles.tableCol, styles.colSmall ]}>
							<Text style={ styles.rowItem } color='black'></Text>
						</View>
						<View style={[ styles.tableCol, styles.colLarge, { justifyContent: 'flex-start' } ]}>
							<Text style={ styles.rowItem } color='black'>نام</Text>
						</View>
						<View style={[ styles.tableCol, styles.colMedium ]}>
							<Text style={ styles.rowItem } color='black'>امتیاز</Text>
						</View>
						{/*<View style={[ styles.tableCol, styles.colMedium ]}>
							<Text style={ styles.rowItem } color='black'>درخواست</Text>
						</View>
						<View style={[ styles.tableCol, styles.colMedium ]}>
							<Text style={ styles.rowItem } color='black'>دعوت</Text>
						</View>*/}
					</View>
					{
						props.items && props.items.length 
						?
						props.items.map( ( item, index ) => {
							return renderListItem( item, index, props );
						})
						:
						<ActivityIndicator 
							animating={ true }
							color="#fff"
						/>
					}
					{/* <TouchableHighlight
						underlayColor="transparent"
						onPress={ props.navigation.navigate( 'Score' ) }
					>
					</TouchableHighlight> */}
					{
						props.userData && ( ! props.userData.leader_board_rate || props.userData.leader_board_rate > props.items.length )
						?
						<View style={[ styles.row, { backgroundColor: GetColor( 'gray-f' ), borderBottomLeftRadius: BorderRadiusStyles.few.borderRadius, borderBottomRightRadius: BorderRadiusStyles.few.borderRadius } ]}>
							<View style={[ styles.tableCol, styles.colSmall ]} >
								<Text style={ styles.rowItem } color={ GetColor('blue-a') } size={ 13 }>{ props.userData && props.userData.leader_board_rate }</Text>
							</View>
							<View style={[ styles.tableCol, styles.colSmall ]} >
								<Avatar style={ styles.rowItem } url={ props.userData && props.userData.avatar && props.userData.avatar.url } width={50} height={50} />
							</View>
							<View style={[ styles.tableCol, styles.colLarge, { justifyContent: 'flex-start' } ]} >
								<Text style={ styles.rowItem } color={ GetColor('blue-a') } size={ 13 }>{ props.name }</Text>
							</View>
							<View style={[ styles.tableCol, styles.colMedium ]} >
								<Text style={ styles.rowItem } color={ GetColor('blue-a') } size={ 16 }>{ props.userData.weekly_score ? props.userData.weekly_score : 0 }</Text>
							</View>
							{/*
							<View style={[ styles.tableCol, styles.colMedium ]} >
								<Text style={ styles.rowItem } color={ GetColor('blue-a') } size={ 13 }>{ props.userData && props.userData.leader_board_orders && props.userData.leader_board_orders.week_filled_orders }</Text>
							</View>
							<View style={[ styles.tableCol, styles.colMedium ]} >
								<Text style={ styles.rowItem } color={ GetColor('blue-a') } size={ 13 }>{ props.userData && props.userData.leader_board_referres && props.userData.leader_board_referres.week_referrals }</Text>
							</View>
							*/}
							{/*<Icon name="arrow-left" color={ GetColor('blue-a') } size="small" style={{ position: 'absolute', top: 25, right: 10 }} />*/}
						</View>
						: null
					}
				</View>
			</Card>
		</ScrollView>
	)
}

function renderListItem( item, index, props )
{
	var darkColor, lightColor,
		itsMe = item.leader_board_rate == props.userData.leader_board_rate;
	switch( parseInt( item.leader_board_rate ) ) {
		case 1:
			lightColor = '#fab44c';
			darkColor = '#ffd05c';
			break;
		case 2:
			lightColor = '#e5e5e5';
			darkColor = '#a3a3a3';
			break;
		case 3:
			lightColor = '#c5704b';
			darkColor = '#963e0f';
			break;
		default:
			lightColor = null;
			darkColor = null;
	};
	var listItem = (
		<View key={ index } style={[ styles.row, { backgroundColor: GetColor( itsMe ? 'gray-f' : 'white' ) }, props.userData.leader_board_rate <= props.items.length && ( index == props.items.length - 1 ) ? { borderBottomLeftRadius: BorderRadiusStyles.few.borderRadius, borderBottomRightRadius: BorderRadiusStyles.few.borderRadius } : {} ]}>
			<View style={[ styles.tableCol, styles.colSmall ]} >
				<Text style={ styles.rowItem } color={ GetColor( itsMe ? 'blue-a' : 'navy-f' ) } size={ 13 }>{ item.leader_board_rate }</Text>
			</View>
			<View style={[ styles.tableCol, styles.colSmall ]} >
				<Avatar style={ styles.rowItem } url={ item.avatar && item.avatar.url } width={50} height={50} />
				{
					item.leader_board_rate < 4 ?
					<View style={{ position: 'absolute', bottom: 0, right: 0 }}>
						<Icon name="badge" color={ darkColor } size={ 20 } />
						<View style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' }}>
							<Icon name="star" color={ lightColor } size={ 9.6 } />
						</View>
						<View style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' }}>
							<View style={{ width: 15.2, height: 15.2, borderRadius: 7.6, borderWidth: 1, borderColor: lightColor }} />
						</View>
					</View>
					: null
				}
			</View>
			<View style={[ styles.tableCol, styles.colLarge, { justifyContent: 'flex-start' } ]} >
				<Text style={ styles.rowItem } color={ GetColor( itsMe ? 'blue-a' : 'navy-f' ) } size={ 13 }>{ item.firstname + ' ' + item.lastname }</Text>
			</View>
			<View style={[ styles.tableCol, styles.colMedium ]} >
				<Text style={ styles.rowItem } color={ GetColor( itsMe ? 'blue-a' : 'navy-d' ) } size={ 16 }>{ item.weekly_score }</Text>
			</View>
			{/*
				<View style={[ styles.tableCol, styles.colMedium ]} >
					<Text style={ styles.rowItem } color={ GetColor('navy-f') } size={ 13 }>{ item.leader_board_orders && item.leader_board_orders.week_filled_orders }</Text>
				</View>
				<View style={[ styles.tableCol, styles.colMedium ]} >
					<Text style={ styles.rowItem } color={ GetColor('navy-f') } size={ 13 }>{ item.leader_board_referres && item.leader_board_referres.week_referrals }</Text>
				</View>
			*/}
			{/*
				itsMe ?
				<Icon name="arrow-left" color={ GetColor('blue-a') } size="small" style={{ position: 'absolute', top: 25, right: 10 }} />
				: null
			*/}
		</View>
	);
	return listItem;
	{/* itsMe ? (
		<TouchableHighlight
			underlayColor="transparent"
			onPress={ props.navigation.navigate( 'Score' ) }
		>
			{ listItem }
		</TouchableHighlight>
	) : listItem */}
}

const styles = StyleSheet.create(
{
	container: {
		paddingVertical: 25,
		paddingHorizontal: 15
	},
	row: {
		paddingHorizontal: 10,
		paddingVertical: 5,
		flexDirection: 'row',
		justifyContent: 'space-around',
		borderBottomWidth: 1,
		borderBottomColor: 'rgba( 0, 0, 0, 0.05 )'
	},
	avatar: {
		height: 50,
		width: 50
	},
	bigText: {
		fontSize: 22,
		fontWeight: 'bold'
	},
	textColorWhite: {
		color: '#fff'
	},
	rowItem: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	tableCol: {
		// width: '16.666666%',
		flexDirection: 'row',
		// flexGrow: 1,
		alignItems: 'center',
		justifyContent: 'center',
		// textAlign: 'center'
	},
	colLarge: {
		flex: 2,
		paddingHorizontal: 15
	},
	colMedium: {
		flex: 1,
	},
	colSmall: {
		flex: 0.75
	}
})