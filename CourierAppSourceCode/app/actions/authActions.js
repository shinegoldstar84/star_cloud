import Api 						from '../lib/Api';
import * as types 				from './types';
import DeviceInfo 				from 'react-native-device-info';
import { 
	showAlert,
	showAlertWithOutButton
}	from '../lib/Helpers';
import { broadcastService }		from '../lib/BroadcastService';
import { bgLocation }			from '../lib/BGLocation';
import { orderService }			from '../lib/OrderService';
import { connectivityService }	from '../lib/ConnectivityService';
import G 						from '../lib/G';
import {Platform}				from 'react-native';

export function loginAction( phoneNumber )
{
	return ( dispatch, getState ) =>
	{
		const formData = {
			phone: phoneNumber,
			type: 'COURIER',
			model: DeviceInfo.getModel() ? DeviceInfo.getModel() : 'Nexus 5',
			uuid: DeviceInfo.getUniqueID() ? DeviceInfo.getUniqueID() : '123456',
			platform: Platform.OS,
			version: DeviceInfo.getSystemVersion() ? DeviceInfo.getSystemVersion() : '123456',
			manufacturer: DeviceInfo.getManufacturer() ? DeviceInfo.getManufacturer() : '123456',
			isVirtual: DeviceInfo.isEmulator() ? DeviceInfo.isEmulator() : '123456',
			serial: DeviceInfo.getUniqueID() ? DeviceInfo.getUniqueID() : '123456',
			app_version: G.appVersion,
			push_token: G.pushToken
		}
		return Api.post( '/login', formData, dispatch, 'LoginContainer' )
					.then( ( { result } ) =>
					{
						if ( result && result.token )
						{
							dispatch(
							{
								type: types.LOGIN_SUCCESS,
								payload: result
							})
						}
						else
						{
							showAlert( 'کاربری با این شماره در سیستم موجود نمی باشد.' )
						}
					})
					.catch( e => showAlert( e ) );
	} 
}

export function verifyUserAction( data )
{
	return ( dispatch, getState ) =>
	{
		data.columns = '*,courier';
		data.with=[ 'courier' ];
		return Api.post( '/verify', data, dispatch, 'VerificationContainer' )
					.then( ( { result } ) =>
					{
						if (result)
						{
							if (result.user && result.user.verify)
							{
								Api.setToken( result.csrf_token );
								dispatch(
								{
									type: types.VERIFY_SUCCESS,
									payload: result
								})	
							}
							else if (!result.user.verify)
							{
								showAlert('حساب کاربری شما فعال نشده است. برای اطلاعات بیشتر لطفا با پشتیبانی تماس بگیرید');
							}
						}
						else
						{
							showAlert('کد وارد شده صحیح نمی باشد.');
						}
					})
					.catch( e => showAlert( e ) );
	}
}

export function checkUserTokenAction()
{
	return ( dispatch, getState ) =>
	{
		setServicesDispatchFunction( dispatch );
		return Api.get( null, { withcourierconfig: true, columns: 'rates_avg,courier', with:[ 'courier' ], appVersion: G.appVersion }, dispatch )
			.then( ( { result } ) =>
			{
				if ( result )
				{
					if ( result.config )
					{
						G.setConfig( result.config );
						if ( result.config.update )
						{
							checkForUpdate( result.config.update );
						}
					}
					if ( result && result.user )
					{
						if ( !result.user.verify )
						{
							Api.removeToken();
							dispatch(
							{
								type: types.NOT_LOGGED_IN
							})
							showAlert( 'حساب شما تایید نشده است. لطفا با پشتیبانی تماس بگیرید' );
						}
						else
						{
							dispatch(
							{
								type: types.LOGGED_IN,
								payload: result
							})
						}
					}
					else
					{
						dispatch(
						{
							type: types.NOT_LOGGED_IN
						})
					}
				}
				else
				{
					dispatch(
					{
						type: types.NOT_LOGGED_IN
					})
				}
			})
			.catch( e =>
				{
					console.warn( e );
					showAlert( e );
				});
	}
}

export function logoutAction()
{
	return ( dispatch, getState ) =>
	{
		return Api.post( '/logout', {}, dispatch, 'ProfileContainer' )
					.then( () =>
					{
						Api.removeToken();
						dispatch(
						{
							type: types.USER_LOGGED_OUT
						})
					})
	}
}


export function showProfile( columns, cmpName )
{
	return ( dispatch, getState ) =>
	{
		columns = 'id,phone,firstname,lastname,email,'+ columns + ',courier,rates_5_count,orders_count,credit,referred_by_user';
		return Api.get( '/show-profile', { columns }, cmpName ? dispatch : null, cmpName )
					.then( ( { result } ) =>
					{
						dispatch(
						{
							type: types.USER_OBJECT_RECEIVED,
							payload: result
						})
					})
					.catch( e => showAlert( e ) );
	}

}

export function submitReferralAction( referred_by, firstname, lastname, cmpName )
{
	return ( dispatch, getState ) =>
	{
		return new Promise(resolve =>
		{
			Api.post( '/update-profile', 
				{
					referred_by,
					firstname,
					lastname,
					columns: '*,referred_by_user',
				}, dispatch, cmpName)
				.then( ( { result } ) =>
				{
					dispatch(
					{
						type: types.USER_REFERRAL_SUBMITTED,
						payload: result
					})
					resolve(result);
				})
				.catch( e => showAlert( e ) )
		})
	}
}

function setServicesDispatchFunction( dispatch )
{
	bgLocation.setDispatcher( dispatch );
	broadcastService.setDispatcher( dispatch );
	connectivityService.setDispatcher( dispatch );
	orderService.setDispatcher( dispatch );
}

function checkForUpdate( updateData )
{
	if ( G.appVersion && Object.keys( updateData ).length && updateData.version )
	{
		let current_version = G.appVersion.split( '.' );
		let new_version = updateData.version.split( '.' );
		if ( 
			 ( parseInt( new_version[0] ) > parseInt( current_version[0] ) ) ||
			 ( parseInt( new_version[1] ) > parseInt( current_version[1] ) ) ||
			 ( parseInt( new_version[2] ) > parseInt( current_version[2] ) ) 
			)
		{
			let message = updateData.message ? updateData.message : 'نسخه جدید الوپیک منتشر شد. لطفا برای جلوگیری از مشکلات احتمالی نسخه جدید را دریافت و نصب کنید.';
			showAlertWithOutButton( 'نسخه جدید الوپیک', message );
		}
	}
}

