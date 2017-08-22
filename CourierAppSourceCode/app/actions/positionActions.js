import Api 			from '../lib/Api';
import * as types 	from './types';
import { showAlert }from '../lib/Helpers';

export function getOnlineSummaryAction()
{
	return ( dispatch, getState ) =>
	{
		return Api.post( '/positions/summary', { type: [ 'day', 'month', 'week' ] }, dispatch )
					.then( ( { result } ) =>
					{
						dispatch(
						{
							type: types.POSITION_SUMMARY_FETCHED,
							payload: result
						})
					})
					.catch( e => showAlert( e ) );
	}
}