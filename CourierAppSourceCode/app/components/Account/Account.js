import React 		from 'react';
import {
	View,
	StyleSheet,
	ScrollView
}	from 'react-native';
import Text				from '../../custom/Text';
import FormableInput	from '../../custom/FormableInput';
import Button 			from '../../custom/Button';
import Card 			from '../../custom/Card';
import { GetColor }		from '../../custom/Utils/color';

export default function Account( props )
{
	return(
		<View style={ styles.container }>
			<ScrollView style={{ flex: 1, padding: 20 }}>
				<View style={{ flexDirection: 'row', alignItems: 'center' }} >
					<FormableInput 
						placeholder="شماره شبا"
						name="number"
						handler={ props.formHandler }
						type="phone-pad"
						max={ 24 }
						defaultValue={ props.number }
					/>
					<Text style={{ marginTop: 4 }} color={GetColor('gray-b')} size="large">IR</Text>
					{
						props.number && props.number.length ?
						<Button
							title='حذف'
							onPress={props.clear}
							color={ GetColor('red-a') }
							borderColor={ GetColor('red-a') }
							radius="few"
							padding="medium"
							style={{ marginLeft: 10 }}
						/>
						: null
					}
				</View>
				{
					props.owner ?
					<Card isLight style={{ marginTop: 10 }}>
						<View role="body" style={{ backgroundColor: GetColor('gray-e'), borderRadius: 3 }}>
							<View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} >
								<Text color={ GetColor('navy-f') }>نام صاحب حساب</Text>
								<View style={{ width: 0, flex: 1, marginLeft: 20, alignItems: 'flex-end' }}>
									<Text color={ GetColor('green-a') } align="center" size="large">{ props.owner }</Text>
								</View>
							</View>
						</View>
					</Card>
					: null
				}
			</ScrollView>
			<Button
				onPress={ props.handlePress }
				disabled={ props.disabled }
				isLoading={ props.isLoading }
				title="ثبت"
				wide
				color='white'
				background={ GetColor( 'blue-a' ) }
				size="xlarge"
				padding="large"
			/>
		</View>
	)
}

const styles = StyleSheet.create(
{
	container: {
		flex: 1,
		backgroundColor: GetColor('white')
	}
})