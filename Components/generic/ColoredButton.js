/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {TouchableHighlight, Text, StyleSheet, View} from 'react-native';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

export default class ColoredButton extends Component {
  state = {
    disabled: false,
    buttonText: '',
  };

  onPressButton = () => {
    // this.setState({disabled: true}, async () => {
    //   const response = await this.props.onPress();
    //   this.setState({disabled: false});
    // });
    this.props.onPress();
  };

  render() {
    return (
      <View>
        <TouchableHighlight
          style={[this.props.style, styles.genericTouchable]}
          disabled={this.state.disabled}
          onPress={this.onPressButton}>
          <Text style={[styles.textStyle, this.props.textStyle]}>
            {this.state.disabled
              ? this.state.buttonText
              : this.props.buttonText}
          </Text>
        </TouchableHighlight>
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
