import * as types from './types';
import Api from '../lib/Api';
import { showAlert }	from '../lib/Helpers';

export function getUserCreditAction()
{
	return ( dispatch, getState ) =>
	{
		return Api.get( null, {}, dispatch )
				.then( ( { result } ) =>
				{
					dispatch(
					{
						type: types.UPDATE_CREDIT,
						payload: result
					})
				})
				.catch( e => showAlert( e ) );
	}
}