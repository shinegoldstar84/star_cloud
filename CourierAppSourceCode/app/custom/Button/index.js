import React, { Component } from 'react';
import { View, TouchableHighlight, ActivityIndicator, Vibration } from 'react-native';
import Styles from './style';
import { PaddingStyles, BorderRadiusStyles, BoxShadowStyles, DisabledStyles, HiddenStyles } from '../../config/styles';
import Text from '../Text';
import Icon from '../Icon';

class Button extends Component 
{
	
	render() {
		const { bold, borderWidth, hideContainer, containerStyle, disabled, isLoading, style, title, icon, iconLeft, background, padding, color, borderColor, size, iconSize, shadow, radius, wide, underlayColor, ...restProps } = this.props;
		let loading = !!isLoading,
			hasIcon  = icon && icon.length,
			hasIconLeft = iconLeft && iconLeft.length,
			hasTitle = title && title.length,
			hasBackground = background && background.length,
			hasBorder = borderColor && borderColor.length,
			_shadow = shadow && shadow.length && BoxShadowStyles[shadow] ? BoxShadowStyles[shadow] : {},
			_radius = radius
						?
						(
							!isNaN(parseFloat(radius)) && isFinite(radius)
							? {borderRadius: radius}
							: (
								BorderRadiusStyles[radius]
								? BorderRadiusStyles[radius]
								: {}
							)
						)
						: {},
			_padding = padding ? (!isNaN(parseFloat(padding)) && isFinite(padding) ? {padding: padding} : (PaddingStyles[padding] ? ( !(hasIcon && hasIconLeft) && !hasTitle ? {padding: PaddingStyles[padding].paddingHorizontal} : PaddingStyles[padding]) : {})) : {},
			_background = hasBackground ? { backgroundColor: background } : {},
			_borderColor = hasBorder || hasBackground ? { borderWidth: borderWidth ? borderWidth : 1, borderColor: (hasBorder ? borderColor : background) } : {},
			_wide = wide ? { flex: 1 } : {},
			_disabled = disabled || loading ? DisabledStyles : {},
			_hidden = loading ? HiddenStyles : {},
			_underlayColor = underlayColor ? underlayColor : 'rgba(255, 255, 255, 0)',
			_size = typeof size === 'string' ? (size.includes('large') !== -1 ? 'large' : (size.includes('small') !== -1 ? 'small' : size)) : size;
			longPress= restProps.onLongPress ? restProps.onLongPress : null,
			_button = (
				<TouchableHighlight
					underlayColor={ _underlayColor }
					disabled={disabled || loading}
					style={[Styles.btn, style, _shadow, _radius, _wide, _borderColor, _disabled]}
					{...restProps}>
					<View style={[Styles.btn__inner, _background, _radius, _wide, _padding]}>
						{hasIcon ? (<Icon color={color} size={iconSize} style={[Styles.btn__icon, (hasTitle || hasIconLeft ? Styles.iconRight : {}), _hidden]} name={icon}/>) : null}
						{hasTitle ? (<Text color={color} size={size} bold={bold} style={_hidden}>{title}</Text>) : null}
						{hasIconLeft ? (<Icon color={color} size={size} style={[Styles.btn__icon, (hasTitle ? Styles.iconLeft : {}), _hidden]} name={iconLeft}/>) : null}
						{loading ? (<ActivityIndicator animating={true} color={color} size={!(!isNaN(parseFloat(size)) && isFinite(size)) && !['small', 'large'].includes(_size) ? 'small' : _size} style={Styles.loading} />) : null}
					</View>
				</TouchableHighlight>
			);
			return hideContainer ? _button : (<View style={[Styles.btn__container, (containerStyle ? containerStyle : {})]}>{_button}</View>);
		
	}
};

export default Button;
