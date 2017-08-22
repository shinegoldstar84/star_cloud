import * as types from '../actions/types';

const initialState = {
	isOnline: false,
	lastPosition: null,
	networkConnected: true,
	locationEnabled: true,
	currentAddress: ''
}

export function locationReducer( state = initialState, action )
{
	switch ( action.type )
	{
		case types.CHANGE_STATUS:
			return {
				...state,
				isOnline: action.payload
			}
		case types.LAST_POSITION:
			return {
				...state,
				lastPosition: action.payload,
				// isOnline: true
			}
		case types.NETWORK_DISCONNECTED:
			return {
				...state,
				networkConnected : false
			}
		case types.NETWORK_CONNECTED:
			return {
				...state,
				networkConnected: true
			}
		case types.LOCATION_PROVIDER_CHANGE:
			return {
				...state,
				locationEnabled: action.payload
			}
		case types.CURRENT_ADDRESS_FETCHED:
			return {
				...state,
				currentAddress: ( action.payload && action.payload.address && action.payload.address.length ) ? ( action.payload.region ? action.payload.district + '، ' + action.payload.address[0] + '، ' + action.payload.region : action.payload.address[0] ) : ''
			}
		default:
			return state;
	}
}