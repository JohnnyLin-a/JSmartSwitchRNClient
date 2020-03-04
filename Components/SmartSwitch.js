/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
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
  buttonsData = [
    {
      buttonText: 'Open computer!',
      style: {backgroundColor: '#ffc107'},
      styleDisabled: {backgroundColor: '#ffc107'},
      textStyle: {color: 'black'},
      onPress: openComputer,
    },
    {
      buttonText: 'Open lights!',
      style: {backgroundColor: '#28a745'},
      styleDisabled: {backgroundColor: '#28a745'},
      textStyle: {color: 'white'},
      onPress: openLights,
    },
    {
      buttonText: 'Close lights!',
      style: {backgroundColor: '#dc3545'},
      styleDisabled: {backgroundColor: '#dc3545'},
      textStyle: {color: 'white'},
      onPress: closeLights,
    },
  ];

  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <View style={{flex: 2}}>
          <TitleHeader title="Welcome to Johnny's smart switch! " />
        </View>

        <View style={[{flex: 8}, styles.buttonsContainer]}>
          {this.buttonsData.map(buttonData => {
            return (
              <ColoredButton
                style={[buttonData.style, styles.buttonGeneric]}
                styleDisabled={[buttonData.styleDisabled, styles.buttonGeneric]}
                buttonText={buttonData.buttonText}
                textStyle={buttonData.textStyle}
                onPress={buttonData.onPress}
              />
            );
          })}
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
