import * as types 				from '../actions/types';

export function newOrderReducer( state = {}, action )
{
	switch ( action.type )
	{
		case types.ORDER_OBJECT:
			return {
				...state,
				newOrder: action.payload
			}
		case types.SENT_EX:
			return {
				...state,
				newOrder: null
			}
		case types.ACCEPT_ORDER:
			return {
				...state,
				order: action.payload,
				newOrder: null
			}
		case types.ORDER_OBJECT_RECEIVED:
			return {
				...state,
				order: {
					...action.payload
				}
			}
		case types.ACTIVE_ORDER_FETCHED:
			return {
				...state,
				order: {
					...action.payload
				}
			}
		case types.ORDER_CANCELLED:
			return {
				...state,
				order: {}
			}
		case types.ORDER_SIGNED_BY:
			return {
				...state,
				order: {
					...state.order,
					next_address_any_full: {
						...state.order.next_address_any_full,
						signed_by: action.payload
					}
				}
			}
		case types.ORDER_FINISHED:
			return {
				...state,
				order: {
					order: {},
				}
			}
		default:
			return state;
	}
}
