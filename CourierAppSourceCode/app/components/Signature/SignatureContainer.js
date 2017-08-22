import React 						from 'react';
import Signature 					from './Signature';
import { connect }					from 'react-redux';
import { bindActionCreators }		from 'redux';
import { ActionCreators } 			from '../../actions';
import { orderService }				from '../../lib/OrderService';
import {
	Keyboard,
	BackHandler,
	DeviceEventEmitter
} 				from 'react-native';
import {showAlertCustomCb}			from '../../lib/Helpers';


class SignatureContainer extends React.Component
{

	constructor( props )
	{
		super(props);
		this.state = {
			image: '',
			base64: true,
			signed_by: null,
			itemId: '',
			orderId: '',
			showPrompt: true,
			showInfoModal: false
		};
	}

	componentWillMount() 
	{
		const { params } = this.props.navigation.state;
		if ( params && params.order_id && params.addr_id )
		{
			this.setState(
			{
				itemId: params.addr_id,
				orderId: params.order_id
			})
		}
		BackHandler.addEventListener('hardwareBackPress', () =>
		{
			BackHandler.exitApp();
			return true;
		})
		DeviceEventEmitter.addListener( 'show:info:modal', this.showModal.bind( this ) );
	}

	componentDidMount() 
	{
		setTimeout(() =>
		{
			orderService
				.setOrder( this.props.order )
				.setCurrentComponent('Signature')
				.start();	
		}, 1000 );
	}

	showModal = () =>
	{
		this.setState(
		{
			showInfoModal: !this.state.showInfoModal,
		})
	}

	componentWillUnmount() 
	{
		BackHandler.removeEventListener('hardwareBackPress', () => {} );	
		DeviceEventEmitter.removeListener( 'show:info:modal', this.showModal.bind( this ) );
	}

	togglePrompt = () =>
	{
		this.setState(
		{
			showPrompt: !this.state.showPrompt,
		})
	}

	isPromptValid = () =>
	{
		return !!this.state.signed_by;
	}

	onFormChange = ( data ) =>
	{
		if ( data && data.name && this.state.hasOwnProperty( data.name ) )
		{
			this.setState(
			{
				[ data.name ] : data.value
			});
		}
	}

	isFormValid = () =>
	{
		return this.state.signed_by;
	}

	addName = ( signed_by ) =>
	{
		this.setState(
		{
			signed_by,
			showPrompt: false,
		})
	}

	submit = () =>
	{
		showAlertCustomCb('آیا از انجام عملیات اطمینان دارید ؟', () =>
		{
			Keyboard.dismiss();
			if (this.state.image && this.state.base64)
			{
				this.props.saveSignature( this.state.image, this.state.base64, this.state.itemId, this.state.orderId )
					.then( () =>
						{
							this.props.saveSignedBy(
								this.state.orderId,
								this.state.itemId, 
								this.props.lastPosition.coords.latitude,
								this.props.lastPosition.coords.longitude,
								this.state.signed_by
							)
							.then( () =>
							{
								orderService.handled( this.props.lastPosition, 'SignatureContainer' )
								// this.props.navigation.navigate( 'HandleAddress' );
							})
						});
			}
			else
			{
				this.props.saveSignedBy(
					this.state.orderId,
					this.state.itemId, 
					this.props.lastPosition.coords.latitude,
					this.props.lastPosition.coords.longitude,
					this.state.signed_by
				)
				.then( () =>
				{
					orderService.handled( this.props.lastPosition, 'SignatureContainer' )
					// this.props.navigation.navigate( 'HandleAddress' );
				})
			}
		})
	}

	render()
	{
		return <Signature 
					formHandler={ this.onFormChange }
					isFormValid={ this.isFormValid() }
					submit={ this.submit }
					isLoading={ this.props.isLoading }
					payAtDest={ this.props.order ? this.props.order.pay_at_dest : false }
					cashPayment={ this.props.order ? !this.props.order.credit : false }
					price={ this.props.order ? this.props.order.price : 0 }
					isPromptValid={ this.isPromptValid }
					addName={ this.addName }
					showPrompt={ this.state.showPrompt }
					signedBy={ this.state.signed_by }
					togglePrompt={ this.togglePrompt }
					showInfoModal={ this.state.showInfoModal }
					info={ this.props.order ? this.props.order : {} }
					toggleInfoModal={ this.showModal }
					isLastAddress={ !!!this.props.order.next_address }
					containerProps={ this.props }
				/>
	}

}

const mapStateToProps = ( state ) =>
{
	return {
		isLoading: state.loading.SignatureContainer,
		order: state.order && state.order.order ? state.order.order : {},
		lastPosition: state.location && state.location.lastPosition ? state.location.lastPosition : {},
	}
}

const mapDispatchToProps = ( dispatch ) =>
{
	return bindActionCreators(
	{
		saveSignature: ActionCreators.saveSignatureAction,
		saveSignedBy: ActionCreators.saveSignedByAction
	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( SignatureContainer );