import React 		from 'react';
import {
	View,
	StyleSheet,
	ScrollView
}	from 'react-native';
import Text 				from '../../custom/Text';
import Card 				from '../../custom/Card';
import Icon 				from '../../custom/Icon';
import { GetColor }			from '../../custom/Utils/color';
import Button 				from '../../custom/Button';
import { currencyFormat }	from '../../lib/Helpers';
import {
	PaddingStyles,
	BorderRadiusStyles,
} from '../../config/styles';

export default function Score( props )
{
	return (
		<ScrollView style={{ flex: 1, backgroundColor: GetColor('navy-a') }} contentContainerStyle={ styles.container }>
			<View style={{ marginBottom: 15 }}>
				<Card isLight>
					<View role="body" style={{ ...PaddingStyles.none, flexDirection: 'row' }}>
						<View style={{ backgroundColor: GetColor('gray-e'), paddingVertical: 25, paddingHorizontal: 30, alignItems: 'center', justifyContent: 'center', borderTopRightRadius: BorderRadiusStyles.few.borderRadius, borderBottomRightRadius: BorderRadiusStyles.few.borderRadius }}>
							<Text size="xxlarge" color={ GetColor('blue-a') }>مجموع</Text>
							<Text size="xxlarge" color={ GetColor('blue-a') } style={{ marginTop: -7 }}>امتیــاز</Text>
							<View style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, justifyContent: 'center', alignItems: 'flex-end' }}>
								<View style={{ width: 10, height: 10, marginRight: -5, backgroundColor: GetColor( 'white' ), transform: [{ rotate: '45deg' }] }} />
							</View>
						</View>
						<View style={{ flex: 1, backgroundColor: GetColor('white'), paddingHorizontal: 20, alignItems: 'center', justifyContent: 'center', borderTopLeftRadius: BorderRadiusStyles.few.borderRadius, borderBottomLeftRadius: BorderRadiusStyles.few.borderRadius }}>
							<Text size="superLarge" color={ GetColor('blue-a') }>{ currencyFormat( 2536 ) }</Text>
						</View>
					</View>
				</Card>
			</View>
			<View style={{ marginBottom: 15 }}>
				<Text size="xlarge" align="center" color={ GetColor('white') } style={{ marginBottom: 15 }}>نحوه محاسبه امتیاز</Text>
				<Card isLight>
					<View role="body" style={{ ...PaddingStyles.none }}>
						<View style={ styles.infoRow }>
							<View style={{ flex: 1 }}>
								<Text color={ GetColor('navy-a') }>توضیحات</Text>
							</View>
							<View style={{ width: 30, alignItems: 'center' }}>
								<Text color={ GetColor('navy-a') }>تعداد</Text>
							</View>
							<View style={{ width: 90, alignItems: 'flex-end' }}>
								<Text color={ GetColor('navy-a') }>جمع امتیاز</Text>
							</View>
						</View>
						<View style={[ styles.infoRow, 1 ? { borderBottomWidth: 0 } : {} ]}>
							<View style={{ flex: 1, paddingRight: 10 }}>
								<Text color={ GetColor('navy-f') }>۱۰ صبح تا ۴ بعدالظهر</Text>
							</View>
							<View style={{ width: 30, alignItems: 'center' }}>
								<Text color={ GetColor('navy-f') }>12</Text>
							</View>
							<View style={{ width: 90, alignItems: 'flex-end' }}>
								<Text color={ GetColor('green-a') }>+ 25</Text>
							</View>
						</View>
					</View>
				</Card>
			</View>
			<View>
				<Text size="xlarge" align="center" color={ GetColor('white') } style={{ marginBottom: 15 }}>محاسبات کسر امتیاز</Text>
				<Card isLight>
					<View role="body" style={{ ...PaddingStyles.none }}>
						<View style={ styles.infoRow }>
							<View style={{ flex: 1 }}>
								<Text color={ GetColor('navy-a') }>توضیحات</Text>
							</View>
							<View style={{ width: 30, alignItems: 'center' }}>
								<Text color={ GetColor('navy-a') }>تعداد</Text>
							</View>
							<View style={{ width: 90, alignItems: 'flex-end' }}>
								<Text color={ GetColor('navy-a') }>جمع امتیاز</Text>
							</View>
						</View>
						<View style={[ styles.infoRow, 1 ? { borderBottomWidth: 0 } : {} ]}>
							<View style={{ flex: 1, paddingRight: 10 }}>
								<Text color={ GetColor('navy-f') }>روزهای بدون درخواست</Text>
							</View>
							<View style={{ width: 30, alignItems: 'center' }}>
								<Text color={ GetColor('navy-f') }>12</Text>
							</View>
							<View style={{ width: 90, alignItems: 'flex-end' }}>
								<Text color={ GetColor('red-a') }>- 25</Text>
							</View>
						</View>
					</View>
				</Card>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create(
{
	container: {
		paddingVertical: 25,
		paddingHorizontal: 15
	},
	infoRow: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderBottomWidth: 1,
		borderBottomColor: GetColor('gray-e')
	}
})