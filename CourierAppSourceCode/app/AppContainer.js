import React 					from 'react';
import { connect }				from 'react-redux';
import { ActionCreators }		from './actions';
import { bindActionCreators }	from 'redux';
import SplashScreenContainer	from './components/SplashScreen/SplashScreenContainer';

const mapDispatchToProps = ( dispatch ) =>
{
	return bindActionCreators( ActionCreators, dispatch );
}

class AppContainer extends React.Component
{
	render()
	{
		return <SplashScreenContainer { ...this.props } />
	}
}

export default connect( () => { return {} }, mapDispatchToProps )( AppContainer );