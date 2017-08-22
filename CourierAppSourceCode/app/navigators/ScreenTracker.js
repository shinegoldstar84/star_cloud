import { NavigationActions }	from 'react-navigation';
import { DeviceEventEmitter }	from 'react-native';
import * as types 				from '../actions/types';

function getCurrentRouteName(navigationState) 
{
	if ( ! navigationState )
	{
		return null;
	}
	const route = navigationState.routes[navigationState.index];
	if ( route.routes ) 
	{
		return getCurrentRouteName(route);
	}
	return route.routeName;
}

const ScreenTracker = ( { getState } ) => next => ( action )  => 
{
	if ( action.type !== NavigationActions.BACK && action.type !== NavigationActions.NAVIGATE )
	{
		return next( action );
	}

	const currentScreen = getCurrentRouteName( getState().nav );
	const result = next( action );
	const nextScreen = getCurrentRouteName( getState().nav );
	if ( [ 'Main', 'Dashboard' ].indexOf( nextScreen ) > -1  && ( action.type === NavigationActions.BACK || action.type === NavigationActions.NAVIGATE ) )
	{
		DeviceEventEmitter.emit( 'navigation:on:dashboard', {} );
	}
	return result;
}

export default ScreenTracker;