import React from 'react';
import { 
	StyleSheet,
	View,
	TouchableHighlight,
	ScrollView
} from 'react-native';
import Spinner 			from 'react-native-loading-spinner-overlay';
import { GetColor }		from '../../custom/Utils/color';
import { WeightStyles }	from '../../config/styles';
import FloatingLabel	from '../../custom/FloatingLabel';
import Card 			from '../../custom/Card';
import Text 			from '../../custom/Text';
import Icon 			from '../../custom/Icon';
import {DisabledStyles} from '../../config/styles';

export default function Verification( props )
{
	return (
		<View style={ styles.primary }>
			<ScrollView style={ styles.flex1 }>
				<View style={ styles.cardWrapper }>
					<Card collapsed={ true }>
						<View role="body" style={{ backgroundColor: 'white' }} >
							<View style={ [ styles.flexRowCenter, styles.mb10 ] }>
								<Icon name="info" color="orange" style={ styles.mr5 }></Icon>
								<Text color='black' size={ 12 }>کد تایید به شماره تلفن همراه شما ارسال گردید.</Text>
							</View>
							<View>
								<Text color='black' align='center' size={ 32 }>{ props.phone }</Text>
							</View>
							<View>
								<Text color='black' align='center'>ورود کد تایید</Text>
							</View>
							<FloatingLabel 
					            inputStyle={ styles.input }
					        	onChangeText={ props.textChange }
					        	keyboardType='phone-pad'
					        	maxLength={ 5 }
					            autoFocus={ true }
					            style={  styles.mb20 }
					        />
							<View>
					        	<TouchableHighlight
					        		disabled={ props.disabledResend }
					        		onPress={ () => props.resend( 'sms' ) }
					        		style={ props.disabledResend ? DisabledStyles : {} }
					        	>
									<View style={ [ styles.flexRowCenter, styles.mb15 ] }>
										<Icon name="return-circled" color={ GetColor('blue-a') } style={ [ styles.mr5, styles.fs18 ] }></Icon>
										<Text color={ GetColor('blue-a') } style={ styles.fs15 }>ارسال دوباره کد تایید</Text>
									</View>
					        	</TouchableHighlight>
							</View>
							<View>
					        	<TouchableHighlight
					        		disabled={ props.disabledResend }
					        		onPress={ () => props.resend( 'call' ) }
					        		style={ props.disabledResend ? DisabledStyles : {} }
					        	>
									<View style={ styles.flexRowCenter }>
										<Icon name="return-circled" color={ GetColor('blue-a') } style={ [ styles.mr5, styles.fs18 ] }></Icon>
										<Text color={ GetColor('blue-a') } style={ styles.fs15 }>ارسال دوباره کد تایید به وسیله تماس</Text>
									</View>
					        	</TouchableHighlight>
							</View>
						</View>
					</Card>
				</View>
			</ScrollView>
			<Spinner 
				visible={props.loading}
				size="large"
				overlayColor="rgba( 0, 0, 0, 0.8 )"
				textContent={"لطفاً کمی صبر کنید ..."}
				textStyle={[{color: GetColor('white')}, WeightStyles.normal]}
			/>
		</View>
	);
}

const styles = StyleSheet.create(
{
	flex1: { flex: 1 },
	primary:
	{
		flex: 1,
		backgroundColor: GetColor('navy-b')
	},
	input:
	{
		textAlign: 'center',
	},
	cardWrapper:
	{
		flex: 1,
		padding: 15
	},
	mr5: { marginRight: 5 },
	mb20: { marginBottom: 20 },
	mb15: { marginBottom: 15 },
	mb10: { marginBottom: 10 },
	fs18: { fontSize: 18 },
	fs15: { fontSize: 15 },
	fs12: { fontSize: 12 },
	flexRowCenter:
	{
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
})