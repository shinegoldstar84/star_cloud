import React 		from 'react';
import {
	View,
	StyleSheet,
	TouchableNativeFeedback,
	ActivityIndicator
}	from 'react-native';
import Text from './Text';
import Icon from './Icon';

export default class Tiles extends React.Component
{

	render()
	{
		return (
			<View style={ [ styles.primary, styles.parent ] }>
				<View style={ styles.card }>
					<TouchableNativeFeedback onPress={ this.props.t1Press }>
						<View style={ styles.tile }>
							<View style={ styles.tile__iconWrapper }>
								<Icon name='money' style={{ fontSize: 55 }} />
							</View>
							<Text size='xlarge' style={{ lineHeight: 22 }}>
								گردش مالی
							</Text>
						</View>
					</TouchableNativeFeedback>
					<TouchableNativeFeedback onPress={ this.props.t2Press }>
						<View style={ styles.tile }>
							<View style={ styles.tile__iconWrapper }>
								<Icon name='road' style={{ fontSize: 55 }} />
							</View>
							<Text size='xlarge' style={{ textAlign: 'center', marginTop: 10, lineHeight: 22 }} >
								مناطق پر درخواست
							</Text>
						</View>
					</TouchableNativeFeedback>
				</View>
				<View style={ styles.card }>
					<TouchableNativeFeedback onPress={ this.props.t3Press }>
						<View style={ styles.tile }>
							<View style={ styles.tile__iconWrapper }>
								<Text style={{ fontSize: 27, lineHeight: 27 }} >
									{ 
										this.props.rate && parseFloat( this.props.rate ).toFixed(2) + ' / 5' 
									}
								</Text>
							</View>
							<Text size='xlarge' style={{ lineHeight: 22 }}>
								امتیاز
							</Text>
						</View>
					</TouchableNativeFeedback>
					<TouchableNativeFeedback onPress={ this.props.t4Press }>
						<View style={ styles.tile }>
							<View style={ styles.tile__iconWrapper }>
								<Icon name='list-bulleted' style={{ fontSize: 55 }} />
							</View>
							<Text size='xlarge' style={{ lineHeight: 22 }}>
								لیست سفرها
							</Text>
						</View>
					</TouchableNativeFeedback>
				</View>
			</View>
		);
	}
}


const styles = StyleSheet.create(
{
	parent: {
		flexDirection: 'row-reverse',
	},
	tile: {
		flex: 0.5,
		alignSelf: 'stretch',
		justifyContent:'center',
		alignItems:'center',
		backgroundColor: '#272e38',
		paddingHorizontal: 10,
		paddingVertical: 15,
		margin: 5,
		borderRadius: 4
	},
	card: {
		flex: 1,
	},
	primary: {
		flex: 1,
		backgroundColor: '#2f3641',
		// padding: 8,
		marginBottom: 5
	},
	textColorWhite: {
		color: '#ffffff'
	},
	largeText: {
		fontSize: 19,
		fontWeight: 'bold',
	},
	textAlignCenter: {
		textAlign: 'center'
	},
	textColorGray: {
		color: '#d8d8d8'
	},
	tile__iconWrapper: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
})