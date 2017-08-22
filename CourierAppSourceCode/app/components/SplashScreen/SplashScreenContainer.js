import React 					from 'react';
import { connect }				from 'react-redux';
import SplashScreen 			from './SplashScreen';
import { navigationService }	from '../../lib/NavigationService';
import AppPushNotification 		from '../../lib/PushNotification';
import { bgLocation }			from '../../lib/BGLocation';
import G 						from '../../lib/G';

class SplashScreenContainer extends React.Component
{

	componentWillMount()
	{
		navigationService.setNavDispatcher( this.props.navigation.dispatch );
		bgLocation.forceStop();
		this.checkUserToken();			
	}

	checkUserToken()
	{
		this.props.checkUserTokenAction()
			.then( () =>	
			{
				if ( this.props.isLoggedIn )
				{
					this.props.checkCourierHasActiveOrder()
						.then( () =>
						{
							if ( this.props.activeOrder && this.props.activeOrder.next_address_any_full )
							{
								let page = ''
								bgLocation.start()
									.then( () =>
									{	
										const currentAddress = this.props.activeOrder.next_address_any_full;
										const params = {
											addr_id: this.props.activeOrder.next_address_any_full.id,
											order_id: this.props.activeOrder.id,
											order: this.props.activeOrder,
											phone: this.props.activeOrder.customer ? this.props.activeOrder.customer.phone : ''
										};
										bgLocation.setConfig( true );
										navigationService.reset( 0, 'HandleAddress', params );
									})
							}
							else
							{
								navigationService.reset( 0, 'Main' );
							}
						})
				}
				else
				{
					navigationService.reset( 0, 'Walkthrough' );
				}
			})
	}

	render()
	{
		return <SplashScreen />
	}
}

const mapStateToParams = ( state ) =>
{
	return {
		isLoggedIn: state.auth.isLoggedIn,
		activeOrder: state.order && state.order.order ? state.order.order : {}
	}
}

export default connect( mapStateToParams )( SplashScreenContainer );