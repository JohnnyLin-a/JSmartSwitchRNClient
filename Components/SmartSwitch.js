/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, SafeAreaView, StyleSheet, Text} from 'react-native';
import TitleHeader from './generic/TitleHeader';
import ColoredButton from './generic/ColoredButton';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import FontAwesome, {SolidIcons} from 'react-native-fontawesome';
import Config from 'react-native-config';
import {WebView} from 'react-native-webview';
import TextWithStatus, {status as TextStatus} from './generic/TextWithStatus';
import {connect} from 'react-redux';

class SmartSwitch extends Component {
  state = {
    mountWV: [],
    requestStatus: [],
    success: [],
  };

  networkRequest = index => {
    let mountWV = [...this.state.mountWV];
    mountWV[index] = true;
    this.setState({
      mountWV: mountWV,
    });
  };

  // Maybe consider using redux for this state
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
              <View key={'ButtonComponent' + index}>
                <ColoredButton
                  key={'button' + index}
                  style={[buttonData.style, styles.buttonGeneric]}
                  onPress={() => {
                    let status = [].concat(this.state.requestStatus);
                    status[index] = TextStatus.PROCESSING;
                    this.setState({requestStatus: status}, () => {
                      this.networkRequest(index);
                    });
                  }}>
                  <TextWithStatus
                    style={buttonData.textStyle}
                    status={
                      this.state.requestStatus[index]
                        ? this.state.requestStatus[index]
                        : TextStatus.IDLE
                    }>
                    {buttonData.buttonText}
                  </TextWithStatus>
                </ColoredButton>
                {this.state.mountWV[index] && (
                  <View style={{height: 0, width: 0}}>
                    <WebView
                      key={'webview' + index}
                      source={{uri: buttonData.URI}}
                      onLoadEnd={syntheticEvent => {
                        let mountWV = [].concat(this.state.mountWV);
                        mountWV[index] = false;
                        let status = [].concat(this.state.requestStatus);
                        status[index] = TextStatus.DONE;
                        this.setState({
                          mountWV: mountWV,
                          requestStatus: status,
                        });
                      }}
                      onHttpError={syntheticEvent => {
                        const {nativeEvent} = syntheticEvent;
                        if (nativeEvent.statusCode !== 200) {
                          let success = [].concat(this.state.success);
                          success[index] = false;
                          this.setState({success: success});
                        }
                      }}
                    />
                  </View>
                )}
              </View>
            );
          })}
        </View>
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
      styleProcessing: {backgroundColor: '#ffc10765'},
      textStyle: {color: 'black', fontSize: responsiveFontSize(3)},
      URI: Config.SERVER_URL + 'api/v1/openMyComputer.php',
    },
    {
      buttonText: (
        <Text>
          <FontAwesome icon={SolidIcons.eye} />
          {' Open lights!'}
        </Text>
      ),
      style: {backgroundColor: '#28a745'},
      styleProcessing: {backgroundColor: '#28a74565'},
      textStyle: {color: 'white', fontSize: responsiveFontSize(3)},
      URI: Config.SERVER_URL + 'api/v1/controlLights.php' + '?control=open',
    },
    {
      buttonText: (
        <Text>
          <FontAwesome icon={SolidIcons.eyeSlash} />
          {' Close lights!'}
        </Text>
      ),
      style: {backgroundColor: '#dc3545'},
      styleProcessing: {backgroundColor: '#dc354565'},
      textStyle: {color: 'white', fontSize: responsiveFontSize(3)},
      URI: Config.SERVER_URL + 'api/v1/controlLights.php' + '?control=close',
    },
  ];
}

export default connect()(SmartSwitch);

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
