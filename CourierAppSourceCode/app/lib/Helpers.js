import { Alert }				from 'react-native';
import G 						from './G';
import SendIntentAndroid		from 'react-native-send-intent';

export function showAlert( message )
{
	Alert.alert(
		'هشدار',
		message && message.error_msg 
				? message.error_msg
				: ( message && typeof message === 'string' ? message : 'عملیات با خطا مواجه شد.' ),
		[
			{
				text: 'باشه'
			}
		],
		{
			cancelable: false
		}

	);

}

export function showAlertCallback( message, callback )
{
	Alert.alert(
		'هشدار',
		message && message.error_msg 
				? message.error_msg
				: ( message && typeof message === 'string' ? message : 'عملیات با خطا مواجه شد.' ),
		[
			{
				text: 'تلاش مجدد',
				onPress: callback
			}
		],
		{
			cancelable: false
		}

	);
}

export function showAlertCustomCb( message, callback )
{
	Alert.alert(
		'هشدار',
		message && message.error_msg 
				? message.error_msg
				: ( message && typeof message === 'string' ? message : 'عملیات با خطا مواجه شد.' ),
		[
			{
				text: 'بله',
				onPress: callback
			},
			{
				text: 'خیر',
				onPress: () => {},
				style:'cancel',
			}
		],
		{
			cancelable: false
		}

	);
}

export function ucFirst( string )
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function currencyFormat( number ) 
{

	let sign = ( parseInt( number ) < 0 ) ? '-' : '';

	return sign + Math.abs( parseInt( number ) ).toFixed(0).replace( /./g, function( c, i, a ) {
		return i && c !== "." && ( ( a.length - i ) % 3 === 0 ) ? ',' + c : c;
	});

}

export function callToSupport()
{
	Alert.alert(
		'تماس با پشتیبانی',
		'آیا مایل به تماس با پشتیبانی هستید ؟ ',
		[
			{
				text: 'بله',
				onPress: () =>
				{
					SendIntentAndroid.sendPhoneCall( G.supportTel )	
				}
			},
			{
				text: 'خیر',
				style: 'cancel'
			}
		]
	);
}


export function callToNumber( number )
{
	Alert.alert(
		'تماس با مشتری',
		'آیا مایل به تماس با مشتری هستید ؟ ',
		[
			{
				text: 'بله',
				onPress: () =>
				{
					SendIntentAndroid.sendPhoneCall( number )	
				}
			},
			{
				text: 'خیر',
				style: 'cancel'
			}
		]
	);
}

export function showAlertWithOutButton( title, message )
{
	Alert.alert(
		title,
		message,
		[],
		{
			cancelable: false
		}
	);
}
