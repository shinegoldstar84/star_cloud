import React 			from 'react';
import {
	View,
	Text,
	Image
} 	from 'react-native';
import G from '../lib/G';

export default class Avatar extends React.Component
{

	render()
	{
		return (
			<View style={{ width: this.props.width ? this.props.width : 100, height: this.props.height ? this.props.height : 100 }}>
				{
					this.props.url &&
					<Image
						style={{ width: this.props.width ? this.props.width : 100,
								 height: this.props.height ? this.props.height : 100,
								 borderRadius: this.props.width ? Math.round( this.props.width / 2 ) : 50 }}
						source={{ uri: !this.props.hasPrefix ? G.serverUrl + this.props.url : this.props.url }} 
					/>
					
				}
			</View>
		);
	}

}