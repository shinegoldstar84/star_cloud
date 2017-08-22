import React 					from 'react';
import Heatmap 					from './Heatmap';
import { connect }				from 'react-redux';
import { bindActionCreators } 	from 'redux';
import { ActionCreators }		from '../../actions';

class HeatmapContainer extends React.Component
{

	constructor(props) 
	{
		super(props);
		this.state={ max: 0, filter: '' };
	}

	componentWillMount() 
	{
		this.props.getAll()
			.then( () =>
				{
					if ( this.props.heatmapData )
					{
						let totalCount =  this.props.heatmapData.map( item =>
						{
							return item.count;
						});
						this.setState(
							{
								max: Math.round( Math.max( ...totalCount ) * 1.2 )
							});
					}
				});	
	}

	filterData = ( hour ) =>
	{
		this.setState(
		{
			filter: hour
		})
	}

	filter = () =>
	{
		this.props.getAll( this.state.filter )
			.then( () =>
				{
					if ( this.props.heatmapData )
					{
						let totalCount =  this.props.heatmapData.map( item =>
						{
							return item.count;
						});
						this.setState(
							{
								max: Math.round( Math.max( ...totalCount ) * 1.2 )
							});
					}
				});	
	}

	render()
	{
		return <Heatmap 
					data={ this.props.heatmapData }
					isLoading={ this.props.isLoading }
					max={ this.state.max } 
					filterChange={ this.filterData }
					filter={ this.filter }
					selectedFilter={ this.state.filter }
				/>
	}

}

const mapStateToProps = ( state ) =>
{
	return {
		heatmapData: state.heatmap && state.heatmap.heatmapData,
		isLoading: state.loading.HeatmapContainer
	}
}

const mapDispatchToProps = ( dispatch ) =>
{
	return bindActionCreators(
	{
		getAll: ActionCreators.fetchPolygons
	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( HeatmapContainer );