import React 					from 'react';
import Dashboard 				from './Dashboard';
import { ActionCreators }		from '../../actions';
import { bindActionCreators }	from 'redux';
import { connect }				from 'react-redux';
import { navigationService }	from '../../lib/NavigationService';
import { DeviceEventEmitter }	from 'react-native';
import BgGeo					from '../../lib/BgGeo';
import G 						from '../../lib/G';
import Api 						from '../../lib/Api';

class DashboardContainer extends React.Component
{

	componentWillMount() 
	{
		this.props.fetchUserInfo( 'rates_avg', 'DashboardContainer' );
		DeviceEventEmitter.addListener( 'navigation:on:dashboard', () =>
		{
			this.forceUpdate();
		})
		DeviceEventEmitter.addListener('user:on:logout', () =>
		{
			clearInterval(this.intervalId);
		})
		this.fetchCurrentAddress();
		this.setUpdater();
	}

	setUpdater()
	{
		this.intervalId = setInterval(() =>
		{
			this.props.fetchUserInfo( 'rates_avg', null );
		}, 60 * 1000 );
	}

	fetchCurrentAddress = () =>
	{
		navigator.geolocation.getCurrentPosition( ( { coords } ) =>
		{
			this.props.getCurrentAddress( coords.latitude, coords.longitude );
		}, err => {}, {timeout: 5000, enableHighAccuracy: true});
	}

	
	render()
	{
		return <Dashboard
					credit={ this.props.user ? this.props.user.credit : 0 }
					rate={ this.props.user ? this.props.user.rates_avg : 0 }
					longPress={ this.props.changeStatusAction }
					isLoading={ this.props.isLoading.DashboardContainer }
					status={ this.props.isOnline }
					t1Press={ () => { 
							this.props.clean();
							navigationService.navigate( 'Transactions' ) 
						}
					}
					t2Press={ () => { navigationService.navigate( 'Heatmap' ) } } 
					t3Press={ () => { this.props.navigation.navigate( 'Rating' ) } }
					t4Press={ () => {
						this.props.clean();
						navigationService.navigate( 'History' ) 
						} 
					}
					isConnected={ this.props.isConnected }
					isLocationEnabled={ this.props.isLocationEnabled }
					currentAddress={ this.props.currentAddress }
					refreshAddress={ this.fetchCurrentAddress }
					isLocationLoading={ this.props.isLocationLoading }
			 	/>
	}

}

const mapDispatchToProps = ( dispatch ) =>
{
	return bindActionCreators( 
		{
			changeStatusAction : ActionCreators.changeStatusAction,
			fetchUserInfo: ActionCreators.showProfile,
			getCurrentAddress: ActionCreators.getCourierCurrentAddress,
			clean: ActionCreators.emptyAll
		}, dispatch );
}

const mapStateToProps = ( state ) =>
{
	return {
		user: state.auth.user,
		isLoading: state.loading,
		isOnline: state.location.isOnline,
		isConnected: state.location.networkConnected,
		isLocationEnabled: state.location.locationEnabled,
		currentAddress: state.location.currentAddress,
		isLocationLoading: state.loading.LocationLoading,
	}
}


export default connect( mapStateToProps, mapDispatchToProps )( DashboardContainer );