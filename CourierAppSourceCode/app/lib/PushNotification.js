import PushNotification from 'react-native-push-notification';

export default class AppPushNotification
{


	static init()
	{
		return new Promise( resolve =>
		{
			PushNotification.configure(
			{
				onRegister: ( token ) => 
				{
					resolve( token );
				},

			    // (required) Called when a remote or local notification is opened or received
			    onNotification: function( notification ) 
			    {
			    	console.log( 'NOTIFICATION:', notification );
			    },

			    // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
			    senderID: "709340299724",
			});
		});
	}

}