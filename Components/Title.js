import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

class Title extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>{this.props.title}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#DCDCDC',
    height: responsiveHeight(22),
    justifyContent: 'center',
  },
  titleText: {
    textAlign: 'center',
    fontSize: responsiveFontSize(4),
  },
});

export default Title;
