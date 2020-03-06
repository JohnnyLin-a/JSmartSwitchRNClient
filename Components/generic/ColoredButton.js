/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  TouchableWithoutFeedback,
  Text,
  StyleSheet,
  View,
  Modal,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import FontAwesome, {
  SolidIcons,
  RegularIcons,
  BrandIcons,
} from 'react-native-fontawesome';
import FontAwesomeSpin from './FontAwesomeSpin';

export default class ColoredButton extends Component {
  state = {
    disabled: false,
    disabledComponent: null,
    modalVisible: false,
    errorText: '',
  };

  onPressButton = () => {
    this.setState(
      {
        disabled: true,
        disabledComponent: (
          <FontAwesomeSpin
            style={[styles.textStyle, this.props.textStyle]}
            icon={SolidIcons.syncAlt}
          />
        ),
      },
      () => {
        // const serverErrorTimeout = setTimeout(() => {
        //   this.setState(
        //     {
        //       disabledComponent: (
        //         <Text style={[styles.textStyle, this.props.textStyle]}>
        //           {'Server error '}
        //           <FontAwesome icon={SolidIcons.frown} />
        //         </Text>
        //       ),
        //     },
        //     () => {
        //       setTimeout(() => {
        //         this.setState({disabled: false});
        //       }, 1000);
        //     },
        //   );
        // }, 2000);

        this.props
          .onPress()
          .then(response => {
            console.log('response', response);
            response.status === 200
              ? this.setState(
                  {
                    disabledComponent: (
                      <Text style={[styles.textStyle, this.props.textStyle]}>
                        <FontAwesome icon={SolidIcons.check} />
                      </Text>
                    ),
                  },
                  () => {
                    // clearTimeout(serverErrorTimeout);
                  },
                )
              : this.setState({
                  disabledComponent: (
                    <Text style={[styles.textStyle, this.props.textStyle]}>
                      <FontAwesome icon={SolidIcons.times} />
                    </Text>
                  ),
                  errorText: 'Error status ' + response.status,
                  modalVisible: true,
                });
            setTimeout(() => {
              this.setState({disabled: false});
            }, 1000);
          })
          .catch(error => {
            console.log('error', error);
            this.setState({errorText: error, modalVisible: true});
          });
        // console.log('response', response);
        // if (response.success) {
        //   this.setState({disabled: false});
        // }
      },
    );
  };

  render() {
    return (
      <View
        style={[
          this.state.disabled ? this.props.styleDisabled : this.props.style,
          styles.genericTouchable,
        ]}>
        <TouchableWithoutFeedback
          disabled={this.state.disabled}
          onPress={this.onPressButton}>
          {this.state.disabled ? (
            this.state.disabledComponent
          ) : (
            <Text style={[styles.textStyle, this.props.textStyle]}>
              {this.props.buttonText}
            </Text>
          )}
        </TouchableWithoutFeedback>
        <Modal
          transparent
          animationType="fade"
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setState({modalVisible: false});
          }}>
          <View
            style={{
              flex: 1,
              backgroundColor: '#00000080',
              justifyContent: 'center',
            }}>
            <View style={styles.modalStyle}>
              <View
                style={{
                  flex: 4,
                  justifyContent: 'center',
                  backgroundColor: 'white',
                  borderRadius: 15,
                  marginTop: '5%',
                  marginHorizontal: '5%',
                }}>
                <Text style={styles.textStyle}>{this.state.errorText}</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  backgroundColor: '#ffc107',
                  justifyContent: 'center',
                  borderRadius: 15,
                  margin: '5%',
                }}>
                <TouchableWithoutFeedback
                  style={[styles.genericTouchable]}
                  onPress={() => {
                    this.setState({modalVisible: false});
                  }}>
                  <Text style={styles.textStyle}>Dismiss</Text>
                </TouchableWithoutFeedback>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  genericTouchable: {
    justifyContent: 'center',
    height: responsiveHeight(10),
  },
  textStyle: {
    fontSize: responsiveFontSize(3),
    textAlign: 'center',
  },
  modalStyle: {
    height: responsiveHeight(50),
    marginHorizontal: responsiveWidth(10),
    backgroundColor: 'pink',
    borderRadius: 15,
  },
});
