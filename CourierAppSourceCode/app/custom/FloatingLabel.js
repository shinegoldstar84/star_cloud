'use strict';
import React, {Component, PropTypes} from 'react';

import {
	StyleSheet,
	TextInput,
	LayoutAnimation,
	Animated,
	Easing,
	Text,
	View,
	Platform
} from 'react-native';
import AloText			from './Text';
import { WeightStyles }	from '../config/styles';
import { GetColor }		from './Utils/color';

var textPropTypes = Text.propTypes || View.propTypes
var textInputPropTypes = TextInput.propTypes || textPropTypes
var propTypes =
{
	...textInputPropTypes,
	inputStyle: textInputPropTypes.style,
	labelStyle: textPropTypes.style,
	disabled: PropTypes.bool,
	style: View.propTypes.style,
}

var FloatingLabel  = React.createClass(
{
	propTypes: propTypes,

	getInitialState ()
	{
		var state =
		{
			text: this.props.value,
			dirty: !!this.props.value,
			height: 49,
			invalid: false,
			focused: false,
			isTouched: false
		};

		var style = state.dirty ? dirtyStyle : cleanStyle
		state.labelStyle =
		{
			fontSize: new Animated.Value( style.fontSize ),
			top: new Animated.Value( style.top )
		}

		return state
	},

	componentWillMount ()
	{
		this.setState(
		{
			invalid: !this.checkValidation( this.state.text )
		});
	},
	
	componentWillReceiveProps (props)
	{
		if (
			props.hasOwnProperty('value')
			&&
			props.value !== undefined
			&&
			props.value
			&&
			props.value.length
			&&
			props.value !== this.state.text
		)
		{
			this.setState( { text: props.value/*, dirty: !!props.value*/ } )
			this._animate( !!props.value )
		}

	},

	_animate(dirty)
	{
		var nextStyle = dirty ? dirtyStyle : cleanStyle
		var labelStyle = this.state.labelStyle
		var anims = Object.keys( nextStyle ).map( prop =>
		{
			return Animated.timing(
				labelStyle[ prop ],
				{
					toValue: nextStyle[ prop ],
					duration: 50
				},
				Easing.ease
			)
		})

		Animated.parallel( anims ).start()
	},

	_onFocus ()
	{
		this._animate( true );
		this.setState( {
			dirty: true,
			focused: true
		} );
		if ( this.props.onFocus )
		{
			this.props.onFocus( arguments );
		}
	},

	_onBlur ()
	{
		this.setState({
			focused: false
		})
		if ( !this.state.text )
		{
			this._animate( false )
			this.setState( {
				dirty: false,
			} );
		}

		if ( this.props.onBlur )
		{
			this.props.onBlur( arguments );
		}
	},

	checkValidation( text )
	{
		const pattern = this.props.pattern;
		const regex = pattern ? new RegExp ( pattern ) : null;
		return !this.props.validate
				||
				(
					(
						!this.props.required
						||
						( text && text.length )
					)
					&&
					(
						!( text && text.length )
						||
						!regex
						||
						regex.test( text )
					)
				);
	},

	handleAutoHeight( event )
	{
		this.setState(
		{
			height: event.nativeEvent.contentSize.height + (Platform.OS.toLowerCase() == 'ios' ? 18 : 0),
		});
	},

	onChange( event )
	{
		if ( this.props.onChange )
		{
			this.props.onChange( event );
		}
		if ( this.props.multiline )
		{
			this.handleAutoHeight( event );
		}
	},

	onChangeText( text )
	{
		this.setState(
		{
			text: text,
			isTouched: true,
			invalid: !this.checkValidation( text )
		});
		if ( this.props.onChangeText )
		{
			this.props.onChangeText( text )
		}
	},

	updateText( event )
	{
		var text = event.nativeEvent.text
		this.setState( { text } )

		if ( this.props.onEndEditing )
		{
			this.props.onEndEditing( event )
		}
	},


	_renderLabel ()
	{
		return (
			<Animated.Text
				ref='label'
				style={ [ this.state.labelStyle, styles.label, this.props.labelStyle ] }
			>
				<AloText color={ this.props.labelColor ? this.props.labelColor : GetColor('gray-c') }>{this.props.children}</AloText>
			</Animated.Text>
		)
	},

	render()
	{
		var borderColor = (
				(
					this.state.text
					&&
					this.state.text.length
				)
				||
				this.props.required
			)
			&&
			this.state.isTouched
			&&
			this.props.validate
			? (
				this.state.invalid
				? GetColor('red-a')
				: GetColor('green-a')
			)
			: (
				this.props.underlineColorAndroid
				? this.props.underlineColorAndroid
				: GetColor('gray-f')
			);
		var props =
		{
				autoCapitalize: this.props.autoCapitalize,
				autoCorrect: this.props.autoCorrect,
				autoFocus: this.props.autoFocus,
				bufferDelay: this.props.bufferDelay,
				clearButtonMode: this.props.clearButtonMode,
				clearTextOnFocus: this.props.clearTextOnFocus,
				controlled: this.props.controlled,
				editable: this.props.editable,
				enablesReturnKeyAutomatically: this.props.enablesReturnKeyAutomatically,
				keyboardType: this.props.keyboardType,
				multiline: this.props.multiline,
				onBlur: this._onBlur,
				onChange: this.onChange,
				onChangeText: this.onChangeText,
				onEndEditing: this.updateText,
				onFocus: this._onFocus,
				onSubmitEditing: this.props.onSubmitEditing,
				password: this.props.secureTextEntry || this.props.password, // Compatibility
				secureTextEntry: this.props.secureTextEntry || this.props.password, // Compatibility
				returnKeyType: this.props.returnKeyType,
				selectTextOnFocus: this.props.selectTextOnFocus,
				selectionState: this.props.selectionState,
				style: [
					styles.input,
					this.props.inputStyle,
					(
						this.props.isLatin
						? styles.latinInput
						: WeightStyles.normal
					),
					(
						this.state.focused
						? styles.inputFocused
						: {}
					),
					{ height: this.state.height },
				],
				testID: this.props.testID,
				value: this.props.value,
				onKeyPress: this.props.onKeyPress,
				maxLength: this.props.maxLength,
				labelColor: this.props.labelColor,
				underlineColorAndroid: borderColor,
			},
			elementStyles = [ styles.element ];

		if ( this.props.inputStyle )
		{
			props.style.push( this.props.inputStyle );
		}

		if ( this.props.style )
		{
			elementStyles.push( this.props.style );
		}

		return (
			<View style={ elementStyles } >
				{ this._renderLabel() }
				<TextInput
					{...props}
				>
				</TextInput>
				{
					Platform.OS.toLowerCase() != 'android'
					?
					<View style={{
						borderBottomWidth: this.state.focused ? 2 : 1,
						borderBottomColor: borderColor,
						position: 'absolute', top: '100%', marginTop: -11, left: 0, right: 0
					}}/>
					: null
				}
			</View>
		);
	},
});

var labelStyleObj =
{
	marginTop: 10,
	paddingRight: 3,
	position: 'absolute'
}

if ( Platform.OS === 'web' )
{
	labelStyleObj.pointerEvents = 'none'
}

var styles = StyleSheet.create(
{
	element:
	{
		position: 'relative'
	},
	input:
	{
		borderColor: 'gray',
		backgroundColor: 'transparent',
		justifyContent: 'center',
		color: 'black',
		fontSize: 16,
		borderRadius: 4,
		marginTop: 10,
		height: 49,
		borderWidth: 0,
	},
	latinInput: {
		fontSize: 18
	},
	label: labelStyleObj
})

var cleanStyle =
{
	fontSize: 16,
	top: 7
}

var dirtyStyle =
{
	fontSize: 12,
	top: -13,
}

FloatingLabel.propTypes =
{
	disabled: PropTypes.bool,
	style: Text.propTypes.style,
};

module.exports = FloatingLabel;
