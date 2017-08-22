import React from 'react';
import { View }	from 'react-native';
import { bindActionCreators }	from 'redux';
import { ActionCreators }		from '../../actions';
import { connect }				from 'react-redux';
import Verification 			from './Verification';
import { navigationService }	from '../../lib/NavigationService';
import { bgLocation }			from '../../lib/BGLocation';
import Api						from '../../lib/Api'
import {showAlert}				from '../../lib/Helpers';

class VerificationContainer extends React.Component
{

	constructor(props)
	{
		super(props);
		this.state = { code: '' };
	}

	onTextChange = ( text ) =>
	{
		this.setState(
		{
			code: text
		});
		if ( text.length == 5 )
		{
			this.handleVerification(text)
		}
	}

	resendVerification = ( type ) =>
	{
		Api.post( '/resend',
		{
			// id: this.props.id,
			token: this.props.token,
			type
		})
		.then( result =>
		{
			// this.resetTimer();
			// this.setState(
			// {
			// 	loading: false,
			// });
			// showAlert( 'کد تأیید ارسال گردید.' );
		})
		.catch( e => showAlert( ex ) )
	}

	handleVerification(text)
	{
		this.props.verifyUserAction( { code: text, token: this.props.token } )
			.then( () =>
			{
				if ( this.props.isVerified )
				{
					this.props.checkCourierActiveOrder( 'VerificationContainer' )
						.then( () =>
						{
							if ( this.props.activeOrder && this.props.activeOrder.next_address_any_full )
							{
								bgLocation.start()
									.then( () =>
									{
										const currentAddress = this.props.activeOrder.next_address_any_full;
										const params = {
											addr_id: this.props.activeOrder.next_address_any_full.id,
											order_id: this.props.activeOrder.id,
											order: this.props.activeOrder
										};
										bgLocation.setConfig( true );
										navigationService.reset( 0, 'HandleAddress', params );
									})
							}
							else
							{
								navigationService.reset( 0, 'Main' );
							}
						})
				}
			})
	}

	render()
	{
		return <Verification 
					textChange={ this.onTextChange } 
					loading={ this.props.loading.VerificationContainer }
					resend={this.resendVerification}
				/>
	}

}

const mapStateToProps = ( state ) =>
{
	return {
		token: state.auth.token,
		loading: state.loading,
		isVerified: state.auth.isVerified,
		activeOrder: state.order && state.order.order ? state.order.order : {}
	}
}

const mapDispatchToProps = ( dispatch ) =>
{
	return bindActionCreators( 
		{
			verifyUserAction: ActionCreators.verifyUserAction,
			checkCourierActiveOrder: ActionCreators.checkCourierHasActiveOrder
		}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( VerificationContainer );