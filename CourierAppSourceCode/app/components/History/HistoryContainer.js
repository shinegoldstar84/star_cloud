import React 						from 'react';
import History 						from './History';
import { connect }					from 'react-redux';
import { bindActionCreators }		from 'redux';
import { ActionCreators }			from '../../actions';
import { View }						from 'react-native';
class HistoryContainer extends React.Component
{

	componentWillMount() 
	{
		this.paginate();
	}

	paginate = () =>
	{
		let page = this.props.history.page + 1 ? this.props.history.page + 1 : 1;
		let total = this.props.history.totalPages ?  this.props.history.totalPages : 1;
		if ( page <= total )
		{
			this.props.getAll( page );
		}
	}

	goToSingleHistoryPage = ( id ) =>
	{
		this.props.navigation.navigate( 'SingleHistory', { id } )
	}

	render()
	{
		return(
			<View style={{ backgroundColor: '#2f3641', flex: 1 }}>
				<History 
						isLoading={ this.props.isLoading.HistoryContainer }
						items={ this.props.history ? this.props.history.items : [] }
						lazyLoad={ this.paginate }
						onPress={ this.goToSingleHistoryPage }
					/>
			</View>
		);
	}


}


const mapStateToProps = ( state ) =>
{
	return {
		history: state.history,
		isLoading: state.loading
	}
}

const mapDispatchToProps = ( dispatch ) =>
{
	return bindActionCreators(
	{
		getAll: ActionCreators.getAllHistoryAction
	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( HistoryContainer );