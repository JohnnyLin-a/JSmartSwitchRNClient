import React, {Component} from 'react';
import {TouchableHighlight, Text, StyleSheet} from 'react-native';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

export default class ColoredButton extends Component {
  state = {
    isBusy: false,
    buttonText: '',
  };

  onPressButton = () => {
    this.setState({isBusy: true}, async () => {
      const response = await this.props.onPress();
      this.setState({isBusy: false});
    });
  };

  render() {
    return (
      <TouchableHighlight
        style={[this.props.style, styles.genericTouchable]}
        onPress={this.props.onPressButton}>
        <Text style={styles.textStyle}>
          {this.state.isBusy ? this.state.buttonText : this.props.buttonText}
        </Text>
      </TouchableHighlight>
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
