import BaseService				from './BaseService';
import { NavigationActions }	from 'react-navigation';

class NavigationService
{

	/**
	 * setter for nav dispatcher
	 * @param function dispatcher
	 * @returns this
	 */
	setNavDispatcher( dispatcher )
	{
		this.dispatcher = dispatcher;
		return this;
	}

	/**
	 * navigate to the given route with params
	 * @param String routeName
	 * @param Object params = {}
	 */
	navigate( routeName, params = {} )
	{
		const navigation = NavigationActions.navigate(
		{
			routeName,
			params
		});
		if ( this.dispatcher && typeof this.dispatcher === 'function' )
		{
			this.dispatcher( navigation );
		}
	}


	/**
	 * navigates to the previous page
	 */
	back()
	{
		const backAction = NavigationService.back();
		this.dispatcher( backAction );
	}

	/**
	 * reset the nav stack and navigates to the given route after reset
	 * @param Integer index 		the index of route
	 * @param String routeName 		name of page
	 * @param Object params = {}	parameters should pass to page
	 */
	reset( index, routeName, params= {} )
	{
		const resetAction = NavigationActions.reset(
		{
			index,
			actions: [
				NavigationActions.navigate( 
					{
						routeName,
						params
					})
			]
		})
		this.dispatcher( resetAction );
	}

}



export const navigationService = new NavigationService();