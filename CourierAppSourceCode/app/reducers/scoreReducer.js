import * as types from '../actions/types';

export function scoreReducer( state = {}, action )
{
	switch (action.type)
	{
		case types.SCORE_DETAILS_FETCHED:
			return {
				...state,
				score_details: action.payload
			}
		default:
			return state;
	}
}