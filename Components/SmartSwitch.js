/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, SafeAreaView, StyleSheet, Text, ToastAndroid} from 'react-native';
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
import FontAwesome, {SolidIcons} from 'react-native-fontawesome';
import Config from 'react-native-config';
import {WebView} from 'react-native-webview';
import ColorfulModal from './generic/ColorfulModal';

export default class SmartSwitch extends Component {
  state = {wvURI: null, mountWV: false};

  openComputer = () => {
    this.setState({
      wvURI: Config.SERVER_URL + 'api/v1/openMyComputer.php',
      mountWV: true,
    });
  };

  openLights = () => {
    this.setState({
      wvURI: Config.SERVER_URL + 'api/v1/controlLights.php' + '?control=open',
      mountWV: true,
    });
  };

  closeLights = () => {
    this.setState({
      wvURI: Config.SERVER_URL + 'api/v1/controlLights.php' + '?control=close',
      mountWV: true,
    });
  };

  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <View style={{flex: 2}} key="header">
          <TitleHeader
            title={
              <Text>
                {"Welcome to Johnny's smart switch! "}
                <FontAwesome icon={SolidIcons.cog} />
              </Text>
            }
          />
        </View>

        <View style={[{flex: 8}, styles.buttonsContainer]} key="buttons">
          {this.buttonsData.map((buttonData, index) => {
            return (
              <ColoredButton
                key={'button' + index}
                style={[buttonData.style, styles.buttonGeneric]}
                styleDisabled={[buttonData.styleDisabled, styles.buttonGeneric]}
                buttonText={buttonData.buttonText}
                textStyle={buttonData.textStyle}
                onPress={buttonData.onPress}
              />
            );
          })}
        </View>
        {this.state.mountWV && (
          <View style={{height: 0}}>
            <WebView
              ref={ref => (this.webview = ref)}
              source={{uri: this.state.wvURI}}
              onNavigationStateChange={this.handleWebViewNavigationStateChange}
              onLoadEnd={syntheticEvent => {
                ToastAndroid.show(
                  this.state.wvURI + ' Loaded',
                  ToastAndroid.SHORT,
                );
                this.setState({mountWV: false});
              }}
            />
          </View>
        )}
      </SafeAreaView>
    );
  }

  buttonsData = [
    {
      buttonText: (
        <Text>
          <FontAwesome icon={SolidIcons.powerOff} />
          {' Open computer!'}
        </Text>
      ),
      style: {backgroundColor: '#ffc107'},
      styleDisabled: {backgroundColor: '#ffc10765'},
      textStyle: {color: 'black'},
      onPress: this.openComputer,
    },
    {
      buttonText: (
        <Text>
          <FontAwesome icon={SolidIcons.eye} />
          {' Open lights!'}
        </Text>
      ),
      style: {backgroundColor: '#28a745'},
      styleDisabled: {backgroundColor: '#28a74565'},
      textStyle: {color: 'white'},
      onPress: this.openLights,
    },
    {
      buttonText: (
        <Text>
          <FontAwesome icon={SolidIcons.eyeSlash} />
          {' Close lights!'}
        </Text>
      ),
      style: {backgroundColor: '#dc3545'},
      styleDisabled: {backgroundColor: '#dc354565'},
      textStyle: {color: 'white'},
      onPress: this.closeLights,
    },
  ];
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
