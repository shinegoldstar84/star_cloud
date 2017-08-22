import React 						from 'react';
import PropTypes					from 'prop-types';
import { connect }					from 'react-redux';
import { addNavigationHelpers }		from 'react-navigation';
import { AppNavigator } 			from './routes';

const AppWithNavigationState = ( { dispatch, nav } ) =>
(
	<AppNavigator navigation={ addNavigationHelpers( { dispatch, state: nav } ) } />
);

AppWithNavigationState.propTypes = {
	dispatch: PropTypes.func.isRequired,
	nav: PropTypes.object.isRequired
}


const mapStateToProps = ( state ) =>
{
	return {
		nav: state.nav
	}
}

export default connect( mapStateToProps )( AppWithNavigationState );
