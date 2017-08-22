import { StyleSheet } from 'react-native';
import { DefaultColors } from '../../config/colors';
import { GetColor } from '../Utils/color';


const styles = StyleSheet.create(
{
	container: {
		flex: 1,
		height: 20,
		justifyContent: 'space-between',
		alignItems: 'center',
		flexDirection: 'row',
	},
	circles__wrapper: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-end',
	},
	circle: {
		// width: 20,
		// height: 20,
		// borderRadius: 15,
		// backgroundColor: GetColor( 'blue-a' ),
		// position: 'absolute',
		zIndex: 1,
		// top: 8,
		alignItems: 'center',
		justifyContent: 'center',
		paddingBottom: 10,
	},
	line: {
		zIndex: 0,
		position: 'absolute',
		left: 0,
		right: 0,
		bottom: 0,
		borderBottomColor: GetColor( 'gray-a' ),
		borderBottomWidth: 2
	},
	statusIcon: {
		position: 'absolute',
		top: 7,
		left: 8
	},
	position__statusWrapper: {
		zIndex: 1,
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		height: 28,
		alignItems: 'center',
		justifyContent: 'center',
	},
	position__dot: {
		zIndex: 0,
		position: 'absolute',
		bottom: -3,
		width: 10,
		height: 10,
		backgroundColor: GetColor('gray-a'),
		borderWidth: 2,
		borderColor: GetColor('gray-a'),
		borderRadius: 5,
	},
	marker__shadow: {
		zIndex: 1,
		// position: 'absolute',
		// top: 0,
		// bottom: 0,
		// right: 0,
		// left: 0,
	},
});

export default styles;