import * as types from '../actions/types';

const initialState = {
	items: []
}

export function transactionsReducer( state = initialState, action )
{
	switch ( action.type )
	{
		case types.TRANSACTION_FETCHED:
			return {
				...state,
				items: state.items.concat( action.payload.items ),
				page: action.payload.page,
				totalPages: action.payload.pages,
			}
		case types.SUMMARY_FETCHED:
			return {
				...state,
				summary: action.payload
			}
		case types.CLEAN_ALL:
			return initialState;
		default:
			return state;
	}
}