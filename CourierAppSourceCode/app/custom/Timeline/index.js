import React 	from 'react';
import {
	View,
	ActivityIndicator
}	from 'react-native';
import Styles 		from './styles';
import Icon 		from '../Icon';
import Text 		from '../Text';
import { GetColor } from '../Utils/color';

export default class Timeline extends React.Component
{

	render()
	{
		var currentDate = new Date(),
			uid = currentDate.getTime(); // To force timeline to be wholly updated
		return (
			<View style={ Styles.container } {...this.props}>
				<View style={ Styles.line } />
				<View style={ Styles.circles__wrapper } key={ uid }>
					{
						this.props.timeline && this.props.timeline.length && this.props.timeline.map( ( t, index ) =>
						{
							const isDone = t.status == 'handled';
							const isDest = ![ 'origin', 'return' ].includes( t.type );
							const isActive = ( t.status != 'handled' ) && ( ( index == 0 ) || ( index >	 0 && this.props.timeline[ index - 1 ].status == 'handled' ) );
							return (
								<View key={ t.id.toString() } style={ Styles.circle } >
									<View>
										<Icon name='marker-nulled' size={40} color={ GetColor('white') } style={[ Styles.marker__shadow, { opacity: isActive ? 1 : 0 } ]} />
										<View style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, alignItems: 'center', justifyContent: 'flex-end' }}>
											<Icon name='marker-filled' size={isActive ? 40 : 28} color={ GetColor( isDest ? 'green-a' : 'orange-a' ) } style={{ opacity: isDone || isActive ? 1 : 0.5 }} />
										</View>
									</View>
									<View style={ Styles.position__dot } />
									<View style={[ Styles.position__statusWrapper, { top: isActive ? 0 : 12 } ]}>
										{
											isDone
												?	<Icon name='check' size='small' color='white' />
												: 	(
														isActive ?
														(
															this.props.transportType
															?
															<Icon size={21} style={{ top: 3 }} name={ this.props.transportType === 'cargo' ? 'delivery-pickup' : ( this.props.transportType === 'motor_taxi' ? 'taxi-bike' : 'delivery-bike' ) } color={GetColor('white')} />
															:
															<ActivityIndicator size={13} color="white" />
														)
														: <Text color={GetColor('white')}>{ isDest && this.props.timeline.length > 2 && !( index == 1 && ( !this.props.timeline[ index + 1 ] || this.props.timeline[ index + 1 ].type == 'return' )) ? index : '' }</Text>
													)
										}
									</View>
								</View>
							)
						})
					}
				</View>
			</View>
		);
	}

}