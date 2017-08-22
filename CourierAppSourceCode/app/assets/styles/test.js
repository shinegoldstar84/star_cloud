import { StyleSheet }	from 'react-native';
import cairn 			from 'cairn';
import { Dimensions }	from 'react-native';

const window = Dimensions.get( 'window' );

export default cairn(
{
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	map: {
		...StyleSheet.absoluteFillObject,
		zIndex: 0
	},
	btn: {
		// flexDirection: 'row',
		// justifyContent: 'space-between',
		// width: window.width * 0.75,
		// borderRadius: 21,
		padding: 4,
		// height: 42,
		alignItems: 'center',
		// backgroundColor: '#ffa726',
		loading: {
			opacity: 0.5
		},
		marginTop: -55,
	},
	textColorWhite: {
		color: '#fff',
	},
	font16: {
		fontSize: 16,
	},
	font22: {
		fontSize: 22,
	},
	font11: {
		fontSize: 11,
	},
	mtn4: {
		marginTop: -4
	},
	hasIndicatorBottom: {
		// width: 100,
		':after': {
			color: '#f00',
			width: 10,
			height: 20,
			backgroundColor: '#222'
		}
	},
	content: {
		flex: 1,
		flexDirection: 'row',
		padding: 8
	},
	input: {
		backgroundColor: '#fff',
	},
	nearsCount: {
		width: 36,
		height: 36,
		borderRadius: 18,
		borderWidth: 1,
		borderColor: '#fff',
		justifyContent: 'center',
		alignItems: 'center',
	},
	mtn20: {
		marginTop: -16,
	},
	mtn22: {
		marginTop: -18,
	},
	ml1: {
		marginLeft: 0
	},
	arrowLeft: {
		width: 0,
		height: 0,
		borderTopWidth: 8,
		borderTopColor: 'transparent',
		borderBottomWidth: 8,
		borderBottomColor: 'transparent',
		borderRightWidth: 8,
		borderRightColor: '#fff',
		marginRight: -5
	},
	
	trivial: {
		position: 'absolute',
		width: 200,
		height: 2, 
		top: ( window.height / 2 ) - 57,
		backgroundColor: 'red'
	},
	hasGreenBg: {
		backgroundColor: '#00c853'
	},
	hasGrayBg: {
		backgroundColor: '#a1aaae'
	},
	centered: {
		justifyContent: 'center'
	},
	invisible: {
		opacity: 0
	}
}, ( styles ) => StyleSheet.create( styles ) );