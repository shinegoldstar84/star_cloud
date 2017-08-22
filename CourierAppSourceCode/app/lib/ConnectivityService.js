import BaseService 				from './BaseService';
import { navigationService }	from './NavigationService';
import { ActionCreators }		from '../actions';
import { showAlert }			from './Helpers';
import { bgLocation }			from './BGLocation';

class ConnectivityService extends BaseService
{

	/**
	 * setter for last postion
	 * @param Object lastPosition
	 * @returns this
	 */
	setLastPosition( lastPosition )
	{
		this.lastPosition = lastPosition;
		return this;
	}

	/**
	 * Watch for the User Pause/Ban 
	 * @param Object data
	 */
	watch( data )
	{
		this.watchForBan( data.ban_info );
		this.watchForPause( data.connected );
	}

	/**
	 * watch for use banned
	 * @param Object ban_info
	 */
	watchForBan( ban_info )
	{
		if ( ban_info && !this.isBanned )
		{
			this.isBanned = true;
			this.dispatch( this.actionTypes.USER_BANNED, ban_info );
			this.goOffline()
				.then( () =>
					{
						navigationService.reset( 0, 'Ban', { ban: ban_info } );
					});
		}
	}

	/**
	 * watch for user paused
	 * @param Boolean connected
	 */
	watchForPause( disconnected )
	{
		if ( disconnected && !this.isPaused )
		{
			this.isPaused = true;
			this.dispatch( this.actionTypes.USER_PAUSED, true );
			this.goOffline();
			navigationService.reset( 0, 'Ban', { paused: true } );
		}
	}

	/**
	 * retries for check is user Unpaused/Unbanned or not
	 */
	retry( lastPosition )
	{
		if ( lastPosition )
		{
			ActionCreators.sendOfflinePosition( lastPosition, this.dispatcher, false, 'BanContainer' )
				.then( ( { result } ) =>
				{
					console.log( result );
					if ( result )
					{
						if ( this.isBanned && !result.ban_info )
						{
							this.isBanned = false;
							this.dispatch( this.actionTypes.USER_UNBANNED, {} );
							this.connectUser();
						}
						else if ( this.isPaused && !result.connected )
						{
							this.isPaused = false;
							this.dispatch( this.actionTypes.USER_UNPAUSED, {} );
							this.connectUser();
						}
					}
				})
				.catch( e => showAlert( e ) );
		}
	}

	/**
	 * turns the bglocation online and navigates to the
	 * Dashboard Page
	 */
	connectUser()
	{
		bgLocation.start()
			.then( () =>
			{
				navigationService.reset( 0, 'Main' );
			});
	}

	/**
	 * make courier offline
	 * @returns Promise
	 */
	goOffline()
	{
		return bgLocation.stopWatchPosition();
	}

}

export const connectivityService = new ConnectivityService();