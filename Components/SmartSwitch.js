/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, SafeAreaView, StyleSheet, ToastAndroid} from 'react-native';
import TitleHeader from './generic/TitleHeader';
import ColoredButton from './generic/ColoredButton';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {
  openComputer,
  openLights,
  closeLights,
} from '../Helpers/Network/ApiRequest';

export default class SmartSwitch extends Component {
  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <View style={{flex: 2}}>
          <TitleHeader title="Welcome to Johnny's smart switch! " />
        </View>

        <View style={[{flex: 8}, styles.buttonsContainer]}>
          <ColoredButton
            style={[{backgroundColor: '#ffbf00'}, styles.buttonGeneric]}
            buttonText="Open Computer!"
            onPress={openComputer}
          />
          <ColoredButton
            style={[{backgroundColor: 'green'}, styles.buttonGeneric]}
            textStyle={{color: 'white'}}
            buttonText="Open lights!"
            onPress={openLights}
          />
          <ColoredButton
            style={[{backgroundColor: 'red'}, styles.buttonGeneric]}
            textStyle={{color: 'white'}}
            buttonText="Close lights!"
            onPress={closeLights}
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
    marginHorizontal: responsiveWidth(15),
  },
  buttonGeneric: {
    borderRadius: 15,
    marginVertical: responsiveHeight(3),
    paddingVertical: responsiveHeight(1),
  },
});
