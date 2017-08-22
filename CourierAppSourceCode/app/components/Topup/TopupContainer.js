import React 						from 'react';
import Topup 						from './Topup';
import { connect }					from 'react-redux';
import { bindActionCreators }		from 'redux';
import { ActionCreators }			from '../../actions';
import G 							from '../../lib/G';
import {
	Linking,
	AppState
}									from 'react-native';
import { 
	showAlertCustomCb,
	showAlert,
	currencyFormat
}	from '../../lib/Helpers';
import {navigationService}			from '../../lib/NavigationService';

class TopupContainer extends React.Component
{

	constructor(props) 
	{
		super(props);
		this.state = { 
			amount: 0,
			newCredit: '',
			headerComponent: 'Header',
			showModal: false ,
			appState: AppState.currentState,
			oldCredit: 0,
			goingToTopup: false,
		};
	}

	async componentWillMount() 
	{
		this.props.loadUserData( 'rates_avg', 'TopupContainer' )
			.then( () =>
				{
					this.setState(
					{
						newCredit: this.props.user && this.props.user.credit ? this.props.user.credit : 0
					});
				});
		AppState.addEventListener( 'change', ( nextState ) =>
		{
			if ( this.state.appState.match( /inactive|background/ ) && nextState === 'active' )
			{
				this.setState(
				{
					showModal: false,
				});
				this.props.loadUserData( 'rates_avg', 'TopupContainer' )
					.then( () =>
						{
							if (this.state.goingToTopup)
							{
								if (parseInt(this.state.oldCredit) < parseInt(this.props.user.credit))
								{
									showAlert('اعتبار شما با موفقیت افزایش یافت.');
									this.props.navigation.goBack();
								}
								else
								{
									showAlert('عملیات پرداخت ناموفق بود.');	
								}
							}
							this.setState(
							{
								newCredit: this.props.user && this.props.user.credit ? this.props.user.credit : 0,
								goingToTopup: false,
							});
						});
			}
			this.setState(
			{
				appState: nextState
			})
		});
	}

	handleInputChange = ( text ) =>
	{
		this.setState(
		{
			amount: text,
			newCredit: parseInt( this.props.user && this.props.user.credit ? this.props.user.credit : 0  ) + parseInt( text ),
		});
	}

	toggleModal = () =>
	{
		this.setState(
		{
			showModal: !this.state.showModal,
		})
	}

	pay = () =>
	{
		this.setState(
		{
			oldCredit: this.props.user.credit,
			goingToTopup: true,
		})
		let url = G.baseUrl + `/payment?amount=${ this.state.amount }&user_id=${ this.props.user.id }`;
		Linking.openURL( url );
	}

	render()
	{
		return <Topup 
					credit={ this.props.user && this.props.user.credit ? this.props.user.credit : 0 }
					isLoading={ this.props.isLoading }
					textChange={ this.handleInputChange }
					toggleModal={ this.toggleModal }
					newCredit={ this.state.newCredit }
					disabled={ !this.state.amount }
					amount={ parseInt( this.state.amount ) }
					shouldShowModal={ this.state.showModal }
					pay={ this.pay }
				/>
	}
}

const mapStateToProps = ( state ) =>
{
	return {
		user: state.auth.user,
		isLoading: state.loading.TopupContainer
	}
}

const mapDispatchToProps = ( dispatch ) =>
{
	return bindActionCreators(
	{
		loadUserData: ActionCreators.showProfile
	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( TopupContainer );