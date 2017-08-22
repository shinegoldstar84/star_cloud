
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Styles from './style';
import Text from '../Text';
import Icon from '../Icon';
import { SizeStyles } from '../../config/styles';
import { DefaultColors } from '../../config/colors';
import { DefaultIcons } from '../../config/icons';
import { GetColor } from '../Utils/color';

class Address extends Component 
{
	render() {
		const { type, data, style, ...restProps } = this.props;
		const boldItems = [ 'description' ];

		return data && Object.keys(data).length ? (
			<View style={[Styles.iconicItems__container, style]} {...restProps}>
				{(function(){
					var listItems = [];
					for (var name in data) {
						if (data.hasOwnProperty(name)) {
							var datum = data[name];
							if( typeof datum === 'function' )
								datum = datum(this);
							if(datum) {
								var itemValue = null,
									itemIcon = null,
									itemIconColor = null,
									itemTextColor = null,
									itemSize = 'medium',
									itemStyle = null,
									itemIconStyle = {},
									itemTextStyle = {},
									defaultIcon = DefaultIcons[name] ? DefaultIcons[name] : null,
									isBold = boldItems.includes(name),
									typeColor = DefaultColors[type] ? DefaultColors[type] : null,
									defaultIconColor = isBold ? StyleSheet.flatten( Styles.iconicItems__iconBold ).color : typeColor,
									defaultTextColor = isBold ? StyleSheet.flatten( Styles.iconicItems__textBold ).color : null;
								if( typeof datum === 'object' ) {
									itemValue = datum.value;
									itemIcon = datum.icon ? datum.icon : defaultIcon;
									itemStyle = datum.style ? datum.style : {};
									itemSize = datum.size ? datum.size : 'medium';
									itemIconStyle = datum.iconStyle ? datum.iconStyle : {};
									itemTextStyle = datum.textStyle ? datum.textStyle : {};
									itemIconColor = datum.iconColor ? datum.iconColor : defaultIconColor;
									itemTextColor = datum.textColor ? datum.textColor : defaultTextColor;
								} else {
									if( Array.isArray(datum) )
										datum = datum.join('، ');
									itemValue = datum;
									itemIcon = defaultIcon;
									itemIconColor = defaultIconColor;
									itemTextColor = defaultTextColor;
								}
								if(itemValue && itemValue.length) {
									itemSize = SizeStyles[itemSize].fontSize;
									listItems.push(
										<View style={[Styles.iconicItems__Item, itemStyle]} key={name}>
											{itemIcon ? (<Icon name={itemIcon} size={itemSize*1.3} style={[Styles.iconicItems__ItemIcon, itemIconStyle, (itemIconColor ? {color: itemIconColor} : {})]}/>) : null}
											<Text size={itemSize} style={[{flex: 1, color: StyleSheet.flatten(Styles.iconicItems__ItemText).color}, itemTextStyle, restProps.textColorStyle ? restProps.textColorStyle : {} , (itemTextColor ? {color: itemTextColor} : {})]}>{itemValue.replace(/\\n/g, "\n")}</Text>
										</View>
									);
								}
							}
						}
					}
					return listItems;
				})()}
			</View>
		) : null;
	}
};

export default Address;
