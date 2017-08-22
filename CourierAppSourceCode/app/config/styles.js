
import { Platform } from 'react-native';

let WeightStyles = {
		none: {},
		normal: {
			fontFamily: 'IRANSansMobileFaNum',
			fontWeight: 'normal'
		},
		bold: {
			fontFamily: Platform.OS.toLowerCase() == 'ios' ? 'IRANSansMobileFaNum-Medium' : 'IRANSansMobile(FaNum) Medium',
			fontWeight: 'normal'
		}
	},
	SizeStyles = {
		none: {},
		superLarge: {
			fontSize: 55
		},
		extraLarge: {
			fontSize: 38
		},
		xveryLarge: {
			fontSize: 32
		},
		veryLarge: {
			fontSize: 28
		},
		xxxlarge: {
			fontSize: 22,
		},
		xxlarge: {
			fontSize: 20,
		},
		xlarge: {
			fontSize: 18,
		},
		large: {
			fontSize: 16,
		},
		medium: {
			fontSize: 14,
		},
		small: {
			fontSize: 12,
		},
		xsmall: {
			fontSize: 10,
		}
	},
	AlignStyles = {
		none: {},
		left: {
			textAlign: 'right'
		},
		right: {
			textAlign: 'left'
		},
		center: {
			textAlign: 'center'
		}
	},
	BorderRadiusStyles = {
		none: {},
		few: {
			borderRadius: 3
		},
		medium: {
			borderRadius: 5
		},
		very: {
			borderRadius: 5000
		}
	},
	BoxShadowStyles = {
		none: {
			elevation: 0,
			shadowOffset: {
				width: 0,
				height: 0
			},
			shadowRadius: 0,
			shadowOpacity: 0,
			shadowColor: 'black'
		},
		few: {
			elevation: 2,
			shadowOffset: {
				width: 0,
				height: 1
			},
			shadowRadius: 1,
			shadowOpacity: 0.25,
			shadowColor: 'black'
		},
		very: {
			elevation: 3,
			shadowOffset: {
				width: 0,
				height: 1
			},
			shadowRadius: 2,
			shadowOpacity: 0.4,
			shadowColor: 'black'
		}
	},
	PaddingStyles = {
		none: {
			padding: 0,
			paddingHorizontal: 0,
			paddingVertical: 0,
			paddingTop: 0,
			paddingBottom: 0,
			paddingLeft: 0,
			paddingRight: 0
		},
		small: {
			paddingVertical: 0,
			paddingHorizontal: 7
		},
		medium: {
			paddingVertical: 3,
			paddingHorizontal: 10
		},
		large: {
			paddingVertical: 7,
			paddingHorizontal: 14
		},
		xlarge: {
			paddingVertical: 14,
			paddingHorizontal: 20
		}
	},
	DisabledStyles = {
		opacity: 0.5,
		elevation: 0
	},
	HiddenStyles = {
		opacity: 0
	},
	WrapperStyles = {
		flex: 1,
		padding: 15
	};

export {
	WeightStyles, SizeStyles, AlignStyles, BorderRadiusStyles, BoxShadowStyles, PaddingStyles, DisabledStyles, HiddenStyles, WrapperStyles
};
