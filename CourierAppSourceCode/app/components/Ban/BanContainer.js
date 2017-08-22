import React 						from 'react';
import { connectivityService }		from '../../lib/ConnectivityService';
import Ban 							from './Ban';
import { connect }					from 'react-redux';
import { bindActionCreators }		from 'redux';
import { ActionCreators }			from '../../actions';

class BanContainer extends React.Component
{

	constructor( props )
	{
		super(props);
		this.state = { textToShow: '' }
	}

	componentWillMount() 
	{
		if ( this.props.banInfo )
		{
			this.setState(
			{
				textToShow: this.props.banInfo && this.props.banInfo.reason_text 
					? this.props.banInfo.reason_text
					: 'حساب شما مسدود شده است. لطفا با پشتیبانی تماس بگیرید.'
			})
		}
		else if ( this.props.paused )
		{
			this.setState(
			{
				textToShow: 'حساب کاربری شما موقتا مسدود شده است. برای جزئیات بیشتر لطفا با پشتیبانی تماس بگیرید.'
			})	
		}
	}

	retry = () =>
	{
		connectivityService.retry( this.props.lastPosition );
	}

	render()
	{
		return <Ban 
					text={ this.state.textToShow }
					retry={ this.retry }
					isLoading={ this.props.isLoading }
				/>
	}


}

const mapStateToProps = ( state ) =>
{
	return {
		banInfo: state.connectivity && state.connectivity.ban ? state.connectivity.ban : {},
		paused: state.connectivity && state.connectivity.hasOwnProperty( 'paused' ) ? state.connectivity.paused : false,
		lastPosition: state.location && state.location.lastPosition ? state.location.lastPosition : {},
		isLoading: state.loading.BanContainer
	}
}

export default connect( mapStateToProps )( BanContainer );