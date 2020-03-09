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
  resetToIdleTimer = () => {
    if (this.props.onDoneCallback) {
      setTimeout(() => {
        this.props.onDoneCallback();
      }, 1000);
    }
  };

  componentDidUpdate = prevProps => {
    if (this.props.status === status.DONE) {
      this.resetToIdleTimer();
    }
  };

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
