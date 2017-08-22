import React from 'react';
import { 
	View,
	StyleSheet,
	ActivityIndicator,
	ScrollView
}	from 'react-native';
import Avatar  				from '../../custom/Avatar';
import {
	currencyFormat,
	callToSupport
}	from '../../lib/Helpers';
import Button 				from '../../custom/Button';
import Text 				from '../../custom/Text';
import Card 				from '../../custom/Card';
import { GetColor }			from '../../custom/Utils/color';
import Address 				from '../../custom/Address/index';

export default function ArriveAddress( props )
{
	return (
		<View style={ styles.container }>
			<ActivityIndicator
				animating={ !props.info }
				color='#fff'
			/>
			{
				props.info ?
				<ScrollView>
					<View style={{ flex: 1 }}>
						<View style={ styles.topBox } >
							<Button 
								title='تماس با پشتیبانی'
								onPress={ callToSupport }
								background={ GetColor( 'navy-a' ) }
								color='white'
								padding='xlarge'
								size='xlarge'
								wide
								radius='few'
							/>
						</View>
						<View style={{ marginTop: 10 }} >
							<Card collapsed={ true } >
								<View role='header'>
									<Text color={ GetColor( props.cashPayment ? 'red-a' : 'green-a' ) }>
										{
											props.cashPayment
												? `مبلغ ${ currencyFormat( props.price ) } از ` + ( props.payAtDest ? ' مقصد ' : 'مبدا' ) + 'دریافت کنید'
												: 'هزینه اعتباری پرداخت شده است.'
										}
									</Text>
								</View>
								<View role="body">
									<View style={ styles.rowSpaced } >
										<Text  color={ GetColor( props.has_return ? 'green-a' : 'red-a' ) }>برگشت { props.has_return ? 'دارد' : 'ندارد' }</Text>
										<Text  color={ GetColor( props.delay ? 'green-a' : 'red-a' ) }>توقف در مسیر { props.delay ? ( props.delay / 60 + 'دقیقه'  ) : 'ندارد' }</Text>
									</View>
									<View style={ styles.rowSpaced } >
										<Text>نوع پرداخت { props.cashPayment ? 'نقدی' : 'اعتباری' }</Text>
										<Text>طرف پرداخت { props.payAtDest ? 'مقصد' : 'مبدا' }</Text>
									</View>
								</View>
							</Card>
						</View>
						<View>
							<Card collapsed={ true } >
								<View role='header'>
									<Text color={ GetColor( props.orderStatusIs( 'origin', 'return' ) ? 'orange-a' : 'green-a' ) } >
										{ props.orderStatusIs( 'origin', 'return' ) ? 'مبدا' : 'مقصد' }
									</Text>
								</View>
								<View role='body'>
									<Address
										type={ props.info.type === 'return' ? 'origin' : props.info.type }
										data={
											{
												address: props.info.address + ( props.info.number ? ' پلاک ' + props.info.unit : '' ) + ( props.info.unit ? ' واحد ' + props.info.unit : '' ),
												description: props.info.description,
												name: props.info.person_fullname,
											}
										}
									/>
								</View>
							</Card>
						</View>
						<Address 
							type={ props.info ? props.info.type : '' }
							address={ props.info ? props.info.address : '' }
							unit={ props.info ? props.info.unit : '' }
							number={ props.info ? props.info.number : '' }
						/>
						
					</View>
					<View>
						<Button 
							title="نمایش آدرس روی نقشه"
							onPress={ props.showOnMap } 
							color='white'
							background={ GetColor( 'blue-a' ) }
							wide
							size='xlarge'
							padding='xlarge'
						/>
					</View>
					{
						props.info && props.info.person_phone ?
							<View>
								<Button 
									title={ "تماس با " + ( props.orderStatusIs( 'origin', 'return' ) ? 'مبدا' : 'مقصد' ) }
									onPress={ () => props.callToCustomer( props.info.person_phone ) }
									color='white'
									background={ GetColor( 'blue-a' ) }
									wide
									size='xlarge'
									padding='xlarge'
								/>
							</View>
						: null
					}
					<View style={{ marginTop: 30 }}>
						<Button
							onPress={ props.onArriveClicked }
							title={ 
								props.info && props.info.type === 'origin'
									? 'به مبدا رسیدم' 
									: (
										props.info.type === 'return' 
										?	'بازگشت به مبدا'
										: 	'به مقصد رسیدم' 
									)
							}
							isLoading={ props.isLoading }
							color='white'
							background={ GetColor( 'blue-a' ) }
							wide
							size='xlarge'
							padding='xlarge'
						/>
					</View>
				</ScrollView>
			: null
		}
		</View>
	);
}

const styles = StyleSheet.create(
{
	container: {
		flex: 1,
		backgroundColor: GetColor( 'navy-b' ) ,
		padding: 8
	},
	topBox: {
		flex: 1,
	},
	rowSpaced: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	}
})