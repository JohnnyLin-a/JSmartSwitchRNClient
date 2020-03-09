import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import FontAwesomeSpin from './FontAwesomeSpin';
import FontAwesome, {SolidIcons} from 'react-native-fontawesome';

export const status = {
  IDLE: 'IDLE',
  PROCESSING: 'PROCESSING',
  DONE: 'DONE',
};

export default class TextWithStatus extends Component {
  state = {
    status: status.IDLE,
    success: false,
  };

  resetToIdleTimer = () => {
    if (this.props.onDoneCallback) {
      setTimeout(() => {
        this.props.onDoneCallback();
      }, 1000);
    }
  };

  componentDidUpdate = prevProps => {
    if (
      prevProps.status !== this.state.status ||
      prevProps.success !== this.state.success
    ) {
      this.setState(
        {status: this.props.status, success: this.props.success},
        () => {
          if (this.state.status === status.DONE) {
            this.resetToIdleTimer();
          }
        },
      );
    }
  };

  render() {
    return (
      <View>
        {this.state.status === status.IDLE && (
          <Text style={[styles.textStyle, this.props.style]}>
            {this.props.children}
          </Text>
        )}
        {this.state.status === status.PROCESSING && (
          <FontAwesomeSpin
            style={[styles.textStyle, this.props.style]}
            icon={SolidIcons.syncAlt}
          />
        )}
        {this.state.status === status.DONE &&
          (this.state.success ? (
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
