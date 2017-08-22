import React from 'react';
import { 
	View,
	StyleSheet,
} from 'react-native';
import AloList 				from '../../custom/AloList';
import Text 				from '../../custom/Text';
import Icon 				from '../../custom/Icon';
import Address 				from '../../custom/Address/index';
import Card 				from '../../custom/Card';
import Button 				from '../../custom/Button';
import {
	PaddingStyles,
	BorderRadiusStyles
} from '../../config/styles';
import { GetColor } 		from '../../custom/Utils/color';
import { persianDate } 		from '../../lib/PersianDate';
import { currencyFormat }	from '../../lib/Helpers';

export default function History( props )
{
	return (
		<AloList
			items={ props.items }
			renderItem={ ( { item } ) => { return getRowItem( item, props.onPress ) } }
			lazyLoad={ props.lazyLoad }
			isLoading={props.isLoading}
			indicatorColor="#fff"
		/>
	);
}

function getRowItem( item, onPress )
{
	return (
		<View style={ styles.container }>
			<Card isLight>
				<View role="header" headerStyles={ PaddingStyles.none }>
					<View style={{ flex: 1 }}>
						<View style={{ flex: 1, flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15, paddingVertical: 7, borderBottomWidth: 1, borderBottomColor: GetColor('gray-e') }}>
							<View style={{ flexDirection: 'row', alignItems: 'center' }}>
								<Icon name="calendar" color={GetColor('gray-c')} style={{ marginRight: 5 }} />
								<Text color={GetColor('navy-b')}>{ item.created_at ? ( persianDate.PersianCalendar( item.created_at ) + '  ' + persianDate.getTime( item.created_at ) ) : '-' }</Text>
							</View>
							<View style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
								<Text color={GetColor('navy-b')} isLatin style={{ marginTop: -5 }}>{ item.invoice_number }</Text>
								<Text color={GetColor('gray-c')} style={{ marginRight: 2 }}>#</Text>
								<Icon name="dot" size="small" color={ GetColor( ['finished', 'delivered'].indexOf( item.status ) > -1  ? 'green-a' : 'red-a' ) } style={{ marginRight: 3 }} />
							</View>
						</View>
						<View style={{ flex: 1, flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
							<View style={[ styles.info__col, { borderBottomWidth: 1, borderBottomColor: GetColor('gray-e') } ]}>
								<Text color={GetColor('gray-c')} size="large">هزینه حمل</Text>
								<Text style={{ marginTop: -5 }}>
									<Text size="large" color={GetColor('navy-a')}>{ currencyFormat(item.nprice ? item.nprice : item.price) }</Text>
									<Text color={GetColor('gray-c')}> تومان</Text>
								</Text>
							</View>
							<View style={[ styles.info__col, { borderBottomWidth: 1, borderBottomColor: GetColor('gray-e') } ]}>
								<Text color={GetColor('gray-c')} size="large">برگشت</Text>
								<Text color={GetColor('navy-a')} size="large" style={{ marginTop: -5 }}>{ item.has_return ? 'دارد' : 'ندارد' }</Text>
							</View>
							<View style={ styles.info__col }>
								<Text color={GetColor('gray-c')} size="large">طرف پرداخت</Text>
								<Text color={GetColor('navy-a')} size="large" style={{ marginTop: -5 }}>{ item.pay_at_dest ? 'مقصد' : 'مبدا' }</Text>
							</View>
							<View style={[ styles.info__col, { borderLeftWidth: 0 } ]}>
								<Text color={GetColor('gray-c')} size="large">نوع پرداخت</Text>
								<Text color={GetColor('navy-a')} size="large" style={{ marginTop: -5 }}>{ item.credit ? 'اعتباری' : 'نقدی' }</Text>
							</View>
						</View>
					</View>
				</View>
				<View role="body" style={ PaddingStyles.none }>
					{
						<View style={{ padding: 15 }}>
							{
								item.addresses && item.addresses.map( addr =>
								{
									return (
										<Address key={ addr.id } type={addr.type == 'destination' ? addr.type : 'origin'} data={{ address: addr.address}} />
									);
								})
							}
						</View>
					}
					<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: GetColor('gray-f'), paddingVertical: 5, paddingHorizontal: 15 }}>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<Icon name={ item.transport_type === 'cargo' ? 'delivery-pickup' : ( item.transport_type === 'motorbike' ? 'delivery-bike' : 'taxi-bike' ) } size="xxxlarge" color={GetColor('gray-c')} style={{ marginRight: 3 }} />
							<Text color={GetColor('navy-b')}>{ item.customer && item.customer.firstname + ' ' + item.customer.lastname }</Text>
						</View>
						<Text color={GetColor('navy-b')}>{ item.customer && item.customer.phone }</Text>
					</View>
				</View>
				<View role="footer">
					<Button 
						title="مشاهده جزئیات"
						onPress={ () => onPress( item.id ) }
						color={ GetColor('white') }
						background={ GetColor('blue-a') }
						padding="large"
						radius="few"
						size="xxlarge"
						wide
					/>
				</View>
			</Card>
		</View>
	);
}

const styles = StyleSheet.create(
{
	container: {
		flex: 1,
		backgroundColor: GetColor('navy-b'),
	},
	info__col: {
		width: '50%',
		paddingHorizontal: 10,
		paddingVertical: 0,
		// flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		borderLeftWidth: 1,
		borderLeftColor: GetColor('gray-e')
	}
});