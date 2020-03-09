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
import {
  updateSSMountWV,
  updateSSRequestStatus,
  updateSSRequestSuccess,
} from '../actions/SmartSwitchStatusActions';

class SmartSwitch extends Component {
  componentDidMount = () => {
    console.log('componentDidMount', this.props);
    console.log('State at componentDidMount', this.state);
  };

  networkRequest = index => {
    let requestSuccess = [...this.props.requestSuccess];
    requestSuccess[index] = true;
    this.props.updateSSRequestSuccess(requestSuccess);
    let mountWV = [...this.props.mountWV];
    mountWV[index] = true;
    this.props.updateSSMountWV(mountWV);
  };

  onPressButton = index => {
    console.log('onPressButton ' + index);
    let requestStatus = [...this.props.requestStatus];
    requestStatus[index] = TextStatus.PROCESSING;
    this.props.updateSSRequestStatus(requestStatus);
    this.networkRequest(index);
    // this.setState({requestStatus: status}, () => {
    //   this.networkRequest(index);
    // });
  };

  onHttpError = (index, syntheticEvent) => {
    const {nativeEvent} = syntheticEvent;
    if (nativeEvent.statusCode !== 200) {
      let requestSuccess = [...this.props.requestSuccess];
      requestSuccess[index] = false;
      this.props.updateSSRequestSuccess(requestSuccess);
      // this.setState({success: success});
    }
  };

  onMessage = event => {
    console.log(event);
    // let mountWV = [].concat(this.state.mountWV);
    // mountWV[index] = false;
    // let status = [].concat(this.state.requestStatus);
    // status[index] = TextStatus.DONE;
    // this.setState({
    //   mountWV: mountWV,
    //   requestStatus: status,
    // });
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
                    this.onPressButton(index);
                  }}>
                  <TextWithStatus
                    style={buttonData.textStyle}
                    status={
                      this.props.requestStatus.includes(index)
                        ? this.props.requestStatus[index]
                        : TextStatus.IDLE
                    }>
                    {buttonData.buttonText}
                  </TextWithStatus>
                </ColoredButton>
                {this.props.mountWV.includes(index) && (
                  <View style={{height: 0, width: 0}}>
                    <WebView
                      key={'webview' + index}
                      source={{uri: buttonData.URI}}
                      onMessage={this.onMessage}
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

const mapStateToProps = state => {
  return {
    mountWV: state.smartSwitch.mountWV,
    requestStatus: state.smartSwitch.requestStatus,
    requestSuccess: state.smartSwitch.requestSuccess,
  };
};

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
