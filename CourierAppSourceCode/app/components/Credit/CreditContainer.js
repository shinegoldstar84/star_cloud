import React 						from 'react'
import { Text }						from 'react-native';
import Credit 						from './Credit';
import { connect }					from 'react-redux';
import { bindActionCreators }		from 'redux';
import { ActionCreators }			from '../../actions';
import { persianDate }				from '../../lib/PersianDate';
import { navigationService }		from '../../lib/NavigationService';

class CreditContainer extends React.Component
{

	constructor(props) 
	{
		super(props);
		this.state = {
			summaryData: [],
			onlineSummaryData: [],
			dailyIncome: 0,
			weeklyIncome: 0,
			monthlyIncome: 0,
		}
	}

	componentWillMount() 
	{
		this.props.getUserCredit();	
		this.props.getTransactions()
			.then( () =>
			{
				this.transactionsSummaryData( 'day', 'transactionsSummary' );
				this.getIncomeStat();
			})
		this.props.getOnlineSummary()
			.then( () =>
			{
				this.transactionsSummaryData( 'day', 'onlineSummary' );
			})
	}

	transactionsSummaryData = ( type, prop ) =>
	{
		if ( type && prop )
		{
			let summary = this.props[prop];
			if ( summary && summary[ type ] )
			{
				this.keys = Object.keys( summary[ type ] );
				this.values = this.keys.map( value =>
				{
					return parseInt( summary[ type ][ value ] );
				});
				this.keys = this.keys.map( ( key, index ) =>
				{
					if ( type == 'day' )
					{
						return persianDate.persianDayName( key );
					}
					else if ( type == 'month' )
					{
						return persianDate.persianMonthName( key );
					}
					else if ( type == 'week' )
					{
						return index == 0 ? 'این هفته' : index + ' هفته قبل';
					}
					else
					{
						return key;
					}
				});
				// this.setState(
				// {
				// 	dailyIncome: this.props.transactionsSummary[ 'day' ]
				// })
				this.setState(
				{
					dailyIncome: this.props.transactionsSummary && this.props.transactionsSummary.day ? this.props.transactionsSummary.day[ Object.keys( this.props.transactionsSummary.day )[0] ] : 0,
					weeklyIncome: this.props.transactionsSummary && this.props.transactionsSummary.week ? this.props.transactionsSummary.week[ Object.keys( this.props.transactionsSummary.week )[0] ] : 0,
					monthlyIncome: this.props.transactionsSummary && this.props.transactionsSummary.month ? this.props.transactionsSummary.month[ Object.keys( this.props.transactionsSummary.month )[0] ] : 0,
				})
				this.summaryData = [];
				for ( let i in this.keys )
				{
					this.summaryData.push(
						[
							this.keys[ i ],
							this.values[ i ],
						]);
				}
				this.setState(
				{
					[ prop === 'transactionsSummary' ? 'summaryData' : 'onlineSummaryData' ]: this.summaryData
				})
			}
		}
	}

	getIncomeStat = ( type = 'day' ) =>
	{
		if ( this.props.transactionsSummary && this.props.transactionsSummary[ type ] )
		{
			let income =  parseInt( 
					this.props.transactionsSummary
					[type]
					[ Object.keys( this.props.transactionsSummary[type] )[0] ]
			);
			this.setState(
			{
				incomeStat: income
			})
		}
		return -1;
	}

	goToTransactionPage = () =>
	{
		navigationService.navigate( 'Transactions' );
	}

	topup = () =>
	{
		navigationService.navigate('Topup');
	}

	render()
	{
		return <Credit 
					credit={ this.props.user.credit }
					isLoading={ this.props.isLoading.CreditContainer }
					transactionCallback={ this.goToTransactionPage }
					summaryData={ this.state.summaryData }
					onlineSummaryData={ this.state.onlineSummaryData }
					changeFilter={ this.transactionsSummaryData }
					incomeStat={ this.state.incomeStat }
					changeIncomeFilter={ this.getIncomeStat }
					dailyIncome={ this.state.dailyIncome }
					weeklyIncome={ this.state.weeklyIncome }
					monthlyIncome={ this.state.monthlyIncome }
					topup={this.topup}
				/>
	}


}

const mapStateToProps = ( state ) =>
{
	return {
		user: state.auth.user ? state.auth.user : {},
		transactionsSummary: state.transactions.summary ? state.transactions.summary : {},
		onlineSummary: state.position && state.position.summary ? state.position.summary : {},
		isLoading: state.loading
	}
}

const mapDispatchToProps = ( dispatch ) =>
{
	return bindActionCreators( 
	{
		getUserCredit: ActionCreators.getUserCreditAction ,
		getTransactions: ActionCreators.getTransactionSummary,
		getOnlineSummary: ActionCreators.getOnlineSummaryAction
	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( CreditContainer );