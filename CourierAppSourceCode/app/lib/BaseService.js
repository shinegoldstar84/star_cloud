import * as types	from '../actions/types';

export default class BaseService
{

	constructor()
	{
		this.actionTypes = types;
	}


	/**
	 * setter for dispatcher function
	 * @param function dispatcher
	 * @returns this
	 */
	setDispatcher( dispatcher )
	{
		this.dispatcher = dispatcher;
		return this;
	}

	/**
	 * dispatch an action
	 * @param String type
	 * @param mixed payload
	 */
	dispatch( type, payload )
	{
		if ( this.dispatcher && typeof this.dispatcher === 'function' )
		{
			this.dispatcher(
			{
				type,
				payload
			})
		}
	}

}