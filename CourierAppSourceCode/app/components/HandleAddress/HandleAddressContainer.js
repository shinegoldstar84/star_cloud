import React 						from 'react';
import { connect } 					from 'react-redux';
import { bindActionCreators }		from 'redux';
import { ActionCreators }			from '../../actions';
import { orderService }				from '../../lib/OrderService';
import HandleAddress 				from './HandleAddress';
import {
	showAlert,
	callToNumber,
	showAlertCustomCb
}	from '../../lib/Helpers';
import {
	Linking,
	BackHandler,
	AppState,
	AppRegistry
}									from 'react-native';
import G 							from '../../lib/G';
import BackgroundMode 				from '../../lib/BackgroundMode';
import { navigationService }		from '../../lib/NavigationService';
import BringToFront 				from '../../lib/BringToFront';
import Unlocker 					from '../../lib/Unlocker';

class HandleAddressContainer extends React.Component
{

	constructor( props )
	{
		super(props);
		this.state = { canCancel: false, appState: AppState.currentState }
	}

	componentWillMount() 
	{
		orderService
			.setOrder( this.props.order )
			.setCurrentComponent('HandleAddress')
			.start();
		BackHandler.addEventListener('hardwareBackPress', () =>
		{
			BackHandler.exitApp();
			return true;
		})
		this.setAppForegroundEvent();
	}

	setAppForegroundEvent()
	{
		AppState.addEventListener( 'change', this.handleAppState );
	}

	handleAppState = ( nextState ) =>
	{
		if ( this.state.appState.match( /inactive|background/ ) && nextState === 'active' )
		{
			BackgroundMode.disableBackgroundMode();
			// orderService.stop();
			orderService
				.setCurrentComponent('HandleAddress')
				.start();
		}
		else
		{
			BackgroundMode.enableBackgroundMode();
		}
		this.setState(
		{
			appState: nextState
		})
	}

	componentWillUnmount() 
	{
		orderService.stop();
		clearTimeout( this.timeout );
		BackHandler.removeEventListener('hardwareBackPress', () => {} );
		AppState.removeEventListener( 'change', this.handleAppState )
	}

	componentDidUpdate( prevProps, prevState )
	{
		if ( this.props.order && this.props.order.status === 'picking' && !this.timeoutAdded )
		{
			this.timeoutAdded = true;
			this.timeout = setTimeout( () =>
			{
				this.setState(
				{
					canCancel: true
				});
			}, G.pickupTimeout * 60 * 1000 );
		}
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

	setNextStatus = () =>
	{
		showAlertCustomCb('آیا از انجام عملیات اطمینان دارید ؟', () =>
		{
			BringToFront.bringToFront();
			Unlocker.unlockScreen();
			this.props.order.next_address_any_full.status === 'pending'
				?	orderService.arrived( this.props.lastPosition )
				: 	(
					this.props.order.next_address_any_full.type != 'origin' && this.props.order.transport_type != 'motor_taxi'
						?	navigationService.reset( 
								0,
								'Signature', 
								{
									order_id: this.props.order.id,
									addr_id: this.props.order.next_address_any_full.id,
									phone: this.props.order.customer ? this.props.order.customer.phone : '',
									order: this.props.order,
									backNav: () => navigationService.reset(0, 'HandleAddress')
								}
							)
						: 	orderService.handled( this.props.lastPosition )
				)
		})
	}

	submitButtonText = () =>
	{
		const { next_address_any_full }  = this.props.order;
		const { next_address }	= this.props.order;
		if ( next_address_any_full )
		{
			if ( next_address_any_full.status === 'pending' )
			{
				return next_address_any_full.type === 'origin'
						? 'به مبدا رسیدم'
						: (
							next_address_any_full.type === 'return'
								?	'به مبدا برگشتم'
								: 	'به مقصد' + ( this.props.order && this.props.order.addresses_timeline && ( this.props.order.addresses_timeline.length < 3 || ( this.props.order.addresses_timeline.length == 3 && this.props.order.has_return ) ) ? '' : ' ' + next_address_any_full.priority ) + ' رسیدم'
						)
			}
			else if ( next_address_any_full.status === 'arrived' && next_address_any_full.type != 'origin' )
			{
				if (this.props.order.transport_type != 'motor_taxi')
				{
					return 'گرفتن امضا';
				}
				else
				{
					if (!this.props.order.next_address)
					{
						return 'اتمام سفر'
					}
					else
					{
						return 'مسافر پیاده شد';
					}
				}
			}
			else
			{
				return next_address_any_full.type === 'origin'
						? `${ this.props.order.transport_type != 'motor_taxi' ? 'برداشت مرسوله' : 'مسافر سوار شد' } `
						: (
							next_address_any_full.type === 'return'
								?	'اتمام سفر'
								: 	( !next_address ? 'اتمام سفر' :  next_address.type === 'return' && next_address.status === 'pending' ? 'بازگشت به مبدا' : 'مقصد بعدی'  )
						)	
			}
		}
		return '';
	}

	render()
	{
		return <HandleAddress
					customer={ this.props.order && this.props.order.customer ?  this.props.order.customer : null }
					info={ this.props.order.next_address_any_full }
					isLastAddress={ !!!this.props.order.next_address }
					orderStatusIs={ orderService.orderStatusIs }
					has_return={ this.props.order ? this.props.order.has_return : false }
					price={ this.props.order ? this.props.order.price : 0 }
					nprice={ this.props.order ? this.props.order.nprice : 0 }
					subsidy={ this.props.order ? this.props.order.subsidy : 0 }
					payAtDest={ this.props.order ? this.props.order.pay_at_dest : false }
					cashPayment={ this.props.order ? !this.props.order.credit : false }
					isLoading={ this.props.isLoading }
					onHandleClicked={ this.setNextStatus }
					showOnMap={ this.showMap }
					callToCustomer={ this.callToCustomer }
					delay={ this.props.order.delay }
					buttonTitle={ this.submitButtonText() }
					cancelOrder={ () => orderService.cancelOrder( this.props.order, this.props.lastPosition ) }
					canCancel={ this.state.canCancel }
					totalAddresses={ this.props.order && this.props.order.addresses_timeline ? this.props.order.addresses_timeline.length : [] }
					doneAddresses={ this.props.order && this.props.order.addresses_timeline  ? this.props.order.addresses_timeline.filter( t => t.status === 'handled' ).length : 0 }
					timeline={ this.props.order && this.props.order.addresses_timeline ? this.props.order.addresses_timeline : null }
					transportType={ this.props.order && this.props.order.transport_type ? this.props.order.transport_type : '' }
				/>
	}


}

const mapStateToProps = ( state ) =>
{
	return {
		order: state.order && state.order.order ? state.order.order : {},
		isLoading: state.loading.HandleAddressContainer,
		lastPosition: state.location && state.location.lastPosition ? state.location.lastPosition : {},
	}
}

export default connect( mapStateToProps )( HandleAddressContainer );