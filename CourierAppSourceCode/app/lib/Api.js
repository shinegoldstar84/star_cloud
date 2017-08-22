import { AsyncStorage }	from 'react-native';
import G from './G';
import { showAlertCallback }	from './Helpers';
import { LOADING }				from '../actions/types';
import axios 					from 'axios';

export default class Api
{

	static paused = false;

	/**
	 * make a raw request with out base request prefix
	 * @param String method
	 * @param String url
	 * @param Object params
	 * @param Function dispatch
	 * @param String cmpName
	 * @returns Promise
	 */
	static request( method, url, params = {}, dispatch = null, cmpName = null )
	{
		return new Promise( ( resolve, reject ) =>
		{
			Api.handleLoading( dispatch, cmpName );
			if ( axios[ method ] && typeof axios[ method ] === 'function' )
			{
				if ( method === 'get' )
				{
					url = url + Api.serializeParams( params );
				}
				axios[ method ]( url )
					.then( response =>
					{
						resolve( response );
					})
					.catch( e => reject( null ) );
			}
		})
	}


	/**
	 * call the url with GET method and
	 * @param String url
	 * @param Object searchParams
	 * @returns Promise
	 */
	static get( url, searchParams = {} | [], dispatch = null, cmpName = null, tryAgain = true )
	{
		let args = arguments;
		return new Promise( ( resolve, reject ) =>
		{
			Api.handleLoading( dispatch, cmpName );
			Api.getHeaders()
				.then( headers =>
				{
					let completeUrl = G.baseUrl + ( url ? url : '' ) + Api.serializeParams( searchParams );
					axios.get( completeUrl, 
					{
						headers
					})
					.then( response =>
						{
							Api.handleLoading( dispatch, cmpName, false );
							if ( response && response.data && response.data.object && response.data.object.error )
							{
								reject( response.data.object.error_msg ? response.data.object.error_msg : response.data.object.error );
							}
							else
							{
								resolve( Api.processResponse( response.data ? response.data : '' ) );
							}
						})
					.catch( e =>
						{
							Api.handleLoading( dispatch, cmpName, false );
							if ( tryAgain )
							{
								Api.tryAgain( args, resolve, reject, e );
							}
							else
							{
								reject( Api.errorMessageProvider( e && e.response ? e.response.data : {} ) );
							}
						});
				})
		})
	}

	/**
	 * call a url with Post method
	 * @param String url
	 * @param Object data
	 * @returns Promise
	 */
	static post( url, data, dispatch = null, cmpName = null, tryAgain = true )
	{
		return new Promise( ( resolve, reject ) =>
		{
			let args = arguments;
			Api.handleLoading( dispatch, cmpName );
			Api.getHeaders()
				.then( headers =>
				{
					axios.post( G.baseUrl + url, data, {
						headers: headers,
					})
					.then( response =>
					{
						Api.handleLoading( dispatch, cmpName, false );
						if ( response.data.object && response.data.object.error )
						{
							reject( response.data.object.error_msg ? response.data.object.error_msg : response.data.object.error );
						}
						else
						{
							resolve( Api.processResponse( response.data ? response.data : '' ) );
						}
					})
					.catch( e =>
					{
						Api.handleLoading( dispatch, cmpName, false );
						if ( tryAgain )
						{
							Api.tryAgain( args, resolve, reject, e );
						}
						else
						{
							reject( Api.errorMessageProvider( e.response.data ) );
						}
					})
				})
		})
	}

	/**
	 * call a url with put method
	 * @param String url
	 * @param any id
	 * @param Object data
	 * @param function dispatch
	 * @param String cmpName
	 * @param boolean tryAgain
	 */
	static put( url, id, data, dispatch = null, cmpName = null, tryAgain = true )
	{
		return new Promise( ( resolve, reject ) =>
		{
			let args = arguments;
			Api.handleLoading( dispatch, cmpName );
			Api.getHeaders()
				.then( headers =>
				{
					axios.put( G.baseUrl + url + `/${id}`, data, 
					{
						headers: headers,
					})
					.then( response =>
					{
						Api.handleLoading( dispatch, cmpName, false );
						if ( response.data.object && response.data.object.error )
						{
							reject( response.data.object.error_msg ? response.data.object.error_msg : response.data.object.error );
						}
						else
						{
							resolve( Api.processResponse( response.data ? response.data : '' ) );
						}
					})
					.catch( e =>
					{
						Api.handleLoading( dispatch, cmpName, false );
						if ( tryAgain )
						{
							Api.tryAgain( args, resolve, reject, e );
						}
						else
						{
							reject( Api.errorMessageProvider( e.response.data ) );
						}
					})
				})
		})
	}

	/**
	 * call a url with delete method
	 * @param String url
	 * @param any id
	 * @param Object data
	 * @param function dispatch
	 * @param String cmpName
	 * @param boolean tryAgain
	 */
	static delete( url, id,  dispatch = null, cmpName = null, tryAgain = true )
	{
		return new Promise( ( resolve, reject ) =>
		{
			Api.handleLoading( dispatch, cmpName );
			Api.getHeaders()
				.then( headers =>
				{
					axios.delete( G.baseUrl + url + `/${id}`,
					{
						headers: headers,
					})
					.then( response =>
					{
						Api.handleLoading( dispatch, cmpName, false );
						resolve( Api.processResponse( response.data ? response.data : '' ) );
					})
					.catch( e =>
					{
						Api.handleLoading( dispatch, cmpName, false );
						if ( tryAgain )
						{
							Api.tryAgain( args, resolve, reject, e );
						}
						else
						{
							reject( Api.errorMessageProvider( e ) );
						}
					})
				})
		})
	}

	/**
	 * try the request again
	 * @param object args
	 * @param function resolve
	 * @param function reject
	 * @param mixed error
	 */
	static tryAgain( args, resolve, reject, error = null )
	{
		if ( args && args.callee && args.callee.name && error )
		{
			if ( !error.response || ( !error.response.status && !Api.paused ) )
			{
				Api.paused = true;
				showAlertCallback( 'عملیات با خطا مواجه شد. لطفا مجددا تلاش فرمایید.', () =>
				{
					Api.paused = false;
					Api[ args.callee.name ]( ...args )
						.then( resolve )
						.catch( reject );
				})
			}
			else
			{
				reject( Api.errorMessageProvider( error.response.data ) );		
			}
		}
		else
		{
			reject( Api.errorMessageProvider( error.response.data ) );
		}
	}

	/**
	 * make headers
	 * @returns Promise
	 */
	static getHeaders()
	{
		return new Promise( resolve =>
		{
			this.getToken()
				.then( token =>
				{
					this.headers = {
						'Content-Type': 'application/json',
						'X-Requested-With': 'XMLHttpRequest',
						'Authorization': `Bearer ${ token }`
					}
					resolve( this.headers );
				});
		});
	}

	/**
	 * retrieves the token from Storage
	 * @returns Promise
	 */
	static getToken()
	{
		return new Promise( resolve =>
		{
			AsyncStorage.getItem( 'jwt_token' )
				.then( token =>
				{
					G.jwtToken = token;
					resolve( token );
				});
		});
	}

	/**
	 * set the token in storage
	 * @returns Promise
	 */
	static setToken( token )
	{
		return new Promise( resolve =>
		{
			G.jwtToken = token;
			AsyncStorage.setItem( 'jwt_token', token )
				.then( () => resolve );
		});
	}

	/**
	 * removes token from storage
	 */
	static removeToken()
	{
		AsyncStorage.removeItem( 'jwt_token' );
	}

	/**
	 * process the response and returns the object
	 * @returns Object
	 */
	static processResponse( response )
	{
		return {
			result: response ? response.object : null,
			isSuccess: response && response.status === 'success' ? true : false,
		}
	}

	/**
	 * provides a message for error response of api
	 * @param Response err
	 * @returns mixed
	 */
	static errorMessageProvider( err )
    {
        let errors = err;
        // try { errors = errors.json(); } catch( e ) {}
        if ( errors.error )
        {
            errors = errors.error;
        }
        else if ( errors.errors )
        {
            errors = errors.errors;
        }
        else if ( errors.object )
        {
            if ( errors.object.message )
            {
                errors = errors.object.message;
                try { errors = JSON.parse( errors ); } catch ( e ) { }
                if ( typeof errors === 'object' )
                {
                    let arr:any[] = [];
                    for ( let i in errors )
                    {
                        arr.concat( errors[i] );
                    }
                    errors = arr.join(', ');
                }
            }
            else
            {
                errors = errors.object;
            }
        }
        else
        {
            errors = null;
        }
        return errors;
    }

	/**
	 * if should update loading status
	 * @param function dispatch
	 * @param boolean state
	 */
	static handleLoading( dispatch, cmpName, state = true )
	{
		if ( dispatch && typeof dispatch === 'function' )
		{
			dispatch(
			{
				type: LOADING,
				payload: {
					cmpName,
					state
				}
			});
		}
	}

	static serializeParams ( a ) 
	{
		let prefix, s, add, name, r20, output;
		s = [];
		r20 = /%20/g;
		add = function (key, value) {
			// If value is a function, invoke it and return its value
			value = ( typeof value == 'function' ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
		};
		if (a instanceof Array) 
		{
			for (name in a) {
				add(name, a[name]);
			}
		} 
		else 
		{
			for (prefix in a) 
			{
				Api.buildParams(prefix, a[ prefix ], add);
			}
		}
		output = s.join("&").replace(r20, "+");
		return '?'+output;
	}

	static buildParams( prefix, obj, add ) 
	{
		let name, i, l, rbracket;
		rbracket = /\[\]$/;
		if (obj instanceof Array) {
			for (i = 0, l = obj.length; i < l; i++) 
			{
				if (rbracket.test(prefix)) 
				{
					add(prefix, obj[i]);
				} 
				else 
				{
					Api.buildParams(prefix + "[" + ( typeof obj[i] === "object" ? i : "" ) + "]", obj[i], add);
				}
			}
		} 
		else if (typeof obj == "object") 
		{
			// Serialize object item.
			for (name in obj) 
			{
				Api.buildParams(prefix + "[" + name + "]", obj[ name ], add);
			}
		} 
		else 
		{
			// Serialize scalar item.
			add(prefix, obj);
		}
	}

}