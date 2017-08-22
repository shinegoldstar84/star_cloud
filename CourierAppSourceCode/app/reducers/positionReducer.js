import * as types from '../actions/types';

export function positionReducer( state = {}, action )
{
	switch ( action.type ) 
	{
		case types.POSITION_SUMMARY_FETCHED:
			return {
				...state,
				summary: action.payload
			}
		default:
			return state;
	}
}