import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import FontAwesomeSpin from './FontAwesomeSpin';
import FontAwesome, {SolidIcons} from 'react-native-fontawesome';
import PropTypes from 'prop-types';

export const status = {
  IDLE: 'IDLE',
  PROCESSING: 'PROCESSING',
  DONE: 'DONE',
};

/**
 * Component for Text that reacts to different status (IDLE, PROCESSING, DONE)
 *
 * @example
 * const style = {textAlign: 'center'};
 * const callbackFn = () => {this.setState({done: true})};
 * return (
 *   <TextWithStatus
 *     style={style}
 *     status={status.IDLE}
 *     success={true}
 *     onDoneCallback={() => {
 *       this.callbackFn();
 *     }>
 *     <Text>Some text</Text>
 *   </TextWithStatus>
 * )
 */
class TextWithStatus extends Component {
  /**
   * execute onDoneCallback (if supplied) after 1 second delay
   */
  onDoneCallback = () => {
    if (this.props.onDoneCallback) {
      setTimeout(() => {
        this.props.onDoneCallback();
      }, 1000);
    }
  };

  /**
   * componentDidUpdate checks if the status is DONE, then executes onDoneCallback
   */
  componentDidUpdate = prevProps => {
    if (this.props.status === status.DONE) {
      this.onDoneCallback();
    }
  };

  /**
   * Render view
   * IDLE: displays component children
   * PROCESSING: displays a spinning loading icon
   * DONE: success == true => display checkmark
   *       success == false => display 'x'
   */
  render() {
    return (
      <View>
        {this.props.status === status.IDLE && (
          <Text style={[styles.textStyle, this.props.style]}>
            {this.props.children}
          </Text>
        )}
        {this.props.status === status.PROCESSING && (
          <FontAwesomeSpin
            style={[styles.textStyle, this.props.style]}
            icon={SolidIcons.syncAlt}
          />
        )}
        {this.props.status === status.DONE &&
          (this.props.success ? (
            <Text style={[styles.textStyle, this.props.style]}>
              <FontAwesome icon={SolidIcons.check} />
            </Text>
          ) : (
            <Text style={[styles.textStyle, this.props.style]}>
              <FontAwesome icon={SolidIcons.times} />
            </Text>
          ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textStyle: {
    textAlign: 'center',
    alignSelf: 'center',
  },
});

TextWithStatus.propTypes = {
  /**
   * Callback function when status is DONE
   */
  onDoneCallback: PropTypes.func,
  /**
   * Style for Text
   */
  style: PropTypes.object,
  /**
   * Success boolean (Ex: button action's result)
   */
  success: PropTypes.bool,
  /**
   * Status enum ('IDLE', 'PROCESSING', 'DONE')
   */
  status: PropTypes.string,
};

export default TextWithStatus;
