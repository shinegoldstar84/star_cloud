import React 						from 'react';
import Rating 						from './Rating';
import { bindActionCreators }		from 'redux';
import { ActionCreators }			from '../../actions';
import { connect }					from 'react-redux';

class RatingContainer extends React.Component
{

	componentWillMount() 
	{
		this.props.loadUserData();
		this.props.fetchUserInfo( 'rates_avg', 'RatingContainer' );
	}

	render()
	{
		return <Rating
					rate={ parseFloat( this.props.user.rates_avg ).toFixed( 2 ) }
					ordersCount={ this.props.user.orders_count ? this.props.user.orders_count : 0 } 
					rates5Count={ this.props.user.rates_5_count ? this.props.user.rates_5_count : 0 }
				 />
	}

}

const mapStateToProps = ( state ) =>
{
	return {
		user: state.auth.user ? state.auth.user : {}
	}
}

const mapDispatchToProps = ( dispatch ) =>
{
	return bindActionCreators(
	{
		loadUserData: ActionCreators.getUserCreditAction,
		fetchUserInfo: ActionCreators.showProfile,
	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( RatingContainer );