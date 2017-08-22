import Api 						from './Api';
import BaseService 				from './BaseService';
import { 
	showAlert,
	showAlertCustomCb
}	from './Helpers';
import G 						from './G';
import { navigationService }	from './NavigationService';
import { mediaPlayer }			from './MediaPlayer';
import { bgLocation }			from './BGLocation';
import { broadcastService }		from './BroadcastService';
import BringToFront				from './BringToFront';
import Unlocker					from './Unlocker';
import Notify 					from './Notify';

class OrderService extends BaseService
{
	intervalId = [];

	/**
	 * set the order object
	 * @param Object order
	 * @returns this
	 */
	setOrder( order )
	{
		this.order = order;
		let nextAddress = this.order.next_address_any_full 
						? this.order.next_address_any_full
						: ( 
							this.order.next_address 
							? this.order.next_address 
							: null
						);

		return this;
	}


	/**
	* Setter for current component
	* @param String currentComponent
	* @returns this
	**/
	setCurrentComponent( currentComponent )
	{
		this.currentComponent = currentComponent;
		return this;
	}

	/**
	 * Send Accept Order Request to Api
	 */
	acceptOrder( broadcastId, orderId, latLng )
	{
		return new Promise( ( resolve, reject ) =>
		{
			Api.get( 
					`/broadcasts/${broadcastId}/accept/${orderId}`,
					{
						lat: latLng && latLng.lat ? latLng.lat : ( latLng.latitude ? latLng.latitude : null ),
						lng: latLng && latLng.lng ? latLng.lng : ( latLng.longitude ? latLng.longitude : null ) 
					},
					this.dispatcher,
					'BroadcastingContainer'
				)
				.then( ( { result } ) =>
				{
					this.dispatch( this.actionTypes.ACCEPT_ORDER, result );
					bgLocation.setConfig( true );
					this.order = result;
					resolve( result );
				})
				.catch( e => 
					{
						showAlert( e )
						reject();
					});
		})
	}


	cancelOrder( order, { coords } )
	{
		if ( order && order.id )
		{
			showAlertCustomCb( 'آیا از انصراف درخواست اطمینان دارید‌ ? ', () =>
			{
				Api.get( `/orders/${order.id}/reject`, 
				{
					lat: coords && coords.lat ? coords.lat : ( coords.latitude ? coords.latitude : null ),
					lng: coords && coords.lng ? coords.lng : ( coords.longitude ? coords.longitude : null ) 
				}, this.dispatcher, 'HandleAddressContainer' )
					.then( ( { result } ) =>
					{
						this.stop();
						this.dispatch( this.actionTypes.ORDER_CANCELLED );
						bgLocation.setConfig( false );
						broadcastService.setOrder( null );
						navigationService.reset( 0, 'Main' );
					})
					.catch( e => showAlert( e ) );
			})
		}
	}

	/**
	 * start checking order status
	 */
	start()
	{
		this.intervalId.push( setInterval( this.fetchOrder.bind( this ), G.checkOrderTimeout ) );
		this.fetchOrder();
	}

	startBackground()
	{
		return new Promise( resolve =>
		{
			this.start();
		})
	}

	/**
	 * stop checking order 
	 */
	stop()
	{
		for ( let i in this.intervalId )
		{
			clearInterval( this.intervalId[ i ] );
		}
	}

	/**
	 * fetch the order object from api
	 */
	fetchOrder( cmp = null )
	{
		if ( this.order )
		{
			Api.get(
				`/orders/${ this.order.id }`,
				{ columns: '*,customer,next_address_any_full,next_address,addresses_timeline' },
				cmp ? this.dispatcher : null,
				cmp
			)
				.then( ( { result } ) =>
				{
					if ( result )
					{
						this.order = result;
						if ( !this.currentAddress )
						{
							this.currentAddress = this.order.next_address_any_full;
						}
						this.dispatch( this.actionTypes.ORDER_OBJECT_RECEIVED, result );
						this.handleOrderStatus();
					}
				})
				.catch( e => 
				{
					showAlert( e )
				});
		}
	}

	/**
	 * called when order status is cancelled
	 */
	orderCancelled()
	{
		BringToFront.bringToFront();
		Unlocker.unlockScreen();
		Notify.showNotification(
		{
			id: 5,
			title: 'لغو درخواست',
			content: 'متاسفانه درخواست لغو گردید',
		})
		mediaPlayer.playAlert();
		showAlert( 'متاسفانه درخواست لغو گردید.' );
		this.order = null;
		this.stop();
		this.dispatch(
		{
			type: this.actionTypes.ORDER_CANCELLED,
		})
		bgLocation.setConfig( false );
		broadcastService.setOrder( null );
		navigationService.reset( 0, 'Main' );
	}

	/**
	 * send the arrived status to api
	 * @param Object current location of courier
	 */
	arrived( { coords } )
	{
		if ( coords )
		{
			Api.get( `/orders/${this.order.id}/addresses/${this.order.next_address_any_full.id}/arrive`, 
			{
				lat: coords.lat ? coords.lat : ( coords.latitude ? coords.latitude : null ),
				lng: coords.lng ? coords.lng : ( coords.longitude ? coords.longitude : null ),
			}, this.dispatcher, 'HandleAddressContainer' )
			.then( ( { result } ) =>
			{
				// this.currentAddress = result;
				this.fetchOrder( 'HandleAddressContainer' )
				this.handleNextAddressStatus( result );
			})
			.catch( e => 
				{
					console.log( e );
					showAlert( e )
				});
		}
		else
		{
			showAlert( 'عدم دسترسی به موقعیت مکانی. لطفا مکان یاب دستگاه خود را روشن کنید' );
		}
	}

	/**
	 * send the handled status to Api
	 * @param Object current location of courier
	 */
	handled( { coords }, cmp = 'HandleAddressContainer' )
	{
		if ( coords )
		{
			Api.get( `/orders/${ this.order.id }/addresses/${ this.order.next_address_any_full.id }/handle`,
			{
				lat: coords.lat ? coords.lat : ( coords.latitude ? coords.latitude : null ),
				lng: coords.lng ? coords.lng : ( coords.longitude ? coords.longitude : null )
			}, this.dispatcher, cmp )
			.then( ( { result } ) =>
			{
				// this.currentAddress = result;
				if ( !result.next_address )
				{
					this.stop();
					bgLocation.setConfig( false );
					broadcastService.setOrder( null );
					this.currentAddress = null;
					this.order = null;
					this.dispatch( this.actionTypes.ORDER_FINISHED, {} );
					navigationService.reset( 0, 'Main' );
				}
				else
				{
					this.fetchOrder( cmp )
					// this.fetchOrder();
					// this.handleNextAddressStatus( result );
				}
			})
			.catch( e => 
				{
					console.log( 'E H : ', e );
					showAlert( e )
				});
		}
		else
		{
			showAlert( 'عدم دسترسی به موقعیت مکانی. لطفا مکان یاب دستگاه خود را روشن کنید' );
		}
	}

	/**
	 * Handle the status of order and decide what action should do after
	 * order status change
	 */
	handleOrderStatus()
	{
		if ( this.order && this.order.status )
		{
			if ( this.order.next_address_any_full || this.order.next_address )
			{
				this.handleNextAddressStatus( 
					this.order.next_address_any_full 
					? this.order.next_address_any_full 
					: this.order.next_address 
				);
			}
			switch ( this.order.status ) 
			{
				case 'cancelled':
					bgLocation.setConfig( false );
					broadcastService.setOrder( null );
					this.orderCancelled();
					break;
				case 'delivered':
					bgLocation.setConfig( false );
					broadcastService.setOrder( null );
					this.stop();
					navigationService.reset( 0, 'Main' );
					break;

			}
		}
	}

	/**
	 * check next address status 
	 * and do actions according to the next address status
	 * @param Object nextAddress
	 */
	handleNextAddressStatus( nextAddress )
	{
		if ( nextAddress && nextAddress.status )
		{
			if ( this.currentAddress && this.currentAddress.status !== nextAddress.status )
			{
				this.currentAddress = nextAddress;
				switch ( nextAddress.status )
				{
					case 'arrived':
						if (
							[ 'origin' ].indexOf( this.currentAddress.type ) == -1 &&
							this.currentAddress.status === 'arrived' &&
							!this.currentAddress.signed_by &&
							this.order.transport_type != 'motor_taxi'
						)
						{
							// navigationService.reset( 0, 'Signature', { order_id: this.order.id, addr_id: this.currentAddress.id, phone: this.order.customer ? this.order.customer.phone : '', order: this.order } );
							if (!this.currentComponent || this.currentComponent != 'HandleAddress')
							{
								navigationService.reset( 0, 'HandleAddress' );
							}
						}
						// const page = [ 'origin', 'return' ].indexOf( this.currentAddress.type ) > -1 ? 'HandleAddress' : 'Signature';
						// navigationService.reset( 0, page, { order_id: this.order.id, addr_id: this.currentAddress.id } );
						break;
					case 'pending':
						if (!this.currentComponent || this.currentComponent != 'HandleAddress')
						{
							navigationService.reset( 0, 'HandleAddress' );
						}
						break;
				}
			}
		}
	}

	/**
	 * check if status of order is in the given statuses or not
	 * @param  {...[type]} statuses [description]
	 * @return {[type]}             [description]
	 */
	orderStatusIs = ( ...statuses ) =>
	{
		if ( this.currentAddress )
		{
			return statuses.indexOf( this.currentAddress.type ) > -1;
		}
		return false;
	}

	/**
	 * check if status of address is in the given statuses or not
	 * @param  {...[type]} statuses [description]
	 * @return {[type]}             [description]
	 */
	addressStatusIs = ( ...statuses ) =>
	{
		if ( this.order && this.order.next_address_any_full )
		{
			return statuses.indexOf( this.order.next_address_any_full.status ) > -1;
		}
		return false;
	}

}

export const orderService = new OrderService();