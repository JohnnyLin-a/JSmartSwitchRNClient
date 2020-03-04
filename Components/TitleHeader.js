import React, {Component, Fragment} from 'react';
import {Text, SafeAreaView, StyleSheet} from 'react-native';
import {
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

class TitleHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Fragment>
        <SafeAreaView style={styles.container}>
          <Text style={styles.titleText}>{this.props.title}</Text>
        </SafeAreaView>
      </Fragment>
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

export default TitleHeader;
