import { LOADING }	from '../actions/types';

export default function loadingReducer( state = {}, action )
{
	if ( action.type === LOADING && typeof action.payload === 'object' )
	{
		return {
			...state,
			[ action.payload.cmpName ]: action.payload.state
		};
	}
	return state;
}