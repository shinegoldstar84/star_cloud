import React 						from 'react';
import Login 						from './Login';
import { connect }					from 'react-redux';
import { bindActionCreators }		from 'redux';
import { ActionCreators } 			from '../../actions/';
import { showAlert }				from '../../lib/Helpers';
import { Linking }					from 'react-native';

class LoginContainer extends React.Component
{

	constructor( props )
	{
		super( props );
		this.state = { phone: '' };
	}


	handleTextChange = ( text ) =>
	{
		this.setState(
		{
			phone: text
		});
	}

	handlePress = ( ) =>
	{
		this.props.loginAction( this.state.phone )
			.then( () =>
			{
				if ( this.props.isLoggedIn )
				{
					this.props.navigation.navigate( 'Verify' );
				}
			})
	}

	launchRules = () =>
	{
		Linking.openURL( 'https://alopeyk.com/terms-couriers' );
	}

	render()
	{
		return <Login 
					handlePress={ this.handlePress }
					textChange={ this.handleTextChange }
					isLoading={ this.props.isLoading.LoginContainer }
					disabled={  this.state.phone.length < 11 }
					launchRules={this.launchRules}
				/>
	}

}

const mapStateToProps = ( state ) =>
{
	return {
		isLoading: state.loading,
		isLoggedIn: state.auth.isLoggedIn
	}
}

const mapDispatchToProps = ( dispatch ) =>
{
	return bindActionCreators(
		{
			loginAction: ActionCreators.loginAction
		}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( LoginContainer );