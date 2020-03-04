/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import TitleHeader from './generic/TitleHeader';
import ColoredButton from './generic/ColoredButton';

export default class SmartSwitch extends Component {
  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <TitleHeader
          style={{flex: 2}}
          title="Welcome to Johnny's smart switch! "
        />
        <View style={{flex: 8}}>
          <ColoredButton style={{backgroundColor: 'yellow'}} />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});
