import React from 'react';
import { 
	View,
	StyleSheet,
	Image,
	ActivityIndicator,
	ScrollView,
	TouchableHighlight
}	from 'react-native';
import Avatar  				from '../../custom/Avatar';
import {
	currencyFormat,
	callToSupport
}	from '../../lib/Helpers';
import Button 				from '../../custom/Button';
import Icon 				from '../../custom/Icon';
import Text 				from '../../custom/Text';
import Card 				from '../../custom/Card';
import { GetColor }			from '../../custom/Utils/color';
import Address 				from '../../custom/Address/index';
import Timeline				from '../../custom/Timeline';
import {
	BoxShadowStyles,
	BorderRadiusStyles
}	from '../../config/styles';

export default function HandleAddress( props )
{
	var currentDate = new Date(),
		uid = currentDate.getTime(); // To force timeline to be wholly updated
	return (
		<View style={ styles.container }>
			<ScrollView  contentContainerStyle={{ paddingHorizontal: 10 }}>
			<ActivityIndicator
				animating={ !props.info }
				color='#fff'
			/>
			{
				props.info ?
					<View style={{ flex: 1 }}>
						{
							props.info && props.info.type === 'origin' && props.info.status === 'arrived'
							? 	<View style={ styles.topBox } >
									<Button 
										title='تماس با پشتیبانی'
										onPress={ callToSupport }
										background={ GetColor( 'navy-a' ) }
										color='white'
										padding='large'
										size='medium'
										radius='few'
										icon='headset'
									/>
									<Button 
										title='انصراف درخواست'
										onPress={ props.cancelOrder }
										background={ GetColor( 'red-a' ) }
										color='white'
										padding='large'
										size='medium'
										disabled={ !props.canCancel }
										radius='few'
										icon='cross-narrow'
										iconSize='xsmall'
									/>
								</View>
							: 	<View style={{ flex: 1 }} >
									<Button 
										title='تماس با پشتیبانی'
										onPress={ callToSupport }
										background={ GetColor( 'navy-a' ) }
										color='white'
										padding='large'
										size='large'
										radius='few'
										icon='headset'
										wide
									/>
								</View>
							}
						<Timeline timeline={ props.timeline } transportType={ props.transportType } style={{ marginTop: 10 }}/>
						<View key={ uid }>
							{
								props.transportType === 'motor_taxi'
									? 	<View style={{ marginTop: 10 }} >
											<Card collapsed={ true } >
												<View role='body' >
													<Text color={ GetColor( 'red-a' ) } align="center" size='large'>{ "سفیر گرامی، شما مجاز به سوار کردن بانوان نمی‌باشید به هیچ وجه مسافر خانم سوار نکنید." }</Text>
												</View>
											</Card>
										</View>
									: 	null
							}
							<View style={{ marginTop: 4 }} >
								<Card collapsed={ true } >
									<View role='header'>
										{
											props.cashPayment ?
												<View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }} >
													<Text align="center" >
														<Text size='xlarge' color={ GetColor( 'red-a' ) } >مبلغ </Text>
														<Text size='xxlarge' color={ GetColor( 'green-a' ) }>{ currencyFormat( props.price ) }</Text>
														<Text size='xlarge' color={ GetColor( 'red-a' ) }> تومان از { props.payAtDest ? 'مقصد' : 'مبدا' } دریافت کنید</Text>
													</Text>
													{
														props.subsidy ?
														<Text align="center" >
															<Text size='large' color={ GetColor( 'gray-c' ) } style={{ textAlign: 'center' }} >مبلغ </Text>
															<Text size='large' color={ GetColor( 'green-a' ) } style={{ textAlign: 'center' }} >{ currencyFormat( props.subsidy ) }</Text>
															<Text size='large' color={ GetColor( 'gray-c' ) } style={{ textAlign: 'center' }} > تومان درآمد مازاد به اعتبار الوپیک شما واریز خواهد شد.</Text>
														</Text>
														: null													
													}
												</View>
											: 	<View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
													<Text size='xlarge' color={ GetColor( 'red-a' ) } style={{ textAlign: 'center' }} >هیچ هزینه نقدی از مشتری دریافت نکنید</Text>
													<Text align="center">
														<Text size='large' color={ GetColor( 'gray-c' ) } style={{ textAlign: 'center' }} >مبلغ </Text>
														<Text size='large' color={ GetColor( 'green-a' ) } style={{ textAlign: 'center' }} >{ currencyFormat( props.nprice ? props.nprice : props.price ) }</Text>
														<Text size='large' color={ GetColor( 'gray-c' ) } style={{ textAlign: 'center' }} > تومان به اعتبار الوپیک شما واریز خواهد شد.</Text>
													</Text>
												</View>
										}
									</View>
									<View role="body">
										<View style={{ flex: 1, flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
											<View style={[ styles.info__col, { borderBottomWidth: 1, borderBottomColor: GetColor('navy-b') } ]}>
												<View style={{ flexDirection: 'row', alignItems: 'center' }}>
													<Icon name='hourglass' style={{ marginRight: 5 }} color={GetColor('gray-c')} size={14} />
													<Text color={GetColor('gray-c')} size={14}>توقف در مسیر</Text>
												</View>
												<Text size={14} color={ GetColor( props.delay ? 'green-a' : 'red-a' ) } style={{ marginTop: -5 }}>{ props.delay ? ( ( parseInt( props.delay ) >= 60 ? parseInt( props.delay ) / 60 : props.delay ) + ( parseInt( props.delay ) >= 60 ? ' ساعت' : ' دقیقه' )  ) : 'ندارد' }</Text>
											</View>
											<View style={[ styles.info__col, { borderLeftWidth: 0, borderBottomWidth: 1, borderBottomColor: GetColor('navy-b') } ]}>
												<View style={{ flexDirection: 'row', alignItems: 'center' }}>
													<Icon name='return-back' style={{ marginRight: 5 }} color={GetColor('gray-c')} size={14} />
													<Text color={GetColor('gray-c')} size={14}>برگشت</Text>
												</View>
												<Text color={ GetColor( props.has_return ? 'green-a' : 'red-a' ) } size={14} style={{ marginTop: -5 }}>{ props.has_return ? 'دارد' : 'ندارد' }</Text>
											</View>
											<View style={ styles.info__col }>
												<View style={{ flexDirection: 'row', alignItems: 'center' }}>
													<Icon name='exchange' style={{ marginRight: 5 }} color={GetColor('gray-c')} size={14} />
													<Text color={GetColor('gray-c')} size={14}>طرف پرداخت</Text>
												</View>
												<Text color={GetColor('white')} size={14} style={{ marginTop: -5 }}>{ props.payAtDest ? 'مقصد' : 'مبدا' }</Text>
											</View>
											<View style={[ styles.info__col, { borderLeftWidth: 0 } ]}>
												<View style={{ flexDirection: 'row', alignItems: 'center' }}>
													<Icon name='money' style={{ marginRight: 5 }} color={GetColor('gray-c')} size={14} />
													<Text color={GetColor('gray-c')} size={14}>نوع پرداخت</Text>
												</View>
												<Text color={GetColor('white')} size={14} style={{ marginTop: -5 }}>{ !props.cashPayment ? 'اعتباری' : 'نقدی' }</Text>
											</View>
										</View>
									</View>
								</Card>
							</View>
							<View style={{ marginTop: 5 }} >
								<Card collapsed={ true } >
									<View role='header'>
										<Text color={ GetColor( props.orderStatusIs( 'origin', 'return' ) ? 'orange-a' : 'green-a' ) } >
											{ props.orderStatusIs( 'origin', 'return' ) ? 'مبدا' : `مقصد ${ ( props.totalAddresses < 3 || ( props.totalAddresses == 3 && props.has_return ) ) ? '' : props.info.priority }` }
										</Text>
										{
											props.info && props.info.person_phone ?
											<Button
												title={ 'تماس با ' + ( props.orderStatusIs( 'origin', 'return' ) ? 'مبدا' : `مقصد ${ ( props.totalAddresses < 3 || ( props.totalAddresses == 3 && props.has_return ) ) ? '' : props.info.priority }` ) }
												padding="medium"
												size="medium"
												radius="few"
												style={{ elevation: 20 }}
												icon="phone-ringing"
												background={ GetColor('navy-b') }
												color={ GetColor('white') }
												onPress={ () => props.callToCustomer( props.info.person_phone ) }
											/>
											: null
										}
									</View>
									<View role='body' style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
										<Address
											style={{ flex: 1 }}
											textColorStyle={{ color: 'white' }}
											type={ props.info.type === 'return' ? 'origin' : props.info.type }
											data={
												{
													address: {
														value: props.info.address + ( props.info.number ? ' پلاک ' + props.info.number : '' ) + ( props.info.unit ? ' واحد ' + props.info.unit : '' ),
														size: 'large'
													},
													description: {
														value: props.info.description,
														size: 'large'
													},
													name: {
														value: props.info.person_fullname,
														size: 'large'
													},
													tel:
													{
														value: props.info.person_phone,
														size: 'large'
													}
												}
											}
										/>
										{/*
											props.info && props.info.person_phone ?
												<View style={ styles.leftButton } >
													<TouchableHighlight
														onPress={ () => props.callToCustomer( props.info.person_phone ) }
														underlayColor='transparent'
													>
														<View style={[ styles.roundedButton, BoxShadowStyles.few ]}>
															<Icon name='phone-ringing' size='medium' />
															<Text color='white' size='small' align="center" >{ "تماس با \n " + ( props.orderStatusIs( 'origin', 'return' ) ? 'مبدا' : `مقصد ${ props.totalAddresses > 2 ? props.info.priority : '' }` ) }</Text>
														</View>
													</TouchableHighlight>
												</View>
											: null
										*/}
									</View>
								</Card>
							</View>
							<Address 
								type={ props.info ? props.info.type : '' }
								address={ props.info ? props.info.address : '' }
								unit={ props.info ? props.info.unit : '' }
								number={ props.info ? props.info.number : '' }
							/>
							<View style={{ marginTop: 5, marginBottom: 10 }}>
								<TouchableHighlight
									onPress={ props.showOnMap }
									underlayColor='transparent'
								>
									<View style={ styles.mapButton } >
										<Image source={ require( '../../assets/image/mapview.png' ) } style={{ position: 'absolute', zIndex: 0, resizeMode: 'cover' }} />
										<Text size='xlarge' >نمایش آدرس روی نقشه</Text>
										<Icon name='road' style={{ fontSize: 40 }} />
									</View>
								</TouchableHighlight>
							</View>
						</View>
					</View>
			: null
		}
		</ScrollView>
			<View >
				<Button
					onPress={ props.onHandleClicked }
					title={ props.buttonTitle }
					isLoading={ props.isLoading }
					color='white'
					background={ props.info && GetColor( [ 'origin', 'return' ].indexOf( props.info.type ) > -1 ? ( props.info.type === 'origin' && props.info.status === 'arrived' ? 'blue-a'  : 'orange-a' ) : 'green-a' ) }
					wide
					size={23}
					padding={5}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create(
{
	container: {
		flex: 1,
		backgroundColor: GetColor( 'navy-b' ) ,
		// padding: 4
	},
	topBox: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	rowSpaced: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	mapButton: {
		flex: 1,
		padding: 12,
		backgroundColor: GetColor( 'navy-a' ),
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	leftButton: {
		// position: 'absolute',
		// right: 10,
		// top: 2,
		// bottom: 0,
		width: 80,
		height: 80,
		borderRadius: 60,
		backgroundColor: GetColor( 'navy-b' )
	},
	roundedButton: {
		width: 80,
		height: 80,
		borderRadius: 60,
		// flex: 1,
		backgroundColor: GetColor( 'navy-b' ),
		alignItems: 'center',
		justifyContent: 'center'
	},
	info__col: {
		width: '50%',
		paddingHorizontal: 10,
		paddingVertical: 0,
		// flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		borderLeftWidth: 1,
		borderLeftColor: GetColor('navy-b')
	}
})