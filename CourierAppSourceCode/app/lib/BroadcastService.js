import BaseService				from './BaseService';
import { navigationService }	from './NavigationService';
import Api 						from './Api';
import Unlocker					from './Unlocker';
import BringToFront				from './BringToFront';

class BroadcastService extends BaseService
{

	setOrder( order )
	{
		this.order = order;
		return this;
	}

	/**
	 * wathces for order
	 */
	watchForOrder( order )
	{
		if ( order )
		{
			this.onNewOrderReceived( order );
		}
	}

	/**
	 * call when the new order has been received
	 * @param Object order
	 */
	onNewOrderReceived( order )
	{
		if ( !this.order || ( this.order.id != order.id ) )
		{
			this.order = order;
			Unlocker.unlockScreen();
			BringToFront.bringToFront();
			Api.get( `/broadcasts/${order.broadcast_id}/received/${order.id}` );
			this.dispatch( this.actionTypes.ORDER_OBJECT, order );
			navigationService.navigate( 'Broadcasting' );
		}
	}

}

export const broadcastService = new BroadcastService();