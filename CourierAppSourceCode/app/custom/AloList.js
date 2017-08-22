
import React 	from 'react';
import {
	View,
	FlatList,
	StyleSheet,
	ActivityIndicator
}	from 'react-native';
import Text 				  from './Text';
import Icon 				  from './Icon';
import { GetColor } 		  from './Utils/color';
import { BorderRadiusStyles } from '../config/styles';

export default class AloList extends React.Component
{

	componentWillMount()
	{
		this.slideInDownCustom = {
			from: {
				translateY: 0
			},
			to: {
				translateY: 15
			},
		};
	}

	loadingIndicator = () =>
	{
		return this.props.isLoading ? 
				<ActivityIndicator 
					color={ this.props.indicatorColor ? this.props.indicatorColor : '#000' }
					style={{ marginBottom: 30 }}
				/>
				: <View style={[ this.props.bottomSpacerStyle ? this.props.bottomSpacerStyle : {}, { marginBottom: 30 } ]}></View>
	}

	header = () =>
	{
		return (
			<View>
			{
				this.props.header && Array.isArray( this.props.header ) 
				?	<View style={ styles.row }>
						{
								this.props.header.map( ( item, index ) =>
								{
									return <Text key={ index } color={GetColor('navy-f')} align="center" size="large" style={ styles.col }>{ item }</Text>
								})
						}
					</View>
				: 	<View></View>
			}
			</View>
		);
	}

	render()
	{
		return(
			<View style={ [ styles.container, this.props.style ] }>
				{
					this.props.items && this.props.items.length
					? 	<FlatList
							data={ this.props.items }
							renderItem={ this.props.renderItem }
							keyExtractor={ ( item, index ) => item.id ? item.id : index }
							initialNumToRender={ this.props.length }
							onEndReached={ this.props.lazyLoad }
							onEndReachedThreshold={ 0.2 }
							ListHeaderComponent={ this.header }
							ListFooterComponent={ this.loadingIndicator }
							style={[{ padding: 12 }, this.props.listStyle ? this.props.listStyle :{}]}
						/>
					: 
					(
						<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
							{
								!this.props.isLoading
								?	<View style={{ justifyContent: 'center', alignItems: 'center' }}>
										<View style={{ ...BorderRadiusStyles.few, justifyContent: 'center', alignItems: 'center', width: 320, maxWidth: '80%', padding: 25, backgroundColor: GetColor('navy-a') }}>
											{
												this.props.noResultIcon ?
												<Icon name={ this.props.noResultIcon } size={60} color={GetColor('blue-a')} style={{ marginBottom: 10 }} />
												: null
											}
											<Text style={[{ color: GetColor( this.props.nopeColor ? this.props.nopeColor : 'white' ) }, this.props.noResultTextStyle ? this.props.noResultTextStyle : {}]} size="large" align="center">{ this.props.noResultText ? this.props.noResultText : 'فعالیتی وجود ندارد.' }</Text>
										</View>
										{
											this.props.noResultArrow ?
											<Text>موردی یافت نشد.</Text>
											: null
										}
									</View>
								: (
									this.props.isLoading 
										? this.loadingIndicator()
										: null
								)
							}
						</View>
					)
				}
				
			</View>
		);
	}

}

const styles = StyleSheet.create(
{
	container: {
		flex: 1,
		flexDirection: 'row',
		// paddingVertical: 12,
	},
 	row: {
 		flex: 1,
		flexDirection: 'row-reverse',
		justifyContent: 'space-around',
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 10,
	},
	col: {
		width: '25%',
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 5,
 	},
})