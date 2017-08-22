import Api 				from '../lib/Api';
import * as types 		from './types';
import { showAlert }	from '../lib/Helpers';

export function getScoreAction()
{
	return ( dispatch, getState ) =>
	{
		let params = {};
		params[ 'columns' ] = 'score_details, score_weekly_details';
		params[ 'type' ] = 'COURIER';

		return Api.get( '/show-profile', params, dispatch )
					.then( ( { result } ) =>
					{
						dispatch(
						{
							type: types.SCORE_DETAILS_FETCHED,
							payload: result.items
						})
					})
					.catch( e => showAlert( e ) );
	}
}
