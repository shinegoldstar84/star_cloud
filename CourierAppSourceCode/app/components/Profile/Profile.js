import React 		from 'react';
import {
	View,
	StyleSheet,
	ScrollView,
	Image,
	TouchableNativeFeedback,
	TouchableHighlight
}	from 'react-native';
import { persianDate }	from '../../lib/PersianDate';
import Avatar 			from '../../custom/Avatar';
import Text 			from '../../custom/Text';
import Icon 			from '../../custom/Icon';
import { GetColor }		from '../../custom/Utils/color';
import G 				from '../../lib/G';
import Button 			from '../../custom/Button';
import Hyperlink		from 'react-native-hyperlink';
import Card 			from '../../custom/Card';
import FloatingLabel	from '../../custom/FloatingLabel';

export default function Profile( props )
{
	return (
		<View style={ styles.container }>
			<ScrollView contentContainerStyle={{ padding: 12 }}>
					<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 10 }} >
						<Avatar url={ props.user && props.user.avatar ? props.user.avatar.url.split('?')[0] : null } width={75} height={75} />
						<Text color='white' >
							{ props.user ? ( props.user.firstname + ' ' + props.user.lastname ) : '' }
						</Text>
						<View style={{ flexDirection: 'row', flex: 1, marginBottom: 10, borderRadius: 3, marginTop: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: GetColor( 'navy-b' ), paddingVertical: 10 }} >
							{
								props.transportTypes.map( ( trans, index ) =>
								{
									return(
										<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderLeftWidth: index == props.transportTypes.length - 1 ? 0 : 2, borderLeftColor: GetColor('navy-a') }} key={ index } >
											<Icon 
												name={ trans === 'motorbike' ? 'delivery-bike' : ( trans === 'motor_taxi' ? 'taxi-bike' : 'delivery-pickup' ) } 
												style={{ marginRight: 5, fontSize: 28 }}
											/>
											<Text size="large">{ trans === 'motorbike' ? 'پیک موتوری' : ( trans === 'motor_taxi' ? 'تاکسی موتور' : 'وانت بار' ) }</Text>
										</View>
									)
								})
							}
						</View>
						<Text color='white' >
							همکاری با الوپیک از تاریخ { persianDate.PersianCalendar( props.user ? props.user.created_at : '' ) }
						</Text>
					</View>
					<View style={ styles.content } >
						<View style={ styles.innerContent }>
							<View style={{ flexDirection: 'row', alignItems: 'center' }}>
								<Icon name="mobile" color='black' size="xlarge" color={ GetColor( 'gray-c' ) } style={{ marginRight: 10 }} />
								<Text color='black' >تلفن</Text>
							</View>
							<Text color='black' >{ props.user ? props.user.phone : '' }</Text>
						</View>
						<View style={ styles.innerContent }>
							<View style={{ flexDirection: 'row', alignItems: 'center' }}>
								<Icon name="pocket" color='black' size="large" color={ GetColor( 'gray-c' ) } style={{ marginRight: 10 }} />
								<Text color='black' >ایمیل</Text>
							</View>
							<Text color='black' ></Text>
						</View>
						<TouchableNativeFeedback onPress={ props.account }>
							<View style={ styles.innerContent }>
								<View style={{ flexDirection: 'row', alignItems: 'center' }}>
									<Icon name="card-rotated" color='black' size="xlarge" color={ GetColor( 'gray-c' ) } style={{ marginRight: 10 }} />
									<Text color='black' >شماره شبا بانکی</Text>
								</View>
								<Icon name='arrow-left' size="xsmall" color={ GetColor( 'gray-a', 0.7 ) } />
							</View>
						</TouchableNativeFeedback>
						<TouchableNativeFeedback onPress={ props.call }>
							<View style={ styles.innerContent }>
								<View style={{ flexDirection: 'row', alignItems: 'center' }}>
									<Icon name="headset" color='black' size="xlarge" color={ GetColor( 'gray-c' ) } style={{ marginRight: 10 }} />
									<Text color='black' >تماس با پشتیبانی</Text>
								</View>
								<Icon name='arrow-left' size="xsmall" color={ GetColor( 'gray-a', 0.7 ) } />
							</View>
						</TouchableNativeFeedback>
						<TouchableNativeFeedback onPress={ props.openChannel }>
							<View style={ styles.innerContent }>
								<View style={{ flexDirection: 'row', alignItems: 'center' }}>
									<Icon name="telegram" color='black' size="xlarge" color={ GetColor( 'gray-c' ) } style={{ marginRight: 10 }} />
									<Text color='black' >کانال تلگرام سفیران</Text>
								</View>
								<Icon name='arrow-left' size="xsmall" color={ GetColor( 'gray-a', 0.7 ) } />
							</View>
						</TouchableNativeFeedback>
					</View>
					<Card collapsed={ true } style={ { marginTop: 10 } } isLight>
							<View role="body">
								{
									props.referredBy
									? (
										<TouchableHighlight underlayColor={ GetColor( 'gray-f' ) }>
											<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
												<Text color={ GetColor('navy-f') }>معرف</Text>
												<View style={[ styles.profileItemContent, styles.ml7 ]}>
													<Text size="large" color={ GetColor('navy-c') }>
														{
															props.referredBy.name 
															? props.referredBy.name
															: ''
														}
													</Text>
												</View>
											</View>
										</TouchableHighlight>
									)
									: !props.isLoading && (
										<View style={ { paddingVertical: 5, flexDirection: 'row', alignItems: 'center' } }>
											<FloatingLabel 
									        	onChangeText={ props.textChange }
									        	maxLength={ 5 }
									        	labelColor={ GetColor('gray-b') }
									        	underlineColorAndroid={ GetColor( 'gray-a', 0.1 ) }
									        	labelStyle={ { paddingRight: 10 } }
									        	style={ styles.flex1 }
									        	isLatin
									        >کد معرف</FloatingLabel>
											<Button 
												title="ثبت"
												padding="large"
												size="large"
												onPress={ props.submitReferral }
												color={ GetColor( 'white' ) }
												background={ GetColor( 'blue-a' ) } 
												radius='medium'
												disabled={ props.referredByBtnDisabled }
											/>
										</View>
									)
								}
							</View>
						</Card>
					<Button 
						style={ { marginTop: 10 } }
						title="خروج"
						size={23}
						padding={5}
						onPress={ props.logout }
						color={ GetColor( 'white' ) }
						background={ GetColor( 'red-a' ) }
						isLoading={ props.isLoading }
						radius="few"
						wide 
					/>
					<Hyperlink
						onPress={ () => props.launchRules() }
						style={ styles.hyperlink }
						linkStyle={ { color: GetColor('blue-a') } }
						linkText={ url => url === 'https://alopeyk.com/terms-couriers' ? 'قوانین و مقررات الو‌پیک' : url }
					>
						<Text size={ 14 } align="center">مشاهده https://alopeyk.com/terms-couriers برای سفیران</Text>
					</Hyperlink>
					<View style={ styles.middle } >
						<Text size='large' >نسخه { G.appVersion }</Text>
					</View>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create(
{
	container: {
		flex: 1,
		backgroundColor: GetColor('navy-a'),
		// padding: 8
	},
	textColorWhite: {
		color: '#fff'
	},
	bigText: {
		fontSize: 18
	},
	imageContainer: {
		height: 170
	},
	avatar: {
		flex: 1,
		height: 170
	},
	content: {
		backgroundColor: 'white',
		borderRadius: 3
	},
	innerContent: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 12,
		paddingHorizontal: 20,
		borderBottomWidth: 1,
		borderBottomColor: 'rgba( 0,0,0, 0.1 )',
		alignItems: 'center'
	},
	middle: {
		flexDirection: 'row',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 10
	},
	hyperlink: {
		marginTop: 5
	},
	profileItemWrapper:
	{
		padding: 15,
		borderBottomColor: GetColor( 'gray-a', 0.1 ),
		borderBottomWidth: 1,
	},
	profileItem:
	{
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	profileItemFirst:
	{
		paddingTop: 0,
	},
	profileItemLast:
	{
		paddingBottom: 0,
	},
	profileItemContent:
	{
		width: 0,
		flexGrow: 1,
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	ml7: { marginLeft: 7 },
	flex1: { flex: 1 },
})