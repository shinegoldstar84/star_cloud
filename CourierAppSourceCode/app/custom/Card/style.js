
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { DefaultColors } from '../../config/colors';
import { GetColor } from '../Utils/color';
import { BorderRadiusStyles, BoxShadowStyles } from '../../config/styles';

var styles = StyleSheet.create({
	card__container: {
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignSelf: 'flex-start'
	},
	card: {
		flex: 1,
		flexDirection: 'row',
		width: '100%'
	},
	card__colTimeline: {
		flexDirection: 'row',
		width: 50
	},
	colTimeline__inner: {
		alignItems: 'center',
		justifyContent: 'center'
	},
	timeline__lineTop: {
		width: 1.5,
		height: 7,
		backgroundColor: GetColor('gray-d')
	},
	timeline__lineBottom: {
		flexGrow: 1,
		flexShrink: 0,
		width: 1.5,
		height: 7,
		backgroundColor: GetColor('gray-d')
	},
	timeline__circle: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		width: 35,
		height: 35,
		borderRadius: 17.5,
		borderWidth: 1.25,
		borderColor: GetColor('gray-d'),
		overflow: 'hidden'
	},
	timeline__circleComponent: {
		marginHorizontal: 1,
	},
	timeline__circleComponentDefaultColor: {
		color: GetColor('gray-d')
	},
	timeline__circleComponentDefaultDisable: {
		color: GetColor('white'),
		backgroundColor: GetColor('gray-d'),
	},
	card__colContent: {
		flex: 1,
		paddingBottom: 7
	},
	card__arrow: {
		...BoxShadowStyles.few,
		position: 'absolute',
		top :20,
		right: '100%',
		width: 9,
		height: 9,
		transform: [
			{ translateX: -5 },
			{rotate: '45deg'}
		],
		backgroundColor: DefaultColors.cardBackground
	},
	card__arrowDisabled: {
		...BoxShadowStyles.none,
		backgroundColor: DefaultColors.lightBackground,
		borderWidth: 1.5,
		borderColor: GetColor('gray-d')
	},
	card__arrowOverlay: {
		position: 'absolute',
		top: 18,
		right: '100%',
		width: 10,
		height: 10,
		transform: [
			{ translateX: -5 },
			{ rotate: '45deg' }
		],
		backgroundColor: DefaultColors.cardBackground
	},
	card__arrowOverlayDisabled: {
		...BoxShadowStyles.none,
		backgroundColor: DefaultColors.lightBackground,
		borderWidth: 1.5,
		borderColor: GetColor('gray-d')
	},
	card__box: {
		...BoxShadowStyles.few,
		...BorderRadiusStyles.few,
		zIndex: 1,
	},
	card__boxDisabled: {
		...BoxShadowStyles.none,
		borderWidth: 1.5,
		borderColor: GetColor('gray-d')
	},
	card__boxInner: {
		...BorderRadiusStyles.few,
		zIndex: 1,
		backgroundColor: DefaultColors.cardBackground,
		overflow: 'hidden'
	},
	card__boxInnerDisabled: {
		backgroundColor: DefaultColors.lightBackground
	},
	card__header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		minHeight: 46,
		paddingVertical: 10,
		paddingHorizontal: 15
	},
	header__contentCol: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		flexGrow: 1
	},
	header__toggleCol: {
		minWidth: 20,
		flexShrink: 0,
		flexDirection: 'row',
		alignItems: 'center',
		paddingLeft: 8
	},
	header__toggleIcon: {
		color: GetColor('gray-b')
	},
	card__body: {
		overflow: 'hidden'
	},
	card__bodyInner: {
		paddingVertical: 17,
		paddingHorizontal: 20
	},
	card__bodyInnerBordered: {
		borderTopWidth: 1,
		borderTopColor: GetColor( 'black', 0.2 ),
	},
	card__bodyInnerBorderedDisabled: {
		borderTopColor: GetColor('gray-d'),
	},
	card__footer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		minHeight: 46,
		paddingVertical: 10,
		paddingHorizontal: 15,
		borderTopWidth: 1,
		borderTopColor: GetColor( 'black', 0.2 ),
	},
	card__footerDisabled: {
		borderTopColor: GetColor('gray-d')
	},
});

export default styles;