import React from 'react';
import { 
	View,
	Image,
	TouchableNativeFeedback,
	StyleSheet,
	ScrollView
} from 'react-native';
// import Address 					from '../../custom/Address';
import { currencyFormat }		from '../../lib/Helpers';
import Button 					from '../../custom/Button';
import Icon 					from '../../custom/Icon';
import { GetColor }				from '../../custom/Utils/color';
import {
	BoxShadowStyles,
	PaddingStyles
}	from '../../config/styles';
import Card 					from '../../custom/Card';
import Text 					from '../../custom/Text';
import Address 					from '../../custom/Address/index';

export default function Broadcasting( props )
{
	return (
		<View style={ styles.primary }>
			<ScrollView style={{ flex: 1 }}>
				<View>
					<Button
						title='رد درخواست'
						color='white'
						background={ GetColor( 'navy-a' ) }
						onPress={ props.skipPress }
						wide
						size='large'
						iconSize='xsmall'
						padding='large'
						icon='cross-narrow'
					/>
				</View>
				<View>
					{
						props.screenshot 
						?	<Image source={{ uri: props.screenshot }} style={ styles.screenshot } />
						: 	null
					}
				</View>
				<View style={[ styles.rowContainer, styles.underline ]} >
						<View style={{ flex: 1, flexDirection: 'row' }} >
							<View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems : 'center' }} >
								<Icon name=
									{
										props.transportType === 'motorbike' 
											? 'delivery-bike' 
											: ( props.transportType === 'motor_taxi' ? 'taxi-bike' : 'delivery-pickup' )
									}
									size='xxxlarge'
									color={ GetColor('gray-c') }
								/>
								<Text style={{ marginLeft: 5 }} size={15} color={ GetColor('gray-c') }>نوع درخواست : </Text>
							</View>
								<Text style={{ marginLeft: 5 }} size="large">
									{ 
										props.transportType === 'motorbike' 
											? 'مرسوله' 
											: ( props.transportType === 'motor_taxi' ? 'تاکسی' : 'وانت' )
									}
								</Text>
						</View>
					</View>
				<View>
					{
						props.addresses && props.addresses.length ?
							<View>
								<View style={[ styles.underline, { padding: 8 } ]} >
									<Address 
										textColorStyle={{ color: 'white' }}
										type={ props.addresses[0].type }
										data={
											{
												address: 
												{
													value: props.addresses[0].address + ( props.addresses[0].number ? ' پلاک ' + props.addresses[0].number : '' ) + ( props.addresses[0].unit ? ' واحد ' + props.addresses[0].unit : '' ),
													size: 'large'
												}
											}
										}
									/>
								</View>
								<View style={[ styles.underline, { padding: 8 } ]} >
									<Address 
										textColorStyle={{ color: 'white' }}
										type={ props.addresses[props.addresses.length - 1].type }
										data={
											{
												address: {
														value: props.addresses[props.addresses.length - 1].address +
														( props.addresses[props.addresses.length - 1].number ? ' پلاک ' + props.addresses[props.addresses.length - 1].number : '' ) +
														( props.addresses[props.addresses.length - 1].unit ? ' واحد ' + props.addresses[props.addresses.length - 1].unit : '' ),
														size: 'large'
													}
											}
										}
									/>
								</View>
							</View>
						: null
						}
				</View>
				<View style={[ styles.m10, { flex: 1 } ]} >
					<View style={[ { flexDirection: 'row', paddingHorizontal: 8, paddingVertical: 0, alignItems: 'center', justifyContent: 'center' }, styles.underline ]}>
						<Text color={ GetColor( 'gray-b' ) } size='large'>درآمد</Text>
						<Text size='veryLarge' color={ GetColor( 'green-a' ) } >{ currencyFormat( props.price ) } </Text>
						<Text color={ GetColor( 'green-a' ) } >تومان</Text>
						<View>
							{
								props.subsidy &&
									<Text color={ GetColor( 'gray-b' ) } size='medium'> (  با احتساب درآمد مازاد ) </Text>
							}
						</View>
					</View>
					<View style={[ styles.rowContainer, styles.underline ]} >
						<View style={ styles.row }>
							<View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems : 'center' }} >
								<Icon name='return-back' color={ GetColor('gray-c') } size='large' />
								<Text style={{ marginLeft: 8 }} color={ GetColor('gray-c') } size="large">برگشت:‌</Text>
								<Text style={{ marginLeft: 8 }} color={ GetColor( props.hasReturn ? 'green-a' : 'red-a' ) } size='xlarge'>{ props.hasReturn ? 'دارد' : 'ندارد' }</Text>
							</View>
							<View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems : 'center' }} >
								<Icon name='marker-doubled' color={ GetColor('gray-c') } size='large' />
								<Text style={{ marginLeft: 8 }} color={ GetColor('gray-c') }size="large">چند مسیره: </Text>
								<Text color={ GetColor( props.addresses && props.addresses.length > 2 ? 'green-a' : 'red-a' ) }  size='xlarge'>{ props.addresses && props.addresses.length > 2 ? 'دارد' : 'ندارد' }</Text>
							</View>
						</View>
						<View style={ styles.row }>
						</View>
					</View>
				</View>
			</ScrollView>
			<View style={{ flex: 1, position: 'absolute', bottom: 0, left: 0, right: 0 }}>
				<View style={{ flex: 1 }}>
					<View style={{ height: 3, width: props.progress+'%', backgroundColor: 'white' }} ></View>
					<Button 
						title="پذیرش درخواست" 
						onLongPress={ props.acceptOrder }
						delayLongPress={ 100 }
						wide
						size={23}
						padding={5}
						color='white'
						isLoading={ props.isLoading }
						background={ GetColor( 'blue-a' ) }
					/>
				</View>
			</View>
		</View>
	);

}


const styles = StyleSheet.create(
{
	primary: {
		flex: 1,
		backgroundColor: GetColor( 'navy-b' ),
	},
	screenshot: {
		height: 170
	},
	textColorWhite: {
		color: 'white'
	},
	progressBar: {
		height: 6
	},
	mb10: {
		marginBottom: 10,
		marginTop: 15
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
	},
	rowContainer: {
		// flexDirection: 'row',
		// justifyContent: 'space-between',
		// alignItems: 'center',
		padding: 10
	},
	underline: {
		borderBottomColor: GetColor( 'gray-a', 0.5 ),
		borderBottomWidth: 1
	}
});