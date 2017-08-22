import React 					from 'react';
import BanWarning 				from './BanWarning';
import { connect }				from 'react-redux';
import { bindActionCreators }	from 'redux';
import { ActionCreators }		from '../../actions';
import { navigationService }	from '../../lib/NavigationService';
import G 						from '../../lib/G';

class BanWarningContainer extends React.Component
{

	constructor( props )
	{
		super(props);
		this.state = { warningsKey: [], banWarnings: {} };
	}

	componentWillMount() 
	{
		this.setState(
		{
			warningsKey: Object.keys( G.banWarnings ),
			banWarnings: G.banWarnings,
		})
	}

	close = () =>
	{
		navigationService.reset( 0, 'Main' );
	}

	render()
	{
		return <BanWarning 
					keys={ this.state.warningsKey }
					warnings={ this.state.banWarnings }
					onClose={ this.close }
				/>
	}

}

const mapStateToProps = ( state ) =>
{
	return {
		banWarnings: state.auth && state.auth.config && state.auth.config.ban ? state.auth.config.ban : {}
	}
}

export default connect( mapStateToProps )( BanWarningContainer );