import React 					from 'react';
import ArriveAddress 			from './ArriveAddress';
import { connect }				from 'react-redux';
import { bindActionCreators }	from 'redux';
import { ActionCreators }		from '../../actions';
import { orderService }			from '../../lib/OrderService';
import { Linking }				from 'react-native';
import { 
	showAlert,
	callToNumber
}		from '../../lib/Helpers';

class ArriveAddressContainer extends React.Component
{

	componentWillMount() 
	{
		orderService
			.setOrder( this.props.order )
			.start();	
	}

	componentWillUnmount() 
	{
		orderService.stop();	
	}


	arrived = () =>
	{
		orderService.arrived( this.props.lastPosition );
	}

	showMap = () =>
	{
		if ( this.props.order && this.props.order.next_address_any_full )
		{
			const { lat,lng } = this.props.order.next_address_any_full;
			Linking.openURL( `google.navigation:q=${lat},${lng}` );
		}
		else
		{
			showAlert( 'عدم دسترسی به موقعیت مکانی سفر.' );
		}
	}


	callToCustomer = ( phone ) =>
	{
		callToNumber( phone );
	}

	render()
	{
		return <ArriveAddress
					customer={ this.props.order && this.props.order.customer ?  this.props.order.customer : null }
					info={ this.props.order.next_address_any_full }
					orderStatusIs={ orderService.orderStatusIs }
					has_return={ this.props.order ? this.props.order.has_return : false }
					price={ this.props.order ? this.props.order.price : 0 }
					payAtDest={ this.props.order ? this.props.order.pay_at_dest : false }
					cashPayment={ this.props.order ? !this.props.order.credit : false }
					isLoading={ this.props.isLoading }
					onArriveClicked={ this.arrived }
					showOnMap={ this.showMap }
					callToCustomer={ this.callToCustomer }
					delay={ this.props.order.delay }
				/>
	}

}

const mapStateToProps = ( state ) =>
{
	return {
		order: state.order && state.order.order ? state.order.order : {},
		lastPosition: state.location && state.location.lastPosition ? state.location.lastPosition : {},
		isLoading: state.loading.ArriveAddressContainer
	}
}

export default connect( mapStateToProps )( ArriveAddressContainer );