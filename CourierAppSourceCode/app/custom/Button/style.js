
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

var styles = StyleSheet.create({
	btn__container: {
		flexDirection: 'row'
	},
	btn: {
		alignSelf: 'flex-end',
		flexDirection: 'row',
		justifyContent: 'center',
		// borderWidth: 1,
		borderStyle: 'solid',
		borderColor: 'transparent',
	},
	btn__inner: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		overflow: 'hidden',
	},
	iconLeft: {
		marginLeft: 5
	},
	iconRight: {
		marginRight: 5
	},
	loading: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0
	}
});

export default styles;