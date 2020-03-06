import React, {Component} from 'react';
import {TouchableWithoutFeedback, Text, StyleSheet, View} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
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
        const serverErrorTimeout = setTimeout(() => {
          this.setState(
            {
              disabledComponent: (
                <Text style={[styles.textStyle, this.props.textStyle]}>
                  {'Server error '}
                  <FontAwesome icon={SolidIcons.frown} />
                </Text>
              ),
            },
            () => {
              setTimeout(() => {
                this.setState({disabled: false});
              }, 1000);
            },
          );
        }, 2000);

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
                    clearTimeout(serverErrorTimeout);
                  },
                )
              : this.setState({
                  disabledComponent: (
                    <Text style={[styles.textStyle, this.props.textStyle]}>
                      <FontAwesome icon={SolidIcons.times} />
                    </Text>
                  ),
                });
            setTimeout(() => {
              this.setState({disabled: false});
            }, 1000);
          })
          .catch(error => {
            console.log('error', error);
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
});
