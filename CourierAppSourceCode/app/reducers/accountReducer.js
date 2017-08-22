import * as types from '../actions/types';

const initialState = {
	banksList: [],
	userAccount: {}
}

export function accountReducer( state= initialState , action )
{
	switch ( action.type ) 
	{
		case types.BANKS_LIST_FETCHED:
			return {
				...state,
				banksList: state.banksList.concat( action.payload )
			}
		case types.USER_ACCOUNT_FETCHED:
			return {
				...state,
				userAccount: action.payload
			}
		default:
			return state;
	}
}