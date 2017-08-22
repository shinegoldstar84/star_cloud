import  { AppNavigator }			from '../navigators/routes';

const initialState = AppNavigator.router.getActionForPathAndParams( 'SplashScreenContainer' );

export default function nav( state = initialState, action )
{
	let newState = AppNavigator.router.getStateForAction( action, state );
	return newState || state;
}