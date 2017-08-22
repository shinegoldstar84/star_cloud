import React 					from 'react';
import Profile 					from './Profile';
import { bindActionCreators }	from 'redux';
import { connect }				from 'react-redux';
import { ActionCreators }		from '../../actions';
import { callToSupport }		from '../../lib/Helpers';
import { navigationService }	from '../../lib/NavigationService';
import { bgLocation }			from '../../lib/BGLocation';
import { orderService }			from '../../lib/OrderService';
import { showAlertCustomCb }	from '../../lib/Helpers';
import G 						from '../../lib/G';
import {
	DeviceEventEmitter,
	Linking
}		from 'react-native';
import {showAlert}				from '../../lib/Helpers';

class ProfileContainer extends React.Component
{

	constructor(props) 
	{
		super(props);
		this.state = { isLoading: false, referred_by: '' };
	}

	logout = () =>
	{
		showAlertCustomCb( 'آیا مایل به خروج از حساب کاربری خود هستید ؟', () =>
		{
			this.setState(
			{
				isLoading: true
			})
			orderService.stop();
			DeviceEventEmitter.emit('user:on:logout', {});
			bgLocation.forceStop( true )
				.then( () =>
				{
					this.props.logout()
						.then( () =>
						{
							this.setState(
							{
								isLoading: false
							})
							navigationService.reset( 0, 'Walkthrough' );
						})
				})
		});
	}

	launchRules = () =>
	{
		Linking.openURL( 'https://alopeyk.com/terms-couriers' );
	}


	referralTextChange = ( text ) =>
	{
		this.setState(
		{
			referred_by: text,
		});
	}

	submitReferral = () =>
	{
		this.props.submitReferral( 
				this.state.referred_by,
				this.props.user.firstname,
				this.props.user.lastname,
				'ProfileContainer'
			)
			.then( (data) =>
			{
				this.props.loadUserData('rates_avg', 'ProfileContainer');
				if (!data.referred_by)
				{
					showAlert('کد معرف وارد شده اشتباه است.');
				}
			});
	}

	openChannel = ( channelName ) =>
	{
		channelName = typeof channelName === 'string' ? channelName : G.telegramSafiranName;
		var channelAppUrl     = 'tg://resolve?domain=' + channelName,
			channelBrowserUrl = ( channelName != G.telegramSafiranName ) ? 'https://telegram.me/' + channelName : G.telegramSafiranLink
		Linking.canOpenURL ( channelAppUrl ) .then ( supported => {
			if ( supported )
			{
				Linking.openURL( channelAppUrl );
			}
			else
			{
				Linking.openURL( channelBrowserUrl );
			}
		});
	}

	render()
	{
		return <Profile 
					user={ this.props.user } 
					goToHistory={ () => { this.props.navigation.navigate( 'History' ) } }
					call={ callToSupport }
					logout={ this.logout }
					account={ () => this.props.navigation.navigate( 'Account' ) }
					isLoading={ this.props.isLoading.ProfileContainer || this.state.isLoading }
					transportTypes={ this.props.user && this.props.user.courier && this.props.user.courier.transport_types ? this.props.user.courier.transport_types.split( ',' ) : [] }
					launchRules={this.launchRules}
					referredBy={ this.props.user.referred_by_user }
					textChange={ this.referralTextChange }
					submitReferral={ this.submitReferral }
					openChannel={ this.openChannel }
				/>
	}
}

const mapStateToProps = ( state ) =>
{
	return {
		user: state.auth && state.auth.user ? state.auth.user : {},
		isLoading: state.loading,
	}
}

const mapDispatchToProps = ( dispatch ) =>
{
	return bindActionCreators(
	{
		logout: ActionCreators.logoutAction,
		submitReferral: ActionCreators.submitReferralAction,
		loadUserData: ActionCreators.showProfile
	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( ProfileContainer );