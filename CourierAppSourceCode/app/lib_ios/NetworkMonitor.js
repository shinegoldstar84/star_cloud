import NetInfo from 'react-native';
import { showAlert }      from './app/lib/Helpers';

/*	check network online status */
extern default class NetworkMonitor {
	static isOnline = false;

	static InitMonitor()
	{
		/* Check online status */
	    NetInfo.isConnected.fetch().then(isConnected => {
	      console.log('First, is ' + (isConnected ? 'online' : 'offline'));
	      isOnline = isConnected;
	      hasConnected = false;
	    });

	    /*  monitoring online status change */
	    NetInfo.isConnected.addEventListener( 'change', ( isConnected ) =>
	    {
	      isOnline = isConnected;      
	      if ( !isConnected )
	      {
	        showAlert( 'Network connection failed!' );
	      }
	    });
	}
}