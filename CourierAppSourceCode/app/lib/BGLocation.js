import G 						from './G';
import BaseService				from './BaseService';
import { connectivityService }	from './ConnectivityService';
import { broadcastService }		from './BroadcastService';
import { 
	NetInfo,
	DeviceEventEmitter,
	Alert,
	Linking
}								from 'react-native';
import BgGeo  					from './BgGeo';
import { showAlert }			from './Helpers';
import Api 						from './Api';

class BGLocation extends BaseService
{

	positions = [];
	currentConfig = false;

	constructor()
	{
		super();
		this.registerForNetworkChanges();
	}

	locationEnabled = true;

	/**
	 * prepare for starting BGLocation
	 */
	prepare()
	{
		this.forceStop( true );
		return this;
	} 	

	/**
	 * starts the Watch Position of BGLocation
	 */
	start()
	{
		return new Promise( resolve =>
		{
			BgGeo.configure(
			{
				url: G.baseUrl + '/positions',
				offline: false,
				version: G.appVersion.toString(),
				token: G.jwtToken,
				bgGeoInterval: G.bgLocateInterval,
				adapter: G.bgGeoAdapter
			}, () =>
			{
				BgGeo.start()
					.then( () => 
						{
							this.status = true;
							this.dispatch( this.actionTypes.CHANGE_STATUS, true );
							this.registerNativeEvents()
							resolve()
						})
					.catch( e => 
						{
							this.dispatch( this.actionTypes.CHANGE_STATUS, false );
							this.forceStop();
							Alert.alert(
								'هشدار',
								'لطفا google play services را بروزرسانی کنید', 
								[
									{
										text: 'بروزرسانی',
										onPress: () => Linking.openURL('https://play.google.com/store/apps/details?id=com.google.android.gms&hl=en')
									},
									{
										text: 'انصراف',
									}
								]
							)
						});
			});
		})
	}

	registerNativeEvents()
	{
		DeviceEventEmitter.addListener( 'positionHttpResponse', ( data ) =>
		{
			if ( data && data.latitude && data.longitude )
			{
				// if ( this.currentPosition && this.currentPosition.coords )
				// {
				// 	this.positions.push(
				// 	{
				// 		lat: data.latitude,
				// 		lng: data.longitude
				// 	});
				// 	if ( this.positions.length >= 50 )
				// 	{
				// 		this.positions = [];
				// 		const distance = this.getDistanceFromLatLonInKm( this.currentPosition.coords.latitude, this.currentPosition.coords.longitude, data.latitude, data.longitude );
				// 		if ( distance >= 0.008 )
				// 		{
				// 			let locationData = {
				// 				latlng : data.latitude + ',' + data.longitude
				// 			};
				// 			Api.get( '/locations', locationData )
				// 				.then( ({ result }) =>
				// 				{
				// 					this.dispatch( this.actionTypes.CURRENT_ADDRESS_FETCHED, result );
				// 				})
				// 		}
				// 	}
				// }
				this.currentPosition = {
					coords: {
						latitude: data.latitude,
						longitude: data.longitude,
						timestamp: data.timestamp,
					},
					offline: false,
				}
				// this.currentPosition = position;
				this.dispatch( this.actionTypes.LAST_POSITION, this.currentPosition );	
			}
			this.onBgLocationResponse( data.response );
		})
		DeviceEventEmitter.addListener( 'locationConnectionFailed', () =>
		{
			this.dispatch( this.actionTypes.LOCATION_PROVIDER_CHANGE, false );
			this.stopWatchPosition();
			this.dispatch( this.actionTypes.CHANGE_STATUS, false );
			showAlert( 'عدم دستیابی به مکان یاب. لطفا مکان یاب دستگاه خود را چک کنید.' );
		})
	}

	getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) 
	{
		var R = 6371; // Radius of the earth in km
		var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
		var dLon = this.deg2rad(lon2-lon1); 
		var a = 
		  Math.sin(dLat/2) * Math.sin(dLat/2) +
		  Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
		  Math.sin(dLon/2) * Math.sin(dLon/2)
		  ; 
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
		var d = R * c; // Distance in km
		return d;
	}

	deg2rad(deg) 
	{
	  	return deg * (Math.PI/180)
	}

	/**
	 * registers for the network changes
	 */
	registerForNetworkChanges()
	{
		NetInfo.isConnected.addEventListener( 'change', ( isConnected ) =>
		{
			if ( !isConnected )
			{
				this.dispatch( this.actionTypes.NETWORK_DISCONNECTED, true );
				this.pause();
			}
			else
			{
				this.dispatch( this.actionTypes.NETWORK_CONNECTED, true );
				this.resume();
			}
		})
		DeviceEventEmitter.addListener( 'location:change', ( data ) =>
		{
			if ( !data.available )
			{
				this.dispatch( this.actionTypes.LOCATION_PROVIDER_CHANGE, false );
				this.pause();	
			}
			else
			{
				this.dispatch( this.actionTypes.LOCATION_PROVIDER_CHANGE, true );
				this.resume();
			}
		})
	}

	/**
	 * handles the BGLocation Http Response.
	 * @returns Promise
	 */
	onBgLocationResponse( response )
	{
		return new Promise( resolve =>
		{
			if ( response )
			{
				try
				{
					const { object } = JSON.parse( response );
					if ( object )
					{
						broadcastService.watchForOrder( object.assigned_order );
						connectivityService.watch( object );
					}
					resolve();
				}
				catch( e )
				{
					console.log( 'JSONPARSE: ', e );
				}
			}
		});
	}

	/**
	 * change the BGLocation Configuration
	 * @param Boolean hasActiveOrder
	 */
	setConfig( hasActiveOrder = false )
	{
		if (hasActiveOrder != this.currentConfig)
		{
			this.currentConfig = hasActiveOrder;
			BgGeo.setConfig(
			{
				bgGeoInterval: hasActiveOrder ? G.bgLocateIntervalWithOrder : G.bgLocateInterval,
				backgroundMode: hasActiveOrder,
			});
		}
		// BackgroundGeolocation.setConfig(
		// {
		// 	foregroundService: hasActiveOrder,
		// 	stopOnTerminate: !hasActiveOrder,
		// 	locationUpdateInterval: hasActiveOrder ? G.bgLocateIntervalWithOrder : G.bgLocateInterval,
		// 	fastestLocationUpdateInterval:  hasActiveOrder ? G.bgLocateIntervalWithOrder : G.bgLocateInterval,
		// })
	}

	/**
	 * stop watch position
	 */
	stopWatchPosition()
	{
		return new Promise( resolve =>
		{
			try
			{
				// BackgroundGeolocation.stop();
				// BackgroundGeolocation.stopWatchPosition();
				BgGeo.stop();
			}
			catch( e )
			{
				console.log( 'E:', e );
			}
			
			if ( this.currentPosition && this.status )
			{
				this.currentPosition.offline = true;
				this.status = false;
				this.dispatch( this.actionTypes.LAST_POSITION, this.currentPosition );
				resolve( this.currentPosition );
			}
			else
			{
				resolve();
			}
			
		})
	}

	/**
	 * Force Stop BackgroundGeolocation
	 * @returns Promise
	 */
	forceStop( makeOffline = false )
	{
		return new Promise( resolve =>
		{
			try
			{
				BgGeo.stop();
				if ( makeOffline )
				{
					this.status = false;
					this.dispatch( this.actionTypes.CHANGE_STATUS, false );
				}
			}
			catch( e )
			{

			}
			resolve();
		})
	}


	/**
	 * set the courier status
	 */
	setStatus()
	{
		return new Promise( resolve =>
		{
			if ( this.status === undefined || this.status === null )
			{
				this.status = true;
			}
			else
			{
				this.status = !this.status;
			}
			this.dispatch( this.actionTypes.LOADING, 
				{
					cmpName: 'DashboardContainer',
					state: true
				});
			( this.status ? this.start() : this.stopWatchPosition() )
				.then( ( data ) => 
				{
					this.dispatch( this.actionTypes.LOADING,
						{
							cmpName: 'DashboardContainer',
							state: false
						});
					resolve( this.status, data )
				});
		});
	}


	/**
	 * pause the watch position
	 */
	pause()
	{
		if ( !this.paused && this.status )
		{
			this.paused = true;
			BgGeo.stop();
			// BackgroundGeolocation.stopWatchPosition();
		}
	}

	/**
	 * resume the WatchPosition
	 */
	resume()
	{
		if ( this.paused && this.status )
		{
			this.paused = false;
			this.start();
		}
	}

}

export const bgLocation = new BGLocation();