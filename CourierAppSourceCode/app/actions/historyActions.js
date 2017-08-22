import Api 				from '../lib/Api';
import * as types 		from './types';
import { showAlert }	from '../lib/Helpers';

export function getAllHistoryAction( page )
{
	return ( dispatch, getState ) =>
	{
		return Api.get( '/orders', { page, with:'customer,addresses' }, dispatch, 'HistoryContainer' )
					.then( ( { result } ) =>
					{
						dispatch(
						{
							type: types.HISTORY_FETCHED,
							payload: result
						})
					})
					.catch( e => showAlert( e ) );
	}
}

export function getSingleHistoryAction( id )
{
	return ( dispatch, getState ) =>
	{
		return Api.get( `/orders/${id}`, { columns: '*,customer,addresses,screenshot' }, dispatch, 'SingleHistoryContainer' )
					.then( ( { result } ) =>
					{
						dispatch(
						{
							type: types.SINGLE_HISTORY_FETCHED,
							payload: result
						})
					})
					.catch( e => showAlert( e ) );
	}
}