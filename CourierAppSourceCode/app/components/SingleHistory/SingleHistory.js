import React from 'react';
import { 
	View,
	Image,
	ScrollView,
	StyleSheet
} from 'react-native';
import { currencyFormat }	from '../../lib/Helpers';
import { persianDate } 		from '../../lib/PersianDate';
import Spinner 				from 'react-native-loading-spinner-overlay';
import Avatar 				from '../../custom/Avatar';
import Address 				from '../../custom/Address/index';
import Text 				from '../../custom/Text';
import Icon 				from '../../custom/Icon';
import { GetColor }			from '../../custom/Utils/color';
import {
	BorderRadiusStyles
} from '../../config/styles';

export default function SingleHistory( props )
{
	var avatarUrl = props.customer && props.customer.avatar ? props.customer.avatar.url.split('?')[0] : null;
	return (
		<ScrollView style={ styles.container }>
			<Spinner 
				visible={props.isLoading}
				size="large"
				overlayColor="rgba( 0, 0, 0, 0.7 )"
				textContent={"لطفا صبر کنید ..."}
				textStyle={{color: '#FFF'}} 
			/>
			<View style={{ marginBottom: 20 }} />
			<View style={ styles.content }>
				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<Text color={GetColor('gray-c')} size="small">شماره پیگیری #</Text>
					<Text color={GetColor('navy-a')} isLatin style={{ marginTop: -6 }}>{ props.invoice_number }</Text>
				</View>
				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<Text color={GetColor('gray-c')} size="small">تاریخ</Text>
					<Icon name="calendar" color={GetColor('gray-c')} size="small" style={{ marginLeft: 5 }}/>
					<Text color={GetColor('navy-a')} style={{ marginLeft: 5 }}>{ props.created_at ? persianDate.PersianCalendar( props.created_at ) : '-'}</Text>
				</View>
			</View>
			<View style={ styles.imageContainer }>
				{
					props.screenshot ? <Image source={{ uri: props.screenshot }} style={ styles.screenshot }/> : null
				}
			</View>
			<View style={{ flex: 1, paddingHorizontal: 20 }}>
				<View style={[ styles.price__row, { borderTopWidth: 0 } ]}>
					<Text color={GetColor('gray-c')} size="large" style={{ flex: 1, width: 0 }}>هزینه حمل</Text>
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<Text color={GetColor('navy-c')} size="small" color={GetColor('gray-c')} style={{ marginRight: 5 }}>تومان</Text>
						<Text color={GetColor(props.nprice ? 'navy-c' : 'green-a')} size={ props.nprice ? 'xlarge' : 'xxxlarge' }>{ currencyFormat(props.price) }</Text>
					</View>
				</View>
				{
					props.nprice ?
					<View>
						<View style={ styles.price__row }>
							<Text color={GetColor('gray-c')} size="large" style={{ flex: 1, width: 0 }}>درآمد مازاد</Text>
							<View style={{ flexDirection: 'row', alignItems: 'center' }}>
								<Text color={GetColor('navy-c')} size="small" color={GetColor('gray-c')} style={{ marginRight: 5 }}>تومان</Text>
								<Text color={GetColor('navy-c')} size="xlarge">{ currencyFormat(props.subsidy) }</Text>
							</View>
						</View>
						<View style={ styles.price__row }>
							<Text color={GetColor('gray-c')} size="large" style={{ flex: 1, width: 0 }}>هزینه حمل با احتساب درآمد مازاد</Text>
							<View style={{ flexDirection: 'row', alignItems: 'center' }}>
								<Text color={GetColor('navy-c')} size="small" color={GetColor('gray-c')} style={{ marginRight: 5 }}>تومان</Text>
								<Text color={GetColor('green-a')} size="xxxlarge">{ currencyFormat(props.nprice) }</Text>
							</View>
						</View>
					</View>
					: null
				}
				<View style={{ marginTop: 0, flex: 1, flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderBottomWidth: 1, borderColor: GetColor('gray-e') }}>
					<View style={[ styles.info__col, { borderBottomWidth: 1, borderBottomColor: GetColor('gray-e') } ]}>
						<Text color={GetColor('gray-c')} size="large">توقف</Text>
						<Text color={GetColor('navy-a')} size="large" style={{ marginTop: -5 }}>{ props.delay ? 'دارد' : 'ندارد' }</Text>
					</View>
					<View style={[ styles.info__col, { borderLeftWidth: 0, borderBottomWidth: 1, borderBottomColor: GetColor('gray-e') } ]}>
						<Text color={GetColor('gray-c')} size="large">برگشت</Text>
						<Text color={GetColor('navy-a')} size="large" style={{ marginTop: -5 }}>{ props.has_return ? 'دارد' : 'ندارد' }</Text>
					</View>
					<View style={ styles.info__col }>
						<Text color={GetColor('gray-c')} size="large">طرف پرداخت</Text>
						<Text color={GetColor('navy-a')} size="large" style={{ marginTop: -5 }}>{ props.pay_at_dest ? 'مقصد' : 'مبدا' }</Text>
					</View>
					<View style={[ styles.info__col, { borderLeftWidth: 0 } ]}>
						<Text color={GetColor('gray-c')} size="large">نوع پرداخت</Text>
						<Text color={GetColor('navy-a')} size="large" style={{ marginTop: -5 }}>{ props.credit ? 'اعتباری' : 'نقدی' }</Text>
					</View>
				</View>
			</View>
			<View>
				{
					props.addresses && Object.keys( props.addresses ).length ? props.addresses.map( ( addr, index ) =>
					{
						const addrType = addr.type == 'destination' ? addr.type : 'origin';
						const mainColor = GetColor( addrType === 'origin' ? 'orange-a' : 'green-a' );
						return (
							<View key={ addr.id }>
								<View style={{ paddingHorizontal: 20, flexDirection: 'row', alignItems : 'center', justifyContent: 'flex-start', borderBottomColor: GetColor('gray-e'), borderBottomWidth: 1, paddingVertical: 10 }}>
									{
										avatarUrl && addrType === 'origin' ?
										<View style={{ paddingRight: 10 }}>
											<Avatar url={ avatarUrl } width={ 50 } height={ 50 } />
										</View>
										: null
									}
									<View>
										<Text color={GetColor( addr.person_fullname ? 'gray-c' : 'navy-a' )} size={ addr.person_fullname ? 'small' : 'xlarge' }>{ props && props.transportType == 'motor_taxi' ? 'مسافر' : ( addrType === 'origin' ? 'مبدا' : 'مقصد' ) }</Text>
										{
											addr.person_fullname ?
											<Text color={GetColor('navy-a')} size="xlarge" style={{ marginTop: -5 }}>{addr.person_fullname}</Text>
											: null
										}
									</View>
								</View>
								<View>
									<View style={{ paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
										<View style={{ flexDirection: 'row', alignItems: 'center' }}>
											<Text color={mainColor} size="large">{ addrType === 'origin' ? 'مبدا' : ( props.addresses.length < 3 || ( props.addresses.length == 3 && props.has_return ) ? 'مقصد' : `مقصد ${ index }` )}</Text>
											{ 
												addr.type === 'return' ?
												<Text size="small" color={GetColor('navy-a')} style={{ marginLeft: 5 }}>(بازگشت به مبدا)</Text>
												: null
											}
										</View>
										{
											addr.arrived_at
												?	<View style={{ flexDirection: 'row', alignItems: 'center' }}>
														<Text color={GetColor('gray-c')} size="small" style={{ marginRight: 5 }}>{ props && props.transportType == 'motor_taxi' ? ( addr.type === 'origin' ? 'زمان سوار شدن' : 'زمان پیاده شدن' ) : ( addrType === 'origin' ? 'زمان رسیدن' : 'زمان دریافت' ) }</Text>
														<Icon name="clock" color={mainColor} style={{ marginRight: 5 }} />
														<Text color={mainColor}>{ persianDate.getTime( addr.arrived_at ) }</Text>
													</View>
												: 	null
										}
										
									</View>
									<View style={{ elevation: 3, marginHorizontal: 20, backgroundColor: addrType === 'origin' ? '#FFF8E1' : '#E8F5E9', borderColor: addrType === 'origin' ? '#F4EDD7' : '#DBEEDC', ...BorderRadiusStyles.few, padding: 20 }}>
										<Address type={ addrType } data={
											{
												address: addr.address + ( addr.number ? `، پلاک ${ addr.number }` : '' ) + ( addr.unit ? `، واحد ${ addr.unit }` : '' ),
												description: addr.description,
												name: addr.person_fullname,
												tel: addr.person_phone
											}
										} />
									</View>
								</View>
							</View>
						);
					})
					: null
				}
			</View>
			<View style={{ marginBottom: 20 }} />
		</ScrollView>
	);
}

const styles = StyleSheet.create(
{
	container: {
		flex: 1,
		// paddingHorizontal: 20,
		backgroundColor: GetColor('white')
	},
	content: {
		flex: 1,
		flexDirection: 'row-reverse',
		justifyContent: 'space-between',
		paddingHorizontal: 20
	},
	imageContainer: {
		height: 170,
		marginTop: 10,
		marginBottom: 5
	},
	screenshot: {
		flex: 1,
		height: 170,
		resizeMode: 'contain'
	},
	avatar: {
		height: 45,
		width: 45
	},
	price__row: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderTopColor: GetColor('gray-f'),
		borderTopWidth: 1
	},
	info__col: {
		width: '50%',
		paddingHorizontal: 10,
		paddingVertical: 0,
		// flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		borderLeftWidth: 1,
		borderLeftColor: GetColor('gray-e')
	}
})