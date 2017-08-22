
import React, { Component } from 'react';
import { Text, Platform } from 'react-native';
import { WeightStyles, SizeStyles, AlignStyles } from '../../config/styles';
import { DefaultColors } from '../../config/colors';

class Echo extends Component {
	setNativeProps(nativeProps) {
		this._root.setNativeProps(nativeProps);
	}
	render() {
		const { isLatin, align, size, color, bold, children, style, ...restProps } = this.props;
		var _style   = style ? ( Array.isArray(style) ? Object.assign(...style) : style ) : null,
			styles   = [bold ? WeightStyles.bold : (isLatin ? {} : WeightStyles.normal), _style],
			topRatio = Platform.OS.toLowerCase() == 'ios' ? 0.25 : 0.15;
		if(color || !_style || (_style && !_style.color))
		{
			styles.push({ color: color ? color : DefaultColors.text });
		}
		if(size || !_style || (_style && !_style.fontSize))
		{
			var _size = size ? size : 'medium';
			if( !isNaN(parseFloat(_size)) && isFinite(_size) )
			{
				sizeStyles = { fontSize : _size, top: _size * topRatio };
			}
			else
			{
				sizeStyles = SizeStyles[_size];
			}
			if( sizeStyles )
			{
				styles.push(sizeStyles);
				var fontSize = sizeStyles.fontSize;
				if(fontSize)
					styles.push({ top: fontSize * topRatio });
			}
		}
		if(align || !_style || (_style && !_style.textAlign))
		{
			var _align = align ? align : 'right';
				alignStyles = AlignStyles[_align];
			if( alignStyles )
			{
				styles.push(alignStyles);
			}
		}
		return (
			<Text ref={component => this._root = component} style={styles} {...restProps}>{children}</Text>
		);
	}
};

export default Echo;
