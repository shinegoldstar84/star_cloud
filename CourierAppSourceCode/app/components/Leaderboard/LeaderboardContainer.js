import React 					from 'react';
import Leaderboard 				from './Leaderboard';
import { connect }				from 'react-redux';
import { bindActionCreators }	from 'redux';
import { ActionCreators }		from '../../actions';
import { InteractionManager }   from 'react-native';

class LeaderboardContainer extends React.Component
{

	constructor(props)
	{
		super(props);
		this.state = {
			ready: false
		};
	}

	componentWillMount() 
	{
		this.props.fetchLeaderboardData()
			.then( () =>
				{
					this.props.leaderboard = this.props.leaderboard.filter( u =>
					{
						return u.id != this.props.user.id
					})
				});
		this.props.fetchUserLeaderboard();
	}

	componentDidMount()
	{
		InteractionManager.runAfterInteractions(() => {
			setTimeout(() => this.setState({ ready: true }), 2000);			
		})
	}

	showDetail ( userId )
	{

	}

	render()
	{
		return <Leaderboard 
					user={ this.props.user }
					userData={ this.props.userData }
					items={ this.props.leaderboard }
					name={ this.props.user ? this.props.user.firstname+' '+this.props.user.lastname : '' }
					navigation={ this.props.navigation }
					showDetail={ this.showDetail }
					isLoading={ this.props.isLoading || ! this.state.ready }
				/>
	}

}

const mapStateToProps = ( state ) =>
{
	return {
		user: state.auth && state.auth.user ? state.auth.user : {},
		leaderboard: state.leaderboard && state.leaderboard.items ? state.leaderboard.items : {},
		userData: state.leaderboard && state.leaderboard.userData ? state.leaderboard.userData : {},
		isLoading: state.loading && typeof state.loading.LeaderboardContainer !== 'undefined' ? state.loading.LeaderboardContainer : true
	}
}

const mapDispatchToProps = ( dispatch ) =>
{
	return bindActionCreators(
	{
		fetchLeaderboardData: ActionCreators.getLeaderboardAction,
		fetchUserLeaderboard: ActionCreators.fetchUserLeaderboardAction
	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( LeaderboardContainer );