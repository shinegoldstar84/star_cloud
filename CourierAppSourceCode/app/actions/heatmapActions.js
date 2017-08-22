import * as types 		from './types';
import Api 				from '../lib/Api';
import { showAlert }	from '../lib/Helpers';

export function fetchPolygons( filter = '' )
{
	return ( dispatch, getState ) =>
	{
		let data = {
			page: -1
		};
		if ( filter )
		{
			data.filter_hour = filter;
		}
		return Api.get( '/polygons', data, dispatch, 'HeatmapContainer' )
				.then( ( { result } ) =>
				{
					console.log( 'FILTER DATA : ', result );
					dispatch(
					{
						type: types.HEATMAP_DATA_FETCHED,
						payload: result
					})
				})
				.catch( e => showAlert( e ) );
	}
}