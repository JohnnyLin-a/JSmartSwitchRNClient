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
import TextWithStatus, {status as TextStatus} from './generic/TextWithStatus';
import {connect} from 'react-redux';
import {
  updateSSMountWV,
  updateSSRequestStatus,
  updateSSRequestSuccess,
} from '../actions/SmartSwitchStatusActions';

/**
 * Component for showing the main page of the Smart Switch
 *
 * @example
 * return (
 *  <SmartSwitch />
 * )
 */
class SmartSwitch extends Component {
  /* No propTypes for this component */

  /**
   * Update RequestSuccess redux state at index from boolean value
   *
   * @param {number} index
   * @param {boolean} success
   */
  _updateSSRequestSuccessSingleIndex = (index, success) => {
    let requestSuccess = [...this.props.requestSuccess];
    requestSuccess[index] = success;
    this.props.updateSSRequestSuccess(requestSuccess);
  };

  /**
   * Update MountWebView redux state at index from boolean value
   *
   * @param {number} index
   * @param {boolean} mount
   */
  _updateSSMountWVSingleIndex = (index, mount) => {
    let mountWV = [...this.props.mountWV];
    mountWV[index] = mount;
    this.props.updateSSMountWV(mountWV);
  };

  /**
   * Update RequestStatus redux state at index from TextStatus value
   *
   * @param {number} index
   * @param {string} status
   */
  _updateSSRequestStatusSingleIndex = (index, status) => {
    let requestStatus = [...this.props.requestStatus];
    requestStatus[index] = status;
    this.props.updateSSRequestStatus(requestStatus);
  };

  /**
   * Set redux state for RequestSuccess to true and mounts the WebView to make the network request at index
   *
   * @param {number} index
   */
  networkRequest = index => {
    this._updateSSRequestSuccessSingleIndex(index, true);
    this._updateSSMountWVSingleIndex(index, true);
  };

  /**
   * Handles button press for button index
   * Set redux state RequestStatus to PROCESSING, then makes the network request
   *
   * @param {number} index
   */
  onPressButton = index => {
    this._updateSSRequestStatusSingleIndex(index, TextStatus.PROCESSING);
    this.networkRequest(index);
  };

  /**
   * Handles http errors when processing network request
   * Check if http code not 200, then set redux RequestSuccess to false at index
   *
   * @param {number} index
   * @param {Object} syntheticEvent
   */
  onHttpError = (index, syntheticEvent) => {
    const {nativeEvent} = syntheticEvent;
    if (nativeEvent.statusCode !== 200) {
      this._updateSSRequestSuccessSingleIndex(index, false);
    }
  };

  /**
   * Execute when network request is complete
   * Check if the message received from WebView is 'loaded',
   * then unmount the webview at index, set RequestStatus to 'DONE'.
   *
   * @param {number} index
   * @param {Object} syntheticEvent
   */
  onMessage = (index, syntheticEvent) => {
    if (syntheticEvent.nativeEvent.data === 'loaded') {
      this._updateSSMountWVSingleIndex(index, false);
      this._updateSSRequestStatusSingleIndex(index, TextStatus.DONE);
    }
  };

  /**
   * Reset RequestStatus to 'IDLE' at index,
   * then set back RequestSuccess back to true (default) at index
   *
   * @param {number} index
   */
  resetToIdle = index => {
    this._updateSSRequestStatusSingleIndex(index, TextStatus.IDLE);
    this._updateSSRequestSuccessSingleIndex(index, true);
  };

  /**
   * Render SmartSwitch view
   * Includes TitleHeader, ColoredButtons to render
   */
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
                  disabled={
                    this.props.requestStatus[index] === TextStatus.PROCESSING
                  }
                  key={'button' + index}
                  style={[buttonData.style, styles.buttonGeneric]}
                  styleDisabled={[
                    buttonData.styleProcessing,
                    styles.buttonGeneric,
                  ]}
                  onPress={() => {
                    this.onPressButton(index);
                  }}>
                  <TextWithStatus
                    style={buttonData.textStyle}
                    status={
                      this.props.requestStatus[index]
                        ? this.props.requestStatus[index]
                        : TextStatus.IDLE
                    }
                    success={
                      this.props.requestSuccess[index]
                        ? this.props.requestSuccess[index]
                        : false
                    }
                    onDoneCallback={() => {
                      this.resetToIdle(index);
                    }}>
                    {buttonData.buttonText}
                  </TextWithStatus>
                </ColoredButton>
                {this.props.mountWV[index] && (
                  <View style={{height: 0, width: 0}}>
                    <WebView
                      key={'webview' + index}
                      source={{uri: buttonData.URI}}
                      onMessage={event => {
                        this.onMessage(index, event);
                      }}
                      injectedJavaScript={
                        "(function() {window.ReactNativeWebView.postMessage('loaded');})();"
                      }
                      onHttpError={syntheticEvent => {
                        this.onHttpError(index, syntheticEvent);
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

/**
 * Map redux state to props
 * Maps mountWV, requestStatus and requestSuccess to props
 * @param {Object} state
 */
const mapStateToProps = state => {
  return {
    mountWV: state.smartSwitch.mountWV,
    requestStatus: state.smartSwitch.requestStatus,
    requestSuccess: state.smartSwitch.requestSuccess,
  };
};

/**
 * Map store dispatch functions to props
 * Map updateSSMountWV, updateSSRequestStatus and updateSSRequestSuccess to props
 *
 * @param {Function} dispatch
 */
const mapDispatchToProps = dispatch => {
  return {
    updateSSMountWV: payload => {
      dispatch(updateSSMountWV(payload));
    },
    updateSSRequestStatus: payload => {
      dispatch(updateSSRequestStatus(payload));
    },
    updateSSRequestSuccess: payload => {
      dispatch(updateSSRequestSuccess(payload));
    },
  };
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(SmartSwitch);

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
