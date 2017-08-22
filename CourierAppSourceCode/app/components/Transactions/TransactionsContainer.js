import React 					from 'react';
import Transactions 			from './Transactions';
import { ActionCreators }		from '../../actions';
import { bindActionCreators }	from 'redux';
import { connect }				from 'react-redux';

class TransactionsContainer extends React.Component
{

	componentWillMount() 
	{
		this.transactionTypes = {
			'deposit'        : 'افزایش اعتبار',
			'withdraw'       : 'برداشت',
			'coupon'         : 'کوپن تخفیف',
			'commission'     : 'کمیسیون',
			'referral'       : 'هدیه معرفی',
			'register-prize' : 'هدیه ثبت‌نام',
			'income'         : 'درآمد',
			'debit'          : 'بدهی',
		};
		this.paginate();
	}

	paginate = () =>
	{
		let page = this.props.transactions.page ? this.props.transactions.page + 1 : 1;
		let totalPages = this.props.transactions.totalPages ? this.props.transactions.totalPages : 1;
		if ( page != this.props.transactions.page && page <= totalPages )
		{
			this.props.getAll( page );
		}
	}

	persianType = ( type ) =>
	{
		return type ? this.transactionTypes[ type ] : '';
	}

	render()
	{
		return <Transactions 
					items={ this.props.transactions ? this.props.transactions.items : [] }
					lazyLoad={ this.paginate }
					convert={ this.persianType }
					isLoading={ this.props.isLoading }
				/>
	}


}

const mapStateToProps = ( state ) =>
{
	return {
		transactions: state.transactions,
		isLoading: state.loading.TransactionContainer
	}
}


const mapDispatchToProps = ( dispatch ) =>
{
	return bindActionCreators( 
	{
		getAll: ActionCreators.getAllTransactionsAction
	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( TransactionsContainer );