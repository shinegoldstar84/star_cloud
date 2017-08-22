import React 		from 'react';
import {
	View,
	StyleSheet,
}	from 'react-native';
import { persianDate } 	from '../../lib/PersianDate';
import AloList 			from '../../custom/AloList';
import Text 			from '../../custom/Text';
import { GetColor }		from '../../custom/Utils/color';

export default function Transactions( props )
{
	return(
		<View style={{backgroundColor: 'white', flex: 1}}>
			<AloList 
				items={ props.items }
				renderItem={ ( { item } ) => { return getRowItem( item, props.convert ) } }
				lazyLoad={ props.lazyLoad }
				header={ [ '#', 'نوع', 'مبلغ', 'تاریخ' ] }
				customStyle={{ backgroundColor: 'white' }}
				isLoading={props.isLoading}
			/>
		</View>
	)
}


function getRowItem( item, convert )
{
	return (
		<View style={ styles.row } >
			<Text align="center" color={ GetColor('navy-a') } style={ styles.col } size="small">{ item.id }</Text>
			<Text align="right" color={ GetColor('navy-a') } style={ styles.col }>{ item.title }</Text>
			<Text align="center" color={ item.amount < 0 ? GetColor('red-a') : GetColor('green-a') } style={ styles.col }>{ item.amount }</Text>
			<Text align="center" color={ GetColor('navy-a') } style={ styles.col }>{ persianDate.PersianCalendar( item.created_at ) }</Text>
		</View>
	);
}

const styles = StyleSheet.create(
{
	row: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 10,
		borderTopWidth: 1,
		borderTopColor: GetColor('gray-f')
	},
	col: {
		width: '25%',
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 5,
	},
	textColorGreen: {
		color: GetColor('green-a'),
	},
	textColorRed: {
		color: GetColor('red-a'),
	},
})