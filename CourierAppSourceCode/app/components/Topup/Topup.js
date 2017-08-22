import React 	from 'react';
import {
	View,
	TextInput,
	ScrollView,
	Modal
}	from 'react-native';
import { currencyFormat }	from '../../lib/Helpers';
import Text 				from '../../custom/Text';
import Card 				from '../../custom/Card';
import Button 				from '../../custom/Button';
import Icon 				from '../../custom/Icon';
// import KeyboardSpacer 		from '../../custom/KeyboardSpacer';
import {GetColor} 			from '../../custom/Utils/color';
import { 
	BorderRadiusStyles,
	WeightStyles,
} from '../../config/styles';


export default function Topup( props )
{
	return (
		<View style={{ flex: 1, backgroundColor: '#fff' }}>
			<View>
				<Modal
					animationType={ "slide" }
					transparent={ true }
					visible={ props.shouldShowModal }
					onRequestClose={ () => {} }
				>
					<View  style={{ flex: 1, backgroundColor: GetColor( 'black', 0.7 ) }}>
						<Card style={{ height: 270, marginHorizontal: 20, marginTop: '40%', justifyContent: 'center', alignItems: 'center' }} isLight>
							<View role="body" style={{ paddingVertical: 30 }}>
								<Text size='xlarge' align="center" color={ GetColor('navy-f') }>اعتبار شما به میزان</Text>
								<Text size={40} color={ GetColor( 'green-a' ) } align="center">{currencyFormat( props.amount )} تومان</Text>
								<Text size='xlarge' align="center" color={ GetColor('navy-f') }>افزایش خواهد یافت.</Text>
							</View>
							<View role="footer">
								<Button 
									title='تایید'
									onPress={ props.pay }
									style={{ marginRight: 40 }}
									color={ GetColor( 'white' ) } 
									background={ GetColor( 'blue-a' ) } 
									padding="large"
									radius="few"
									size="large"
									style={{ minWidth: 100, backgroundColor: GetColor('blue-a') }}
								/>
								<Button 
									title='انصراف'
									onPress={ props.toggleModal }
									color={ GetColor( 'red-a' ) } 
									borderColor={ GetColor( 'red-a' ) } 
									radius="few"
									padding='large'
								/>
							</View>
						</Card>
					</View>
				</Modal>
			</View>
			<ScrollView style={{ flex: 1, flexGrow: 1 }}>
				<View style={{ paddingVertical: 12, paddingHorizontal: 25, flexGrow: 1 }}>
					<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomColor: GetColor( 'gray-a', 0.1 ), borderBottomWidth: 1, paddingVertical: 8 }}>
						<Text color='black'>اعتبار</Text>
						<Text size="large" color={ GetColor( parseInt( props.credit ) < 0 ? 'red-a' : 'black' ) }>{ currencyFormat( props.credit, true ) } تومان</Text>
					</View>
					<View style={{ padding: 16, justifyContent: 'center', alignItems: 'center' }}>
						<Text color='black'>افزایش اعتبار به تومان</Text>
						<View style={{ flexDirection: 'row', marginTop: 10 }}>
							<View style={{ width: 95, height: 55 }}>
								<Button 
									color={ props.amount.toString() == '30000' ? GetColor( 'blue-a' ) : GetColor( 'navy-f' ) }
									background={ GetColor( 'gray-d' ) }
									title="30,000"
									style={{ marginRight: 10 }}
									wide
									radius="few"
									onPress={ () => props.textChange( '30000' ) }
									padding='large'
									size='large'
									borderWidth={ 1.5 }
									borderColor={ props.amount.toString() == '30000' ? GetColor( 'blue-a' ) : 'transparent' }
								/>
							</View>
							<View style={{ width: 100, height: 55 }}>
								<Button 
									color={ props.amount.toString() == '20000' ? GetColor( 'blue-a' ) : GetColor( 'navy-f' ) }
									background={ GetColor( 'gray-d' ) }
									title="20,000"
									style={{ marginRight: 10 }}
									wide
									radius="few"
									onPress={ () => props.textChange( '20000' ) }
									padding='large'
									size='large'
									borderWidth={ 1.5 }
									borderColor={ props.amount.toString() == '20000' ? GetColor( 'blue-a' ) : 'transparent' }
								/>
							</View>
							<View style={{ width: 95, height: 55 }}>
								<Button 
									color={ props.amount.toString() == '10000' ? GetColor( 'blue-a' ) : GetColor( 'navy-f' ) }
									background={ GetColor( 'gray-d' ) }
									title="10,000"
									style={{ marginRight: 10 }}
									wide
									radius="few"
									onPress={ () => props.textChange( '10000' ) }
									padding='large'
									size='large'
									borderWidth={ 1.5 }
									borderColor={ props.amount.toString() == '10000' ? GetColor( 'blue-a' ) : 'transparent' }
								/>
							</View>
						</View>
						<View style={{ flexDirection: 'row', marginTop: 10 }}>
							<View style={{ width: 95, height: 55 }}>
								<Button 
									color={ props.amount.toString() == '200000' ? GetColor( 'blue-a' ) : GetColor( 'navy-f' ) }
									background={ GetColor( 'gray-d' ) }
									title="200,000"
									style={{ marginRight: 10 }}
									wide
									radius="few"
									onPress={ () => props.textChange( '200000' ) }
									padding='large'
									size='large'
									borderWidth={ 1.5 }
									borderColor={ props.amount.toString() == '200000' ? GetColor( 'blue-a' ) : 'transparent' }
								/>
							</View>
							<View style={{ width: 100, height: 55 }}>
								<Button 
									color={ props.amount.toString() == '100000' ? GetColor( 'blue-a' ) : GetColor( 'navy-f' ) }
									background={ GetColor( 'gray-d' ) }
									title="100,000"
									style={{ marginRight: 10 }}
									wide
									radius="few"
									onPress={ () => props.textChange( '100000' ) }
									padding='large'
									size='large'
									borderWidth={ 1.5 }
									borderColor={ props.amount.toString() == '100000' ? GetColor( 'blue-a' ) : 'transparent' }
								/>
							</View>
							<View style={{ width: 95, height: 55 }}>
								<Button 
									color={ props.amount.toString() == '50000' ? GetColor( 'blue-a' ) : GetColor( 'navy-f' ) }
									background={ GetColor( 'gray-d' ) }
									title="50,000"
									style={{ marginRight: 10 }}
									wide
									radius="few"
									onPress={ () => props.textChange( '50000' ) }
									padding='large'
									size='large'
									borderWidth={ 1.5 }
									borderColor={ props.amount.toString() == '50000' ? GetColor( 'blue-a' ) : 'transparent' }
								/>
							</View>
						</View>
						<View style={{ width: 275, flexDirection: 'row', marginTop: 10, justifyContent: 'flex-end', marginLeft: -11 }}>
							<View style={{ height: 45, backgroundColor: GetColor( 'gray-d' ), flex: 1, ...BorderRadiusStyles.few }}>
								<TextInput 
									placeholder="ورود مبلغ دلخواه"
									style={{ ...WeightStyles.normal, height: 45, color: GetColor( 'blue-a' ), textAlign: 'center', top : 4 }}

									underlineColorAndroid='transparent'
									keyboardType="numeric"
									onChangeText={ value => props.textChange( value ) }
								/>
							</View>
						</View>
					</View>
					<View style={{ flexDirection: 'row', borderTopColor: GetColor( 'gray-a', 0.1 ), borderTopWidth: 1, justifyContent: 'space-between', paddingVertical: 10, marginTop: 15 }}>
						<Text color='black' size="large">افزایش اعتبار به مبلغ</Text>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<Text color='black' style={{ marginRight: 5 }}>تومان</Text>
							<Text color={ GetColor( 'green-a' ) } size="large">{ currencyFormat( props.amount ) }</Text>
						</View>
					</View>
					<View style={{ flexDirection: 'row', borderColor: GetColor( 'gray-a', 0.1 ), borderBottomWidth: 1, borderTopWidth: 1, justifyContent: 'space-between', paddingVertical: 10 }}>
						<Text color='black'>اعتبار پس از افزایش</Text>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<Text color={ GetColor( parseInt( props.newCredit ) < 0 ? 'red-a' : 'black' ) } style={{ marginRight: 5 }}>تومان</Text>
							<Text color={ GetColor( parseInt( props.newCredit ) < 0 ? 'red-a' : 'black' ) }>{ currencyFormat( props.newCredit ) }</Text>
						</View>
					</View>
				</View>
			</ScrollView>
			<Button 
				title="پرداخت"
				onPress={  props.toggleModal } 
				disabled={ props.disabled } 
				color='white'
				background={ GetColor( 'blue-a' ) }
				padding="large"
				size="xlarge"
				wide
			/>
		</View>
	);
}

