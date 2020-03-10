import React, {Component} from 'react';
import {TouchableWithoutFeedback, StyleSheet, View} from 'react-native';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import PropTypes from 'prop-types';

ColoredButton.propTypes = {
  /**
   * onPress function
   */
  onPress: PropTypes.func,
  /**
   * button disabled (or not)
   */
  disabled: PropTypes.bool,
  /**
   * style for the button
   */
  style: PropTypes.object,
  /**
   * style for the button when disabled
   */
  styleDisabled: PropTypes.object,
};
/**
 * Component ColoredButton, makes a Touchable look like a button
 *
 * @example
 * const style = {justifyContent: 'center'};
 * const styleDisabled = {justifyContent: 'center'};
 * return (
 *   <ColoredButton
 *     disabled={false}
 *     style={style}
 *     styleDisabled={styleDisabled}
 *     onPress={() => {
 *       this.setState({pressed: true});
 *     }}>
 *     <Text>Button 1</Text>
 *   </ColoredButton>
 * }
 */
export default class ColoredButton extends Component {
  /**
   * render ColoredButton view
   */
  render() {
    return (
      <TouchableWithoutFeedback
        onPress={this.props.onPress}
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
