import React 			from 'react';
import { 
	View,
	Text,
	StyleSheet
}	from 'react-native';

export default class Address extends React.Component
{

	render()
	{
		return (
			<View>
				<View>
					<Text style={ [ styles.textColorWhite, styles.fontBold, styles.fontSizeBig ] }>
						{ this.props.type === 'origin' ? 'مبدا' : 'مقصد' }
					</Text>
					{
						this.props.district ? <Text style={ [ styles.textColorWhite, styles.fontBold, styles.fontSizeBig ] }>{ 'منطقه' + this.props.district }</Text> : null
					}
					{
						this.props.address ? <Text style={ [ styles.textColorWhite, styles.fontBold, styles.fontSizeBig ] }>{ this.props.address }</Text> : null
					}
					{
						this.props.number ? <Text style={ [ styles.textColorWhite, styles.fontBold, styles.fontSizeBig ] }>{ 'پلاک' + this.props.number }</Text> : null
					}
					{
						this.props.unit ? <Text style={ [ styles.textColorWhite, styles.fontBold, styles.fontSizeBig ] }>{ 'واحد' + this.props.unit }</Text> : null
					}
				</View>
			</View>
		);
	}

}

const styles = StyleSheet.create(
{
	textColorWhite: {
		color: 'white'
	},
	displayInline: {
		display: 'inline-block'
	},
	fontBold: {
		fontWeight: 'bold'
	},
	fontSizeBig: {
		fontSize: 18
	}
})