import * as types from '../actions/types';

export function authReducer( state = {}, action )
{
	switch ( action.type )
	{
		case types.LOGGED_IN:
			return {
				...state,
				isLoggedIn: true,
				isVerified: true,
				user: {
					...action.payload.user
				},
				config: {
					...action.payload.config
				}
			}
		case types.NOT_LOGGED_IN:
			return {
				...state,
				isLoggedIn: false,
				isVerified: false
			}
		case types.LOGIN_SUCCESS: 
			return {
				...state,
				isLoggedIn: true,
				isVerified: false,
				token: action.payload.token
			}
		case types.VERIFY_SUCCESS:
			return {
				...state,
				user: {
					...action.payload.user
				},
				config: {
					...action.payload.config
				},
				isLoggedIn: true,
				isVerified: true,
			}
		case types.UPDATE_CREDIT:
			return {
				...state,
				user: {
					...state.user,
					...action.payload,
				}
			}
		case types.USER_LOGGED_OUT:
			return {
				...state,
				user: {},
				isLoggedIn: false,
				isVerified: false
			}
		case types.USER_OBJECT_RECEIVED:
			return {
				...state,
				user: {
					...state.user,
					...action.payload
				}
			}
		case types.USER_REFERRAL_SUBMITTED:
			return {
				...state,
				user: {
					...state.user,
					...action.payload
				}
			}
		default:
			return state;
	}
}