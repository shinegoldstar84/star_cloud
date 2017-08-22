
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { DefaultColors } from '../../config/colors';
import { GetColor } from '../Utils/color';

var styles = StyleSheet.create({
	iconicItems__container: {
		flexDirection: 'row',
		flexWrap: 'wrap'
	},
	iconicItems__Item: {
		flexDirection: 'row',
		width: '100%'
	},
	iconicItems__ItemIcon: {
		flexShrink: 0,
		top: 2,
		marginRight: 10,
		color: GetColor('navy-b')
	},
	iconicItems__ItemText: {
		flexGrow: 1,
		color: GetColor('navy-b')
	},
	iconicItems__iconBold: {
		color: GetColor('blue-a')
	},
	iconicItems__textBold: {
		color: GetColor('gray-c')
	}
});

export default styles;