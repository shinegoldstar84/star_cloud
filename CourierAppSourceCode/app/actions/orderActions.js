import Api 				from '../lib/Api';
import { showAlert }	from '../lib/Helpers';
import * as types 		from './types';

export function checkCourierHasActiveOrder( cmp )
{
	return ( dispatch, getState ) =>
	{
		return new Promise( resolve =>
		{
			Api.post( '/orders/active/order', { method: 'get', columns: '*,customer,next_address_any_full,addresses_timeline', page: -1 }, cmp ? dispatch : null, cmp )
				.then( ( { result } ) =>
				{
					dispatch(
					{
						type: types.ACTIVE_ORDER_FETCHED,
						payload: Array.isArray( result ) ? result[ 0 ] : result
					})
					resolve();
				})
				.catch( e => showAlert( e ) );
		})
	}
}

export function skipOrderAction( orderId, broadcastId )
{
	return ( dispatch, getState ) => 
	{
		return Api.get( `/broadcasts/${broadcastId}/skip/${orderId}`, {}, dispatch, 'BroadcastingContainer' )
				.then( response =>
				{
					dispatch(
					{
						type: types.SENT_EX
					})				
				})
				.catch( e => showAlert( e ) );
	}
}

export function sentExOrderAction()
{
	return ( dispatch, getState ) =>
	{
		dispatch(
		{
			type: types.SENT_EX
		})
	}
}

export function acceptOrder( orderId, broadcastId, latLng )
{
	return ( dispatch, getState ) =>
	{
		return Api.get( `/broadcasts/${broadcastId}/accept/${orderId}`,
		{
			lat: latLng && latLng.lat ? latLng.lat : ( latLng.latitude ? latLng.latitude : null ),
			lng: latLng && latLng.lng ? latLng.lng : ( latLng.longitude ? latLng.longitude : null )
		})
		.then( ( { result } ) =>
		{
			dispatch(
			{
				type: types.ACCEPT_ORDER,
				payload: result
			})
		})
		.catch( e => showAlert( e ) );
	}
}


export function saveSignatureAction( image, base64, item_id, order_id )
{
	return ( dispatch, getState ) =>
	{
		let attachmentObject  = {
			item_type : 'address',
			type      : 'image',
			used_as   : 'signature',
			item_id,
			parents: [ 
				{
					item_type: 'order',
					item_id: order_id 
				}
			],
			image,
			base64
		};
		return Api.post( '/attachments', attachmentObject, dispatch, 'SignatureContainer' )
				.catch( e => showAlert( e ) );
	}
}

export function saveSignedByAction( orderId, id, lat, lng, signed_by )
{
	return ( dispatch, getState ) =>
	{
		return Api.get( `/orders/${orderId}/addresses/${ id }/sign`, {
			lat,
			lng,
			signed_by
		}, dispatch, 'SignatureContainer' )
		.then( ( { result } ) =>
		{
			dispatch(
			{
				type: types.ORDER_SIGNED_BY,
				payload: result.signed_by
			})
		})
		.catch( e => showAlert( e ) );
	}
}