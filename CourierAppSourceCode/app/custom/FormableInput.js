import React 			from 'react';
import {
	TextInput,
	Picker,
	View,
}	from 'react-native';
import PropTypes 		from 'prop-types';
import {WeightStyles} 	from '../config/styles';
import FloatingLabel 	from './FloatingLabel';

export default class FormableInput extends React.Component
{

	renderTextInput = () =>
	{
		return <FloatingLabel
					onChangeText={ ( text ) => this.props.handler( { name : this.props.name,  value : text } ) }
					keyboardType={ this.props.type ? this.props.type : 'default' }
					value={ this.props.defaultValue ? this.props.defaultValue : null }
					maxLength={ this.props.max ? this.props.max : null }
					multiline={ this.props.multiline ? true : false }
					inputStyle={ this.props.customStyle ? this.props.customStyle : {} }
					style={{ flex: 1 }}
					underlineColorAndroid='rgba( 7, 7, 7, 0.1 )'
					required={ this.props.required }
					validate={ this.props.validate }
					pattern={ this.props.pattern }
				>{ this.props.placeholder }</FloatingLabel>
	}

	renderPicker = () =>
	{
		return (
			<Picker
				selectedValue={ this.props.defaultValue ? this.props.defaultValue : -1 }
				onValueChange={ ( option ) => this.props.handler( { name: this.props.name, value: option } ) }
				style={[{ height: 35 }, this.props.style, { width: this.props.width ? this.props.width : 70 }]}
				itemStyle={ this.props.itemStyle }
			>
				<Picker.Item 
					label={ this.props.defaultOptionLabel ? this.props.defaultOptionLabel : "لطفا یک گزینه را انتخاب نمایید" } 
					value="-1" 
				/>
				{
					this.props.items.map( ( item, index ) =>
					{
						return ( 
							<Picker.Item
								label=
									{
										item[ this.props.labelKey ] 
											? item[ this.props.labelKey ] 
											: ( Array.isArray( item ) ? item[ index ] : item ) 
									}
								value=
									{ 
										item[ this.props.valueKey ] 
											? item[ this.props.valueKey ] 
											: ( Array.isArray( item ) ? item[ index ] : item ) 
									}
								key={ index.toString() }
							/>
						)	
					})
				}
				
			</Picker>
		);
		
	}

	render()
	{
		return (
			<View style={ [ { flex: 1, flexDirection: 'row' }, this.props.forceAlignEnd ? { justifyContent: 'flex-end' } : {} ] }>
				{
					this.props.formType !== 'picker' 
						? this.renderTextInput()
						: this.renderPicker()
							
				}
			</View>
		);
	}

}

FormableInput.propTypes = {
	name: PropTypes.string.isRequired
}
