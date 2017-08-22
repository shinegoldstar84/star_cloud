import React from 'react';
import {
	View,
	StyleSheet,
	ActivityIndicator,
	TouchableHighlight
} from 'react-native';
import Chart 		from 'react-native-chart';
import Text 		from './Text';
import { GetColor }	from './Utils/color';
import {
	BoxShadowStyles
}	from '../config/styles';

export default class CustomChart extends React.Component
{

	constructor ( props )
	{

		super ( props );
		this.state = {
			activeFilter: 'day'
		};

	}

	changeFilter ( filter )
	{

		this.setState({ activeFilter: filter });
		this.props.changeFilter( filter, this.props.type  );

	}

	render()
	{
		return (
			<View style={ styles.chartContent }>
				{
					this.props.text && this.props.text.length ?
					<Text>{ this.props.text }</Text>
					: null
				}
				<View style={ styles.chartContainer }>
				{
					this.props.summaryData && this.props.summaryData.length
						?	<Chart
								style={styles.chart}
								data={ this.props.summaryData }
								type="bar"
								dataPointRadius={ 0 }
								yAxisWidth={ 50 }
								xAxisHeight={ 50 }
						 	/>
						: <ActivityIndicator 
								animating={ true }
								color="#000"
							/>

				}
					 
				</View>
				<View style={ styles.buttons }>
					<TouchableHighlight 
						underlayColor='transparent'
						onPress={ () => this.changeFilter( 'month' ) } 
						style={[ styles.button, styles.buttonFirst, this.state.activeFilter == 'month' ? styles.buttonSelected : {} ]}
					>
						<View>
							<Text color={ GetColor( this.state.activeFilter == 'month' ? 'white' : 'gray-c' ) }>ماه</Text>
						</View>
					</TouchableHighlight>
					<TouchableHighlight 
						underlayColor='transparent'
						onPress={ () => this.changeFilter( 'week' ) }
						style={[ styles.button, this.state.activeFilter == 'week' ? styles.buttonSelected : {} ]}
					>
						<View>
							<Text color={ GetColor( this.state.activeFilter == 'week' ? 'white' : 'gray-c' ) }>هفته</Text>
						</View>
					</TouchableHighlight>
					<TouchableHighlight 
						underlayColor='transparent'
						onPress={ () => this.changeFilter( 'day' ) } 
						style={[ styles.button, styles.buttonLast, this.state.activeFilter == 'day' ? styles.buttonSelected : {} ]}
					>
						<View>
							<Text color={ GetColor( this.state.activeFilter == 'day' ? 'white' : 'gray-c' ) }>روز</Text>
						</View>
					</TouchableHighlight>
				</View>
			</View>
		);
	}

}

const styles = StyleSheet.create(
{
	chart: {
		width: 300,
		height: 220,
		marginLeft: -15,
	},
	chartContainer: {
		flex: 1,
		flexDirection: 'row-reverse',
		justifyContent: 'center',
		alignItems: 'center',
		// borderRadius: 6,
	},
	chartContent: {
		flex: 1,
		backgroundColor: 'white',
		// marginTop: 20,
		// padding: 16,
		// borderRadius: 6
	},
	buttons: {
		flexDirection: 'row',
		marginTop: 20,
		justifyContent: 'center',
	},
	button: {
		borderColor: GetColor('gray-e'),
		paddingVertical: 5,
		paddingHorizontal: 25,
		borderWidth: 1,
		marginLeft: -1
	},
	buttonSelected: {
		backgroundColor: GetColor('blue-a'),
		borderColor: GetColor('blue-a'),
		...BoxShadowStyles.very
	},
	buttonFirst: {
		borderTopRightRadius: 2,
		borderBottomRightRadius: 2,
		borderRightWidth: 1,
	},
	buttonLast: {
		borderTopLeftRadius: 2,
		borderBottomLeftRadius: 2,
	}
})