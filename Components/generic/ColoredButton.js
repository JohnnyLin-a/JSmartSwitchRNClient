import React, {Component} from 'react';
import {TouchableWithoutFeedback, Text, StyleSheet, View} from 'react-native';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import FontAwesome, {
  SolidIcons,
  RegularIcons,
  BrandIcons,
} from 'react-native-fontawesome';
import FontAwesomeSpin from './FontAwesomeSpin';

export default class ColoredButton extends Component {
  state = {
    disabled: false,
    disabledComponent: null,
  };

  onPressButton = () => {
    this.setState(
      {
        disabled: true,
        disabledComponent: (
          <FontAwesomeSpin
            style={[styles.textStyle, this.props.textStyle]}
            icon={SolidIcons.syncAlt}
          />
        ),
      },
      async () => {
        const response = await this.props.onPress();
        console.log('response', response);
        if (response.data.success) {
          this.setState({disabled: false});
        }
      },
    );
  };

  render() {
    return (
      <View
        style={[
          this.state.disabled ? this.props.styleDisabled : this.props.style,
          styles.genericTouchable,
        ]}>
        <TouchableWithoutFeedback
          disabled={this.state.disabled}
          onPress={this.onPressButton}>
          {this.state.disabled ? (
            this.state.disabledComponent
          ) : (
            <Text style={[styles.textStyle, this.props.textStyle]}>
              {this.props.buttonText}
            </Text>
          )}
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  genericTouchable: {
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: responsiveFontSize(3),
    textAlign: 'center',
  },
});
