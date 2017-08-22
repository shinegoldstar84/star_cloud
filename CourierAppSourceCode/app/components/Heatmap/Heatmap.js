import React 			from 'react';
import MapView 			from 'react-native-maps';
import { 
	StyleSheet,
	View,
	Picker
}	from 'react-native';
import Spinner			from 'react-native-loading-spinner-overlay';
import { GetColor }		from '../../custom/Utils/color';
import Icon 			from '../../custom/Icon';
import Text 			from '../../custom/Text';
import Button 			from '../../custom/Button';
import { persianDate }	from '../../lib/PersianDate';

export default class Heatmap extends React.Component
{

	constructor ( props )
	{

		super ( props );
		this.selectedHourDefaultText = 'ساعت';
		this.state = {
			selectedHour : this.selectedHourDefaultText
		};

	}

	render ()
	{

		return (
			<View style={{ flex : 1 }}>
			{
				this.props.data &&
				 <MapView
				 	style={ styles.map }
				    initialRegion={{
				      latitude: 35.7164996,
				      longitude: 51.4099373,
				      latitudeDelta: 0.28,
				      longitudeDelta: 0.26,
				    }}>
				    	{
				    		this.props.data && this.props.data.map( ( item, index ) =>
				    		{
				    			let color = Math.round( ( this.props.max - item.count ) / this.props.max * 200 );
				    			let opacity = Math.min( item.count / this.props.max, 0.6 );
				    			let fillColor = `rgba( 235, ${color}, 110, ${opacity} )`;
				    			return (
						    		<MapView.Polygon 
						    			coordinates={ 
						    				[
						    					{ latitude: item.point_south, longitude: item.point_west },
						    					{ latitude: item.point_north, longitude: item.point_west },
						    					{ latitude: item.point_north, longitude: item.point_east },
						    					{ latitude: item.point_south, longitude: item.point_east },
						    				]
						    			}
						    			strokeWidth={ 0 }
						    			fillColor={ fillColor }
						    			key={ index }
						    		/>

				    			);
				    		})
				    	}
				 </MapView>
			}
			<View style={{ position: 'absolute', top: 0, left: 0, right: 0, backgroundColor: 'white', elevation: 5, paddingVertical: 5, paddingHorizontal: 5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
				<View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 5 }}>
					<Icon name="dot" color="#df96a7" size={23} style={{ marginRight: 5 }} />
					<Text color={ GetColor( 'navy-a' ) } style={{ width: 0, flex: 1, lineHeight: 20 }} align="center">درخواست زیاد</Text>
				</View>
				<View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 5 }}>
					<Icon name="dot" color="#f1bcc1" size={23} style={{ marginRight: 5 }} />
					<Text color={ GetColor( 'navy-a' ) } style={{ width: 0, flex: 1, lineHeight: 20 }} align="center">درخواست متوسط</Text>
				</View>
				<View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 5 }}>
					<Icon name="dot" color="#faebc0" size={23} style={{ marginRight: 5 }} />
					<Text color={ GetColor( 'navy-a' ) } style={{ width: 0, flex: 1, lineHeight: 20 }} align="center">درخواست کم</Text>
				</View>
			</View>
			<View style={ styles.bottomBox } >
				<Text size="xlarge" color={ GetColor('navy-f') }>{ persianDate.persianDayName( new Date() ) }</Text>
				<View style={{ flex: 1, paddingHorizontal: 15 }}>
					<Picker
						mode="dropdown"
						onValueChange={ ( value, index ) => {
							this.props.filterChange( value );
							this.setState({ selectedHour: value });
						}}
						selectedValue={this.props.selectedFilter}
						style={{ flex: 1, color: GetColor('white'), opacity: 0 }}
					>
						<Picker.Item label={ this.selectedHourDefaultText } value='' />
						<Picker.Item label='01:00' value='01' />
						<Picker.Item label='02:00' value='02' />
						<Picker.Item label='03:00' value='03' />
						<Picker.Item label='04:00' value='04' />
						<Picker.Item label='05:00' value='05' />
						<Picker.Item label='06:00' value='06' />
						<Picker.Item label='07:00' value='07' />
						<Picker.Item label='08:00' value='08' />
						<Picker.Item label='09:00' value='09' />
						<Picker.Item label='10:00' value='10' />
						<Picker.Item label='11:00' value='11' />
						<Picker.Item label='12:00' value='12' />
						<Picker.Item label='13:00' value='13' />
						<Picker.Item label='14:00' value='14' />
						<Picker.Item label='15:00' value='15' />
						<Picker.Item label='16:00' value='16' />
						<Picker.Item label='17:00' value='17' />
						<Picker.Item label='18:00' value='18' />
						<Picker.Item label='19:00' value='19' />
						<Picker.Item label='20:00' value='20' />
						<Picker.Item label='21:00' value='21' />
						<Picker.Item label='22:00' value='22' />
						<Picker.Item label='23:00' value='23' />
					</Picker>
					<View pointerEvents="none" style={{ position: 'absolute', left: 15, right: 15, top: 0, bottom: 0, justifyContent: 'center' }}>
						<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomColor: GetColor('gray-e'), borderBottomWidth: 1 }}>
							<Text size="xlarge" color={ GetColor('gray-e') }>{ this.state.selectedHour.length ? this.state.selectedHour + ':00' : this.selectedHourDefaultText }</Text>
							<Icon name="arrow-down" size={ 11 } color={ GetColor('navy-f') }/>
						</View>
					</View>
				</View>
				<Button
					title='فیلتر'
					onPress={ this.props.filter }
					size="xlarge"
					padding="medium"
					radius="medium"
					borderColor={ GetColor('blue-a') }
					style={{ borderWidth: 1, minWidth: 65 }}
				/>
			</View>
			<Spinner 
					visible={this.props.isLoading}
					size="large"
					overlayColor="rgba( 0, 0, 0, 0.7 )"
					textContent={"لطفا صبر کنید ..."}
					textStyle={{color: '#FFF'}} 
				/>
			</View>
		);

	}

}

const styles = StyleSheet.create(
{
	map: {
		...StyleSheet.absoluteFillObject
	},
	bottomBox: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		padding: 15,
		backgroundColor: GetColor( 'navy-a' ),
	}
})