import React 		from 'react';
import {
	View,
	ScrollView,
	TextInput,
	StyleSheet,
	Dimensions,
	TouchableHighlight,
	Modal
}	from 'react-native';
import SignaturePad			from 'react-native-signature-pad';
import Button 				from '../../custom/Button';
import { GetColor }			from '../../custom/Utils/color';
import Text 				from '../../custom/Text';
import Card 				from '../../custom/Card';
import FloatingLabel		from '../../custom/FloatingLabel';
import { currencyFormat }	from '../../lib/Helpers';
import Prompt 				from '../../custom/Prompt';
import TitleBackHeader		from '../../custom/TitleBackHeader';
import { 
	callToSupport,
	callToNumber
} from '../../lib/Helpers';

class Signature extends React.Component
{
	constructor(props)
	{

		super(props);
		this.state = {
			showPad: true
		};

		this.reset = this.reset.bind( this );

	}

	reset()
	{
		var self = this;
		self.props.formHandler( { name: 'image', value: null } )
		self.setState({
			showPad: false
		});
		setTimeout(function(){
			self.setState({
				showPad: true
			});
		}, 0);
	}

	render()
	{
		const { width, height } = Dimensions.get('window');
		return (
			<View style={{ flex: 1, backgroundColor: GetColor('navy-b') }}>
				<Prompt
					placeholder="نام صاحب امضا"
					visible={ this.props.showPrompt }
					defaultValue={this.props.signedBy}
					onChangeText={ value => this.props.formHandler( { name: 'signed_by', value } ) }
					submitText="تأیید نام صاحب امضا"
					validation={ this.props.isPromptValid }
					onSubmit={ value => this.props.addName( value )  }
					onClose={ this.reset }
				/>
				<View>
					<Modal
						animationType={ "slide" }
						transparent={ true }
						visible={ this.props.showInfoModal }
						onRequestClose={ () => {} }
					>
						<View  style={{ flex: 1, backgroundColor: GetColor( 'black', 0.7 ) }}>
							<View style={{ height: 270, backgroundColor: 'white', padding: 12, marginTop: '40%', justifyContent: 'center', alignItems: 'center' }} >
								<Text color='black' size='large'>{ 'آدرس: ' + (
										this.props.info && this.props.info.next_address_any_full 
											? this.props.info.next_address_any_full.address +  
												( this.props.info.next_address_any_full.number ? '، پلاک ' + this.props.info.next_address_any_full.number‌ : '' ) +
												( this.props.info.next_address_any_full.unit ? '، واحد ' + this.props.info.next_address_any_full.unit : '' )
											: '' 
										)
									}
								</Text>
								{
									this.props.info && this.props.info.customer
										?	<Button title='تماس با مشتری' wide color={ GetColor( 'blue-a' ) } onPress={ () => callToNumber( this.props.info.customer.phone ) } />
										: 	null
								}
								<Button title='بستن' color={ GetColor( 'red-a' ) } onPress={ this.props.toggleInfoModal } />
							</View>
						</View>
					</Modal>
				</View>
				<View style={{ flex: 1, paddingHorizontal: 10 }}>
					<View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: GetColor('navy-f'), paddingBottom: 10 }}>
						<Text color={ GetColor('gray-c') } size='large'>نام صاحب امضا</Text>
						<Text color={ GetColor('gray-c') } size='large' onPress={ this.props.togglePrompt } >{ this.props.signedBy }</Text>
					</View>
					<View style={{ flex: 1 }}>
						<View style={{ width: '100%', flexDirection: 'row', paddingVertical: 5, alignItems: 'center', justifyContent: 'space-between' }}>
							<View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', flex: 1, justifyContent: 'center', opacity: this.props.cashPayment ? 1 : 0 }} >
								<Text size='large' color={ GetColor( 'red-a' ) } >مبلغ </Text>
								<Text size='large' color={ GetColor( 'green-a' ) } > { currencyFormat( this.props.price ) }</Text>
								<Text size='large' color={ GetColor( 'red-a' ) }>تومان از { this.props.payAtDest ? 'مقصد' : 'مبدا' } دریافت کنید</Text>
							</View>
							<View style={{ position: 'absolute', left: 0, right: 0, top: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', opacity: this.props.cashPayment ? 0 : 1 }}>
								<Text size='large' color={ GetColor('gray-c') }>وضعیت پرداخت</Text>
								<Text size='xlarge' color={ GetColor( 'green-a' ) }>پرداخت شده</Text>
							</View>
						</View>
						{
							this.state.showPad ?
							<View style={{ flex: 1, marginVertical: 12, flexDirection: 'row', width: '100%', backgroundColor: GetColor( 'white' ), borderRadius: 2 }}>
								<Button
									color={ GetColor('white') } 
									background={ GetColor('red-a') }
									padding="medium"
									radius="few"
									shadow="very"
									size="small"
									icon="return"
									style={{ zIndex: 1, position: 'absolute', top: 1, left: 1 }}
									onPress={ this.reset }
								/>
								<SignaturePad 
									onChange={ ( { base64DataUrl } ) => this.props.formHandler( { name: 'image', value: base64DataUrl } ) }
									style={{ zIndex: 0, backgroundColor: 'white' }}
									penColor="#000"
									dotSize={ 1 }
								/>
							</View>
							: null
						}
					</View>
				</View>
				{
					this.state.showPad ?
					<Button
						title={ this.props.isLastAddress ? 'اتمام سفر' : 'ثبت' }
						disabled={ !this.props.isFormValid }
						onPress={ this.props.submit }
						isLoading={ this.props.isLoading }
						wide
						color='white'
						background={ GetColor( this.props.info.has_return && this.props.isLastAddress ? 'orange-a' : 'green-a' ) }
						size={23}
						padding={5}
					/>
					: null
				}
			</View>
		);

	}
}

export default Signature;