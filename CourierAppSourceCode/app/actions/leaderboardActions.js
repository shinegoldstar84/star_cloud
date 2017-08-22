import Api 				from '../lib/Api';
import * as types 		from './types';
import { showAlert }	from '../lib/Helpers';

export function getLeaderboardAction()
{
	return ( dispatch, getState ) =>
	{
		let params = {};
		params[ 'columns' ] = 'id,firstname,lastname,phone,leader_board_orders,leader_board_referres,score,weekly_score,leader_board_rate';
		params[ 'type' ] = 'COURIER';
		params[ 'orderby' ] = 'weekly_score';
		params[ 'order' ] = 'desc';
		params[ 'perpage' ] = 10;

		return Api.get( '/leaderboard', params, dispatch, 'LeaderboardContainer' )
					.then( ( { result } ) =>
					{
						dispatch(
						{
							type: types.LEADERBOARD_FETCHED,
							payload: result.items
						})
					})
					.catch( e => showAlert( e ) );
	}
}

export function fetchUserLeaderboardAction()
{
	return ( dispatch, getState ) =>
	{
		return Api.get( '/show-profile', { columns: 'leader_board_rate,leader_board_orders,leader_board_referres,weekly_score' }, dispatch, 'LeaderboardContainer' )
				.then( ( { result } ) =>
				{
					dispatch(
					{
						type: types.USER_LEADERBOARD_FETCHED,
						payload: result
					})
				})
	}
}