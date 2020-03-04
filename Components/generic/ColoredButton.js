import React, {Component} from 'react';
import {TouchableWithoutFeedback, Text, StyleSheet, View} from 'react-native';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

export default class ColoredButton extends Component {
  state = {
    disabled: false,
    buttonText: '',
  };

  onPressButton = () => {
    this.setState({disabled: true}, async () => {
      const response = await this.props.onPress();
      this.setState({disabled: false});
    });
  };

  render() {
    return (
      <View style={[this.props.style, styles.genericTouchable]}>
        <TouchableWithoutFeedback
          disabled={this.state.disabled}
          onPress={this.onPressButton}>
          <Text style={[styles.textStyle, this.props.textStyle]}>
            {this.state.disabled
              ? this.state.buttonText
              : this.props.buttonText}
          </Text>
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
