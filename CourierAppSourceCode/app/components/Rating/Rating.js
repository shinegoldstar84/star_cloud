import React 		from 'react';
import {
	View,
	StyleSheet,
	ScrollView
} 					from 'react-native';
import Text 		from '../../custom/Text';
import Card 		from '../../custom/Card';
import Icon 		from '../../custom/Icon';
import StarRating 	from '../../custom/StarRating';
import { GetColor }	from '../../custom/Utils/color';
import {
	PaddingStyles
} from '../../config/styles';

export default function Rating( props )
{
	return (
		<View style={ styles.container }>
			<ScrollView contentContainerStyle={{ padding: 15 }}>
				<View style={ styles.center } >
					<View style={ styles.topBox } >
						<Text color='white' size='large' >میانگین امتیاز شما در سفرهای گذشته</Text>
						<Text color='white' style={{ fontSize: 40, marginTop: 20, marginBottom: 5 }} >{ ( parseInt( props.rate ) ? props.rate : '0' ) + ' / 5' }</Text>
					</View>
					<StarRating
						disabled={true}
						maxStars={5}
						rating={ parseInt( props.rate ? props.rate : 0 ) }
						starColor='#f8e71c'
						starSize={ 35 }
						buttonStyle={{ marginHorizontal: 5 }}
						iconSet="Alopeyk"
						fullStar="star-rounded"
						emptyStar="star-rounded"
						halfStar="star-rounded-half"
					/>
				</View>
				<View style={ [ styles.row, { justifyContent: 'center', marginTop: 30, marginBottom: 20 } ] }>
					<View style={ styles.infoBox }>
						<View style={ styles.infoHeader }>
							<Text color={ GetColor('white') } size="veryLarge" >{ props.ordersCount }</Text>
						</View>
						<View style={ styles.infoFooter }>
							<Text color={ GetColor('gray-d') }>تعداد سفرها</Text>
						</View>
					</View>
					<View style={ styles.infoBox }>
						<View style={ styles.infoHeader }>
							<Text color={ GetColor('white') } size="veryLarge" >{ props.rates5Count }</Text>
						</View>
						<View style={ styles.infoFooter }>
							<Text color={ GetColor('gray-d') }>۵ ستاره</Text>
						</View>
					</View>
				</View>
				<Card style={ styles.mt20 } isLight>
					<View role="body" style={{ ...PaddingStyles.none }}>
						<View style={ styles.items }>
							<View style={ styles.iconWrapper }>
								<Icon name="dot" color={ GetColor('gray-e') } size={ 14 } />
								<Icon name="dot" color={ GetColor('blue-a') } size={ 10 } style={{ position: 'absolute', left: 2, top: 2 }}/>
							</View>
							<Text color='black' size='medium'>خوش پوشی و روابط عمومی بالای شما در دریافت امتیاز بالاتر از مشتریان تاثیر بالایی دارد.</Text>
						</View>
						<View style={ styles.items }>
							<View style={ styles.iconWrapper }>
								<Icon name="dot" color={ GetColor('gray-e') } size={ 14 } />
								<Icon name="dot" color={ GetColor('blue-a') } size={ 10 } style={{ position: 'absolute', left: 2, top: 2 }}/>
							</View>
							<Text color='black' size='medium' >رساندن به موقع مرسولات به مشتریان می تواند به امتیازات شما بیافزاید.</Text>
						</View>
						<View style={ styles.items }>
							<View style={ styles.iconWrapper }>
								<Icon name="dot" color={ GetColor('gray-e') } size={ 14 } />
								<Icon name="dot" color={ GetColor('blue-a') } size={ 10 } style={{ position: 'absolute', left: 2, top: 2 }}/>
							</View>
							<Text color='black' size='medium'>در الوپیک همیشه حق با مشتری است و شما با رعایت این نکته می توانید امتیاز بیشتری دریافت کنید.</Text>
						</View>
						<View style={[ styles.items, { borderBottomWidth: 0 } ]}>
							<View style={ styles.iconWrapper }>
								<Icon name="dot" color={ GetColor('gray-e') } size={ 14 } />
								<Icon name="dot" color={ GetColor('blue-a') } size={ 10 } style={{ position: 'absolute', left: 2, top: 2 }}/>
							</View>
							<Text color='black' size='medium'>هر چه امتیاز شما بیشتر باشد می توانید از مزایای الوپیک استفاده بهتری کنید.</Text>
						</View>
					</View>
				</Card>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create(
{
	container: {
		flex: 1,
		backgroundColor: GetColor('navy-a'),
	},
	content: {
		backgroundColor: '#fff',
		padding: 8,
	},
	textColorWhite: {
		color: '#fff'
	},
	alignCenter: {
		textAlign: 'center'
	},
	bigText: {
		fontSize: 22
	},
	mt10: {
		marginTop: 10
	},
	mt20: {
		marginTop: 20
	},
	textColorBlack: {
		color: '#000'
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center'
	},
	center: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	topBox: {
		marginTop: 20,
		justifyContent: 'center',
		alignItems: 'center'
	},
	items: {
		borderBottomColor: 'rgba( 7,7,7, 0.1 )',
		borderBottomWidth: 1,
		paddingLeft: 35,
		paddingRight: 20,
		paddingVertical: 20
	},
	iconWrapper: {
		position: 'absolute',
		left: 15,
		top: 26
	},
	infoBox: {
		minWidth: 100,
		borderRadius: 10,
		borderWidth: 2,
		borderColor: GetColor('gray-d'),
		marginHorizontal: 10,
	},
	infoHeader: {
		paddingVertical: 0,
		paddingHorizontal: 5,
		alignItems: 'center',
		justifyContent: 'center'
	},
	infoFooter: {
		borderTopWidth: 2,
		borderTopColor: GetColor('gray-d'),
		paddingHorizontal: 5,
		paddingVertical: 3,
		alignItems: 'center',
		justifyContent: 'center'
	},
})