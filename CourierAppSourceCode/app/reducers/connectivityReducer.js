import * as types from '../actions/types';


const initialState = {
	ban: {},
	paused: false
}

export function connectivityReducer( state = initialState, action )
{

	switch ( action.type ) 
	{
		case types.USER_BANNED:
			return {
				...state,
				ban: {
					...action.payload
				}
			}
		case types.USER_PAUSED:
			return {
				...state,
				paused: action.payload
			}
		case types.USER_UNBANNED: 
			return {
				...state,
				ban: {}
			}
		case types.USER_UNPAUSED:
			return {
				...state,
				paused: false
			}
		default:
			return state;
	}

}