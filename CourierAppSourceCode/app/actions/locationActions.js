import { bgLocation }	from '../lib/BGLocation';
import Api				from '../lib/Api';
import * as types 		from './types';

export function startBgLocate()
{
	return ( dispatch, getState ) =>
	{

	}
}

export function changeStatusAction()
{
	return ( dispatch, getState ) =>
	{
		bgLocation
		.setStatus()
		.then( ( status, data ) =>
		{
			dispatch(
			{
				type: types.CHANGE_STATUS,
				payload: status
			})
			if ( !status )
			{
				sendOfflinePosition( getState().location.lastPosition, dispatch );
			}
		})
	}
}

export function sendOfflinePosition( data, dispatch, offlineStatus = true, cmpName = 'DashboardContainer' )
{
	return new Promise( ( resolve, reject ) =>
	{
		let requestData =
		{
			location:
			{
				coords:
				{
					latitude: data && data.coords.latitude ? data.coords.latitude : 0,
					longitude: data && data.coords.longitude ? data.coords.longitude : 0,
				}
			},
			offline : offlineStatus,
		};
		Api.post( '/positions', requestData, dispatch, cmpName )
			.then( ( data ) => resolve( data ) )
			.catch( errors => reject( errors ) );
	})
}


export function getCourierCurrentAddress( lat, lng )
{
	return ( dispatch, getState ) =>
	{
		let locationData = {
			latlng : lat + ',' + lng
		};
		Api.get( '/locations', locationData, dispatch, 'LocationLoading' )
			.then( ({ result }) =>
			{
				dispatch(
				{
					type: types.CURRENT_ADDRESS_FETCHED,
					payload: result,
				})
			})
	}
}