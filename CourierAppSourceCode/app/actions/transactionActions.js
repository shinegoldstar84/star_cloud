import Api 				from '../lib/Api';
import * as types 		from './types';
import { showAlert }	from '../lib/Helpers';

export function getAllTransactionsAction( page )
{
	return ( dispatch, getState ) =>
	{
		return Api.get( '/transactions', { page }, dispatch, 'TransactionContainer' )
				.then( response =>
				{
					dispatch(
					{
						type: types.TRANSACTION_FETCHED,
						payload: response.result
					})
				})
				.catch( e => showAlert );
	}
}

export function getTransactionSummary()
{
	return ( dispatch, getState ) =>
	{
		return Api.post( '/transactions/summary', { type: [ 'day', 'month', 'week' ] }, dispatch, 'CreditContainer' )
					.then( ( { result } ) =>
					{
						dispatch(
						{
							type: types.SUMMARY_FETCHED,
							payload: result
						})
					})
					.catch( e => showAlert( e ) )
	}
}

export function emptyAll()
{
	return (dispatch, getState) =>
	{
		dispatch(
		{
			type: types.CLEAN_ALL
		})
	}
}