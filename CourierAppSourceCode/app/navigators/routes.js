import React 					from 'react';
import {
	TabNavigator,
	StackNavigator
}	from 'react-navigation';
import { WeightStyles,
		BoxShadowStyles
}								from '../config/styles';
import { 
	Image,
	Animated,
	Easing
}								from 'react-native';
import LoginContainer 			from '../components/Login/LoginContainer';
import WalkthroughContainer		from '../components/Walkthrough/WalkthroughContainer';
import AppContainer 			from '../AppContainer';
import VerificationContainer 	from '../components/Verification/VerificationContainer';
import BroadcastingContainer	from '../components/Broadcasting/BroadcastingContainer';
import TransactionsContainer	from '../components/Transactions/TransactionsContainer';
import HistoryContainer			from '../components/History/HistoryContainer';
import SingleHistoryContainer	from '../components/SingleHistory/SingleHistoryContainer';
import AccountContainer			from '../components/Account/AccountContainer';
import HeatmapContainer			from '../components/Heatmap/HeatmapContainer';
import HandleAddressContainer	from '../components/HandleAddress/HandleAddressContainer';
import ArriveAddressContainer	from '../components/ArriveAddress/ArriveAddressContainer';
import SignatureContainer		from '../components/Signature/SignatureContainer';
import BanWarningContainer		from '../components/BanWarning/BanWarningContainer';
import BanContainer				from '../components/Ban/BanContainer';
import TopupContainer			from '../components/Topup/TopupContainer';
import { GetColor }				from '../custom/Utils/color';
import CloseHeader 				from '../custom/CloseHeader';
import TitleBackHeader			from '../custom/TitleBackHeader';
import Header					from '../custom/Header';
import TabNavComponent			from '../custom/TabNavComponent';

export const AppNavigator = StackNavigator(
{
	App: {
		screen: AppContainer,
		navigationOptions: {
			header: () => { visible: false }
		}
	},
	Walkthrough: {
		screen: WalkthroughContainer,
		navigationOptions: {
			header: () => { visible: false }
		}
	},
	Login: {
		screen: LoginContainer,
		navigationOptions: {
			title: 'ورود ',
			header: TitleBackHeader
		}
	},
	Verify: {
		screen: VerificationContainer,
		navigationOptions: {
			title: 'تایید تلفن همراه',
			header: TitleBackHeader,
		}
	},
	Main: {
		screen: TabNavComponent,
		navigationOptions: {
			header: () => { visible: false }
		}
	},
	Broadcasting: {
		screen: BroadcastingContainer,
		navigationOptions: {
			header: () => { visible: false }
		}
	},
	Transactions: {
		screen: TransactionsContainer,
		navigationOptions: {
			title: 'جزئیات درآمد',
			header: TitleBackHeader,
		}
	},
	History: {
		screen: HistoryContainer,
		navigationOptions: {
			title: 'لیست سفرها',
			header: TitleBackHeader,
		}
	},
	Account: {
		screen: AccountContainer,
		navigationOptions: {
			title: 'شماره شبا',
			header: TitleBackHeader,
		}
	},
	Heatmap: {
		screen: HeatmapContainer,
		navigationOptions: {
			title: 'مناطق پر درخواست',
			header: TitleBackHeader,
		}
	},
	SingleHistory: {
		screen: SingleHistoryContainer,
		navigationOptions: {
			title: 'جزئیات سفر',
			header: TitleBackHeader,
		}
	},
	HandleAddress: {
		screen: HandleAddressContainer,
		navigationOptions: {
			header: () => { visible: false }
		}
	},
	ArriveAddress: {
		screen: ArriveAddressContainer,
		navigationOptions: {
			header: () => { visible: false }
		}
	},
	Signature: {
		screen: SignatureContainer,
		navigationOptions: ({navigation}) => ({
			title: 'امضا',
			header: TitleBackHeader,
			backNav: navigation.state.params.backNav
			// callToCustomer: navigation.state.params.phone
		})
	},
	BanWarning: {
		screen: BanWarningContainer,
		navigationOptions: {
			header: CloseHeader
		}
	},
	Ban: {
		screen: BanContainer,
		navigationOptions: {
			header: () => { visible: false }
		}
	},
	Topup: {
		screen: TopupContainer,
		navigationOptions: {
			title: 'افزایش اعتبار',
			header: TitleBackHeader,
		}
	}
}, 
{
	transitionConfig: () => (
		{
		  transitionSpec: {
		    duration: 0,
		    timing: Animated.timing,
		    easing: Easing.step0
		  }
		}
	)
});