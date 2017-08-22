import * as types from '../actions/types';

export function leaderboardReducer( state = {}, action )
{
	switch (action.type)
	{
		case types.LEADERBOARD_FETCHED:
			return {
				...state,
				items: action.payload
			}
		case types.USER_LEADERBOARD_FETCHED:
			return {
				...state,
				userData: action.payload
			}
		default:
			return state;
	}
}