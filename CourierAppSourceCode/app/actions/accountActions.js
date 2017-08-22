import Api 			from '../lib/Api';
import * as types 	from './types';
import { showAlert }from '../lib/Helpers';

export function getBanksList()
{
	return ( dispatch, getState ) =>
	{
		return Api.get( '/banks', {}, dispatch, 'AccountContainer' )
					.then( ( { result } ) =>
					{
						dispatch(
						{
							type: types.BANKS_LIST_FETCHED,
							payload: result
						})
					})
					.catch( e => showAlert( e ) )
	}
}

export function getUserAccount( user_id )
{
	return ( dispatch, getState ) =>
	{
		return Api.get( '/accounts', { user_id, page: -1 }, 'AccountContainer' )
					.then( ( { result } ) =>
					{
						dispatch(
						{
							type: types.USER_ACCOUNT_FETCHED,
							payload: Array.isArray( result ) ? result[ 0 ] : result
						})
					})
					.catch( e => showAlert( e ) )
	}
}

export function saveUserAccount( data )
{
	return ( dispatch, getState ) =>
	{
		return ( data.id
			? Api.put( '/accounts', data.id, data, dispatch, 'AccountContainer' ) 
			: Api.post( '/accounts', data, dispatch, 'AccountContainer' )
		).then( ( { result } ) =>
				{
					showAlert('اطلاعات حساب شبا شما با موفقیت ثبت شد.');
					dispatch(
					{
						type: types.USER_ACCOUNT_SAVED,
						payload: result
					})
				})
				.catch( e => 
					{
						showAlert( 'شماره شبا اشتباه است.' );
					})
	}
}

export function validateSheba(number)
{
	return (dispatch, getState) =>
	{
		return  new Promise((resolve, reject) =>
		{
			Api.post('/validate-sheba', { number }, dispatch, 'AccountContainer')
				.then(({result}) =>
				{
					resolve(result);
				})
				.catch(e => 
					{
						reject()
					});
		})
	}
}