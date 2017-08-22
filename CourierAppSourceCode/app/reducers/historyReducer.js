import * as types from '../actions/types';

const initialState = {
	items: []
}

export function historyReducer( state = initialState, action )
{
	switch ( action.type ) 
	{
		case types.HISTORY_FETCHED:
			return {
				...state,
				items: state.items.concat( action.payload.items ),
				page: action.payload.page,
				totalPages: action.payload.pages
			}
		case types.SINGLE_HISTORY_FETCHED:
			return {
				...state,
				singleHistory: action.payload
			}
		case types.CLEAN_ALL:
			return initialState;
		default:
			return state;
	}
}