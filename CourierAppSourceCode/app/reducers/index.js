import { combineReducers }		from 'redux';
import nav						from './navReducer';
import { authReducer }			from './authReducer';
import  loadingReducer			from './loadingReducer';
import { locationReducer }		from './locationReducer';
import { newOrderReducer }		from './orderReducer';
import { transactionsReducer }	from './transactionsReducer';
import { historyReducer }		from './historyReducer';
import { positionReducer }		from './positionReducer';
import { leaderboardReducer }	from './leaderboardReducer';
import { accountReducer }		from './accountReducer';
import { heatmapReducer }		from './heatmapReducer';
import { connectivityReducer }	from './connectivityReducer';
import { scoreReducer }			from './scoreReducer';

export default combineReducers( 
	{
		nav: nav,
		auth: authReducer,
		loading: loadingReducer,
		location: locationReducer,
		order: newOrderReducer,
		transactions: transactionsReducer,
		history: historyReducer,
		position: positionReducer,
		leaderboard: leaderboardReducer,
		account: accountReducer,
		heatmap: heatmapReducer,
		connectivity: connectivityReducer,
		score: scoreReducer
	});