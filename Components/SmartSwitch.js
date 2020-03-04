/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, SafeAreaView, StyleSheet, ToastAndroid} from 'react-native';
import TitleHeader from './generic/TitleHeader';
import ColoredButton from './generic/ColoredButton';

export default class SmartSwitch extends Component {
  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <View style={{flex: 2}}>
          <TitleHeader title="Welcome to Johnny's smart switch! " />
        </View>

        <View style={[{flex: 8}, styles.buttonsContainer]}>
          <ColoredButton
            style={{backgroundColor: 'yellow'}}
            buttonText="Open Computer!"
            onPress={() => {
              ToastAndroid.show('onPress', ToastAndroid.SHORT);
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  buttonsContainer: {
    justifyContent: 'center',
  },
});
