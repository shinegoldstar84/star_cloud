import React 					from 'react';
import Reward 					from './Reward';
import { bindActionCreators }	from 'redux';
import { ActionCreators }		from '../../actions';
import { connect }				from 'react-redux';
import SendIntentAndroid		from 'react-native-send-intent';
import G 						from '../../lib/G';
import { Linking }				from 'react-native';

class RewardContainer extends React.Component
{

	shareReferral = ( sharingType ) =>
	{
		let sharingText = G.sharingText( this.props.user.referral_code );
		switch ( sharingType ) 
		{
			case 'sms':
				SendIntentAndroid.sendText(
				{
					text: sharingText,
					type: SendIntentAndroid.TEXT_PLAIN
				})
				break;
			case 'social':
				try
				{
					Linking.openURL( 'https://tlgrm.me/share/url?url=https://alopeyk.com&text='+ encodeURIComponent( sharingText ) )
				}
				catch( e )
				{

				}
				break;
			case 'email':
				SendIntentAndroid.sendMail( "", "Alopeyk", sharingText );
				break;
			case 'other':
				SendIntentAndroid.openChooserWithOptions(
				{
				    subject: 'الوپیک',
				    text: sharingText
				  }, 'به اشتراک گذاری توسط');
				break;
			default:
				// statements_def
				break;
		}
	}

	render()
	{
		return <Reward 
					referralCode={ this.props.user.referral_code }
					share={ this.shareReferral }
				/>
	}

}

const mapStateToProps = ( state ) =>
{
	return {
		user: state.auth.user  ? state.auth.user : {}
	}
}

export default connect( mapStateToProps )( RewardContainer );