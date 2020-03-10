import React, {Component} from 'react';
import {TouchableWithoutFeedback, StyleSheet, View} from 'react-native';
import {responsiveHeight} from 'react-native-responsive-dimensions';

export default class ColoredButton extends Component {
  onPressButton = () => {
    this.props.onPress();
  };

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={this.onPressButton}
        disabled={this.props.disabled}>
        <View
          style={[
            this.props.disabled ? this.props.styleDisabled : this.props.style,
            styles.genericTouchable,
          ]}>
          {this.props.children}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  genericTouchable: {
    justifyContent: 'center',
    height: responsiveHeight(10),
  },
});
