import React 					from 'react';
import { View } 				from 'react-native';
import { TabNavigator }			from 'react-navigation';
import { WeightStyles }			from '../config/styles';
import { GetColor }				from './Utils/color';
import DashboardContainer 		from '../components/Dashboard/DashboardContainer';
import CreditContainer 			from '../components/Credit/CreditContainer';
import RatingContainer			from '../components/Rating/RatingContainer';
import RewardContainer			from '../components/Reward/RewardContainer';
import ScoreContainer			from '../components/Score/ScoreContainer';
import LeaderboardContainer		from '../components/Leaderboard/LeaderboardContainer';
import ProfileContainer			from '../components/Profile/ProfileContainer';
import Icon 					from './Icon';
import { connect }				from 'react-redux';


class TabNavComponent extends React.Component
{
	constructor ( props )
	{
		super( props );
		this.rewardNavigator = TabNavigator(
		{
			Leaderboard: {
				screen: LeaderboardContainer,
				navigationOptions: {
					tabBarLabel: 'سفیران برتر'
				}
			},
			Reward: {
				screen: RewardContainer,
				navigationOptions: {
					tabBarLabel: 'جایزه'
				}
			},
			/*Score: {
				screen: ScoreContainer,
				navigationOptions: {
					tabBarLabel: 'جزئیات امتیاز'
				}
			},*/
		}, {
			lazy: true,
			initialRouteName: 'Leaderboard',
			tabBarOptions:
			{
				activeTintColor: '#19A4E1',
				style:
				{
					backgroundColor: GetColor('navy-a'),
				},
				indicatorStyle:
				{
					backgroundColor: '#19A4E1',
				},
				labelStyle:
				{
					...WeightStyles.normal,
					fontSize: 15
				},
				tabStyle:
				{
					borderBottomWidth: 2,
					borderBottomColor: GetColor('gray-a', 0.5)
				}
			}
		})
		this.tabNav = TabNavigator(
		{
			Dashboard: {
				screen: props => <DashboardContainer {...props} />,
				navigationOptions: {
					tabBarLabel: 'خانه',
					tabBarIcon: ({ tintColor }) => (
						<Icon name={ this.props.user && this.props.user.courier && this.props.user.courier.transport_types.split( ',' ).indexOf( 'cargo' ) > -1 ? 'delivery-pickup' : 'delivery-bike'  } size={24} />
					)
				}
			},
			Credit: {
				screen: CreditContainer,
				navigationOptions: {
					tabBarLabel: 'درآمد',
					tabBarIcon: ({ tintColor }) => (
						<Icon name='chart-rotated' color='white' size={24} />
					)
				}
			},
			Rating: {
				screen: RatingContainer,
				navigationOptions: {
					tabBarLabel: 'امتیاز',
					tabBarIcon: ({ tintColor }) => (
						<Icon name='star-rounded' color='white' size={24} />
					)
				}
			},
			Reward: {
				screen: this.rewardNavigator,
				navigationOptions: {
					tabBarLabel: 'جایزه',
					tabBarIcon: ({ tintColor }) => (
						<Icon name='gift' color='white' size={24} />
					)
				}
			},
			Profile: {
				screen: props => <ProfileContainer { ...this.props } />,
				navigationOptions: {
					tabBarLabel: 'پروفایل',
					tabBarIcon: ({ tintColor }) => (
						<Icon name='person' color='white' size={24} />
					)
				}
			}
		},
		{
			showIcon: true,
			tabBarPosition: 'bottom',
			// order: [ 'Profile', 'Reward', 'Rating', 'Credit', 'Dashboard' ],
			initialRouteName: 'Dashboard',
			lazy: true,
			tabBarOptions:
			{
				showIcon: true,
				activeTintColor: '#19A4E1',
				style:
				{
					backgroundColor: '#2F3641',
					// height: 300
				},
				indicatorStyle:
				{
					backgroundColor: '#19A4E1',
				},
				labelStyle:
				{
					...WeightStyles.normal,
					fontSize: 16
				},
				tabStyle:
				{
					borderTopWidth: 2,
					borderTopColor: GetColor('gray-a', 0.5),
					padding: 0,
				}
			}
		});
	}

	render()
	{
		let TabNav = this.tabNav;
		return ( <View style={ { flex: 1, backgroundColor: GetColor('navy-b') } }><TabNav /></View> );
	}
}

const mapStateToProps = ( state ) =>
{
	return {
		user: state.auth.user,
	}
}

export default connect( mapStateToProps )( TabNavComponent );