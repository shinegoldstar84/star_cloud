import React 						from 'react';
import { connect }					from 'react-redux';
import { bindActionCreators }		from 'redux';
import { ActionCreators }			from '../../actions';
import SingleHistory 				from './SingleHistory';

class SingleHistoryContainer extends React.Component
{

	componentWillMount() 
	{
		const { state }	= this.props.navigation;
		this.props.get( state.params.id );
	}

	render()
	{
		return <SingleHistory
					invoice_number={ this.props.item ? this.props.item.invoice_number : '' }
					launched_at={ this.props.item ? this.props.item.launched_at : '' }
					created_at={ this.props.item ? this.props.item.created_at : '' }
					screenshot={ this.props.item && this.props.item.screenshot ? this.props.item.screenshot.url : '' }
					customer={ this.props.item && this.props.item.customer ? this.props.item.customer : {} }
					price={ this.props.item ? this.props.item.price : '' }
					nprice={ this.props.item ? this.props.item.nprice : false }
					subsidy={ this.props.item ? this.props.item.subsidy : '' }
					has_return={ this.props.item ? this.props.item.has_return : ''  }
					pay_at_dest={ this.props.item ? this.props.item.pay_at_dest : '' }
					delay={ this.props.item ? this.props.item.delay : '' }
					credit={ this.props.item ? this.props.item.credit : '' }
					addresses={ this.props.item && this.props.item.addresses ? this.props.item.addresses : {} }
					signature={ this.props.item && this.props.item.signature ? this.props.item.signature : {} }
					isLoading={ this.props.isLoading.SingleHistoryContainer }
					transportType={ this.props.item && this.props.item.transport_type }
					created_at={this.props.item ? this.props.item.created_at : ''}
				/>
	}

}

const mapStateToProps = ( state ) =>
{
	return {
		item: state.history && state.history.singleHistory,
		isLoading: state.loading
	}
}

const mapDispatchToProps = ( dispatch ) =>
{
	return bindActionCreators( { get: ActionCreators.getSingleHistoryAction }, dispatch );
}


export default connect( mapStateToProps, mapDispatchToProps )( SingleHistoryContainer );