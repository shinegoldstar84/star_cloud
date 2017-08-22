import React 					from 'react';
import Score 					from './Score';
import { bindActionCreators }	from 'redux';
import { ActionCreators }		from '../../actions';
import { connect }				from 'react-redux';
import SendIntentAndroid		from 'react-native-send-intent';
import G 						from '../../lib/G';
import { Linking }				from 'react-native';

class ScoreContainer extends React.Component
{

	componentWillMount() 
	{
		this.props.fetchScoreData();
	}

	render()
	{
		return <Score 
					score={ this.props.score }
				/>
	}

}

const mapStateToProps = ( state ) =>
{
	return {
		score: state.score ? state.score : {}
	}
}

const mapDispatchToProps = ( dispatch ) =>
{
	return bindActionCreators(
	{
		fetchScoreData: ActionCreators.getScoreAction,
	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( ScoreContainer );