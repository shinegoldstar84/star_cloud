import React, { Component, PropTypes } from 'react';
import {
  Modal,
  View,
  Keyboard,
  TouchableHighlight
} from 'react-native';
import Text                   from './Text';
import Button                 from './Button';
import Card                   from './Card';
import FloatingLabel          from './FloatingLabel';
import { GetColor }           from './Utils/color';
import { BorderRadiusStyles } from '../config/styles';

export default class Prompt extends Component {

  constructor(props) {
    super(props);
  
    this.state = {
      value: props.defaultValue,
      visible: false,
      disabled: true
    };
  }

  componentDidMount() {
    this.setState({
      value: this.props.defaultValue
    });
  }

  componentWillReceiveProps(nextProps) {
    const { visible, defaultValue } = nextProps;
    var prevVisible = this.state.visible;
    this.setState({
      visible,
      disabled: this.props.validation ? !this.props.validation(defaultValue) : this.state.disabled,
      value:defaultValue
    });
    if ( ! nextProps.visible && ( visible != prevVisible ) )
    {
      this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
        if ( typeof this.props.onClose === 'function' )
        {
          this.props.onClose();
        }
      });
      Keyboard.dismiss();
    }
  }

  _onChangeText = (value) => {
    this.setState({
      value,
      disabled: this.props.validation ? !this.props.validation(value) : this.state.disabled
    });
    if( this.props.onChangeText )
      this.props.onChangeText(value);
  };

  _onSubmitPress = () => {
    const { value } = this.state;
    this.props.onSubmit(value);
  };

  // _onCancelPress = () => {
  //   this.props.onCancel();
  // };

  close = () => {
    this.setState({visible: false});
  };

  _renderDialog = () => {
    const {
      title,
      placeholder,
      cancelText,
      submitText,
    } = this.props;

    return (
      <View key="prompt" style={{ flex: 1 }}>
        <TouchableHighlight
          onPress={this._onCancelPress}
          underlayColor={GetColor('black', 0)}
          style={{ backgroundColor: GetColor('black', 0.7), position: 'absolute', top: ( typeof this.props.backNav === 'function' ? 46 : 0 ), bottom: 0, left: 0, right: 0 }}
        >
          <View></View>
        </TouchableHighlight>
        { typeof this.props.header ? this.props.header : null }
        <View style={{ flex: 1, padding: 30, paddingTop: 120 }}>
          <Card isLight cardBoxStyle={{ elevation: 5 }}>
            {
              this.props.title
              ?
              <View role="header" headerStyles={{ borderTopLeftRadius: BorderRadiusStyles.few.borderRadius, borderTopRightRadius: BorderRadiusStyles.few.borderRadius  }}>
                <Text size="large" color={GetColor('navy-a')}>{title}</Text>
              </View>
              :
              null
            }
            <View role="body">
              <FloatingLabel
                value={this.state.value}
                onChangeText={this._onChangeText}
                autoFocus={true}
                underlineColorAndroid={ GetColor( 'gray-a', 0.1 ) }
                validate
                required
                {...this.props.textInputProps}
              >{placeholder}</FloatingLabel>
              <Button
                onPress={this._onSubmitPress}
                title={submitText}
                color={ GetColor( 'white' ) }
                background={ GetColor( 'blue-a' ) }
                padding="large"
                size="xlarge"
                radius="few"
                wide
                disabled={this.state.disabled}
                style={{ marginTop: 10 }}
              />
            </View>
          </Card>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, flex: 1, zIndex: 99, display: this.props.visible ? 'flex' : 'none' }}>
        {this._renderDialog()}
      </View>
    );
  }
};
