import * as types from '../actions/types';

export function heatmapReducer( state=[], action )
{
	switch (action.type)
	{
		case types.HEATMAP_DATA_FETCHED:
			return {
				...state,
				heatmapData: action.payload
			}
		default:
			return state;
	}
}