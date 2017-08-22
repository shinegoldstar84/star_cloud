import React from 'react';
import { 
	TouchableNativeFeedback,
	ActivityIndicator,
	View,
	Text,
	StyleSheet
}	from 'react-native';
import { ucFirst }	from '../lib/Helpers';

export default class LoginButton extends React.Component
{

	getChilds()
	{
		let customTextColorClass = this.props.bgColor ? styles[ `textColor${ ucFirst( this.props.bgColor ) }` ] : '';
		return (
			<View style={ [ styles.loadingButton, customTextColorClass, ( this.props.disabled || this.props.isLoading ) ? styles.disabled : null ] } >
			{
				!this.props.isLoading 
					? <Text style={ styles.lbText }>{ this.props.text }</Text>
					: <ActivityIndicator
						animating={ true }
						color="#ffffff"
					/>
			}
			</View>
		);
	}

	render()
	{
		return (
			<View>
				<TouchableNativeFeedback
					onPress={ this.props.handlePress }
					disabled={ this.props.disabled || this.props.isLoading }
					background={ TouchableNativeFeedback.SelectableBackground() }
					>
					{ this.getChilds() }
				</TouchableNativeFeedback>
			</View>
		);
	}

}

const styles = StyleSheet.create(
{
	loadingButton: {
		backgroundColor: '#19a4e1',
		width: 340,
		height: 50,
		justifyContent: 'center',
	},
	lbText: {
		color: '#ffffff',
		textAlign: 'center',
		fontSize: 16,
		fontWeight: 'bold'
	},
	textColorGreen: {
		backgroundColor: '#00c853',
	},
	textColorRed: {
		backgroundColor: '#e53935',
	},
	textColorBlue: {
		backgroundColor: '#149cd8'
	},
	disabled: {
		opacity: 0.5
	}
})