/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

/**
 * Component not used in the app (yet).
 */
export default class ColorfulModal extends Component {
  state = {modalVisible: null};

  componentDidMount = () => {
    if (this.props.modalVisible) {
      this.setState({modalVisible: this.props.modalVisible});
    }
  };

  componentDidUpdate = prevProps => {
    if (prevProps.modalVisible !== this.props.modalVisible) {
      this.setState({modalVisible: this.props.modalVisible});
    }
  };

  render() {
    return (
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
              {this.props.children}
            </View>

            <TouchableWithoutFeedback
              style={[styles.genericTouchable]}
              onPress={() => {
                this.setState({modalVisible: false});
              }}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: '#ffc107',
                  borderRadius: 15,
                  marginHorizontal: '5%',
                  marginVertical: '5%',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(2.5),
                    textAlign: 'center',
                  }}>
                  Dismiss
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </Modal>
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
