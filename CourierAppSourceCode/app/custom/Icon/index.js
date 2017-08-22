
import React, { Component } from 'react';
import {createIconSetFromFontello} from 'react-native-vector-icons';
import config from '../../assets/icons/config';
import { SizeStyles } from '../../config/styles';
import { DefaultColors } from '../../config/colors';
import { NormalizeRatio } from '../../config/icons';

let Icon = createIconSetFromFontello(config);

class icon extends Component {
	setNativeProps(nativeProps) {
		this._root.setNativeProps(nativeProps);
	}
	render() {
		const { name, size, color, children, style, ...restProps } = this.props;
		var _size  = null, _color = null;
		if(color || !style || (style && !style.color))
		{
			_color = color ? color : DefaultColors.text;
		}
		if(size || !style || (style && !style.fontSize)){
			var _size = size ? size : 'medium';
			if( typeof _size === 'string' )
			{
				var fontSize = SizeStyles[_size].fontSize;
				if( fontSize )
				{
					_size = fontSize;
				}
			}
		}
		var normalizeRatio = NormalizeRatio[name];
		if( normalizeRatio )
			_size *= normalizeRatio;
		return (
			<Icon ref={component => this._root = component} name ={name} size={_size} color={_color} style={[style]} {...restProps}>{children}</Icon>
		);
	}
};

module.exports = icon;