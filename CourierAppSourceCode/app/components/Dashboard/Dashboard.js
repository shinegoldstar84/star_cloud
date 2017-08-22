import React 							from 'react';
import {
	StyleSheet,
	View,
	ActivityIndicator
}										from 'react-native';
import Tiles 							from '../../custom/Tiles';
import LoadingButton 					from '../../custom/LoadingButton';
import { currencyFormat }				from '../../lib/Helpers';
import Button 							from '../../custom/Button';
import { GetColor }						from '../../custom/Utils/color';
import Text 							from '../../custom/Text';
import Icon 							from '../../custom/Icon';

export default function Dashboard( props )
{
	return (
		<View style={ styles.primary }>
			<View style={ styles.topToolBox } >
				<View style={ styles.bordered }>
					<Text>ارتباط با اینترنت</Text>
					<View style={{ width: 15, height: 15, backgroundColor: GetColor( props.isConnected ? 'green-a' : 'red-a' ), borderRadius: 10, marginTop: 5 }} >
					</View>
					<ActivityIndicator
						color='white'
						animating={ !props.isConnected }
						style={{ position: 'absolute', bottom: 5 }}
					/>
				</View>
				<View style={ styles.bordered }>
					<Text>اعتبار شما</Text>
					<Text color={ GetColor( props.credit < 0 ? 'red-a' : 'green-a' ) } size='medium' >
						{ parseInt( props.credit ) && !Number.isNaN( props.credit ) ? currencyFormat( props.credit ) : 0 } تومان
					</Text>
				</View>
				<View style={ styles.bordered }>
					<Text>مکان یاب</Text>
					<View style={{ width: 15, height: 15, backgroundColor: GetColor( props.isLocationEnabled ? 'green-a' : 'red-a' ), borderRadius: 10, marginTop: 5 }} >
					</View>
					<ActivityIndicator
						color='white'
						animating={ !props.isLocationEnabled }
						style={{ position: 'absolute', bottom: 5 }}
					/>
				</View>
			</View>
			{
				/*
				props.currentAddress ?
					<View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingTop: 5, flexWrap: 'wrap' }} >
						<View style={{ width: 33, height: 33, alignItems: 'center', justifyContent: 'center' }}>
						{
							props.isLocationLoading
								? <ActivityIndicator
										color='white'
										animating={ true }
									/>
								: <Icon name='return' onPress={ props.refreshAddress } />
						}
						</View>
						<Text color={ GetColor( 'green-a' ) } >مکان فعلی شما :‌ </Text>
						<Text style={{ flexWrap: 'wrap' }} >{props.currentAddress}</Text>
					</View>
				: 	null
				*/
			}
			<View style={{ padding: 8, paddingTop: 0, flex: 1 }} >
				<Tiles 
					isLoading={ props.isLoading }
					rate={ props.rate ? props.rate : 0 }
					t1Press={ props.t1Press }
					t2Press={ props.t2Press }
					t3Press={ props.t3Press }
					t4Press={ props.t4Press }
				/>
				<Button 
					color='white'
					background={ GetColor( props.status && props.isConnected ? 'green-a' : 'red-a' ) }
					isLoading={ props.isLoading }
					disabled={ props.isLoading || !props.isConnected || !props.isLocationEnabled  }
					onLongPress={ props.longPress }
					delayLongPress={ 100 }
					title={ props.status ? 'آفلاین شو' : 'آنلاین شو' }
					wide
					size={23}
					padding={5}
					radius="few"
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create(
{
	primary: {
		flex: 1,
		backgroundColor: '#2f3641',
	},
	textColorRed: {
		color: '#e53935',
		fontSize: 20
	},
	textColorGreen: {
		color: '#00c853',
		fontSize: 20
	},
	textColorWhite: {
		color: '#ffffff'
	},
	topToolBox: {
		backgroundColor: GetColor( 'navy-a' ),
		height: 60,
		// flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	bordered: {
		borderRightColor: 'rgba( 0, 0, 0, 0.1 )',
		borderRightWidth: 1,
		// borderLeftColor: 'rgba( 0, 0, 0, 0.1 )',
		// borderLeftWidth: 1,
		paddingVertical: 8,
		paddingHorizontal: 3,
		alignItems: 'center',
		width: '33%'
	}
});