import React 					from 'react';
import { 
	Text,
	Alert,
	Vibration,
	BackHandler
}	from 'react-native';
import { mediaPlayer }			from '../../lib/MediaPlayer';
import G 						from '../../lib/G';
import { connect }				from 'react-redux';
import { bindActionCreators }	from 'redux';
import { ActionCreators }		from '../../actions';
import Broadcasting 			from './Broadcasting';
import { orderService }			from '../../lib/OrderService';
import { navigationService }	from '../../lib/NavigationService';
import { showAlert }			from '../../lib/Helpers';

class BroadcastingContainer extends React.Component
{

	currentTimer = 0;

	constructor(props) 
	{
		super(props);
		this.state = { isMounted: false, progress: 0 };
	}

	componentWillMount()
	{
		this.startProgressBar();
		Vibration.vibrate( [ 0, 1500, 1000 ], true );
		mediaPlayer.playIncome();
		this.setRequestTimeCountDown();
		this.setState( { isMounted : true } );
		BackHandler.addEventListener('hardwareBackPress', () =>
		{
			return true;
		})
	}

	componentWillUnmount() 
	{
		BackHandler.removeEventListener( 'hardwareBackPress', () => {} );
	}

	startProgressBar = () =>
	{
		this.interval = setInterval( () =>
		{
			this.currentTimer += 100 / ( G.orderResponseTime / 1000 );
			this.setState(
			{
				progress: this.currentTimer,
			})
			if ( parseInt( this.currentTimer ) >= 100 )
			{
				clearInterval( this.interval );
			}
		}, 1000 );
	}

	setRequestTimeCountDown()
	{
		this.timer = setTimeout( () =>
		{
			this.props.navigation.navigate( 'BanWarning' );
		}, G.orderResponseTime );

		this.vibrateTimer = setTimeout( () =>
		{
			Vibration.cancel();
		}, 10000 );
	}

	acceptOrder = () =>
	{
		Vibration.cancel();
		orderService.acceptOrder( this.props.newOrder.broadcast_id, this.props.newOrder.id, this.props.lastPosition.coords )
			.then( ( result ) =>
				{
					navigationService.reset( 0, 'HandleAddress' );
				})
			.catch(() =>
				{
					navigationService.reset(0, 'Main');
				});
	} 

	componentWillUnmount()
	{
		clearTimeout( this.timer );
		clearTimeout( this.vibrateTimer );
		clearInterval( this.interval );
		mediaPlayer.release();	
		this.props.sentExOrderAction();
		this.setState( { isMounted : false } )
	}

	showSkipOrderAlert = () =>
	{
		Alert.alert(
			'رد درخواست',
			'آیا از انصراف خود اطمینان دارید؟',
			[
				{
					text: 'بله',
					onPress: this.skipOrder
				},
				{
					text: 'خیر',
					style: 'cancel'
				}
			]
		)
		
	}

	skipOrder = () =>
	{
		Vibration.cancel();
		this.props.skipOrderAction( this.props.newOrder.id, this.props.newOrder.broadcast_id )
			.then( () =>
			{
				clearTimeout( this.timer );
				clearTimeout( this.vibrateTimer );
				mediaPlayer.release();
				this.props.navigation.navigate( 'BanWarning', { backNav: () => this.props.navigation.navigate( 'Main' ) } );
			})
	}

	render()
	{
		const price = this.props.newOrder ? (
			this.props.newOrder.nprice ? this.props.newOrder.nprice : this.props.newOrder.price
			)
			: 0;
		return <Broadcasting 
					screenshot={ this.props.newOrder && this.props.newOrder.screenshot ? this.props.newOrder.screenshot.url : '' } 
					addresses={ this.props.newOrder && this.props.newOrder.addresses ? this.props.newOrder.addresses.filter( addr => addr.type != 'return' ) : [] }
					skipPress={ this.showSkipOrderAlert }
					isLoading={ this.state.isMounted && this.props.isLoading.BroadcastingContainer }
					hasReturn={ this.props.newOrder && this.props.newOrder.has_return ?  this.props.newOrder.has_return : null }
					price={ price }
					acceptOrder={ this.acceptOrder }
					message={ G.broadcastingMessage }
					transportType={ this.props.newOrder && this.props.newOrder.transport_type }
					progress={ this.state.progress.toString() }
					subsidy={ this.props.newOrder && this.props.newOrder.subsidy }
				/>
	}

}

const mapStateToProps = ( state ) =>
{
	return {
		newOrder: state.order.newOrder,
		order: state.order.order,
		isLoading: state.loading,
		lastPosition: state.location && state.location.lastPosition ? state.location.lastPosition : {}
	}
}

const mapDispatchToProps = ( dispatch ) =>
{
	return bindActionCreators( 
		{
			skipOrderAction: ActionCreators.skipOrderAction,
			sentExOrderAction: ActionCreators.sentExOrderAction
		}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( BroadcastingContainer );