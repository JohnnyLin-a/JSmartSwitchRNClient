import React, {Component} from 'react';
import {Text, SafeAreaView, StyleSheet} from 'react-native';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

/**
 * Component for TitleHeader
 *
 * @example
 * const title = <Text>Title</Title>
 * return (
 *  <TitleHeader title={title} />
 * )
 */
class TitleHeader extends Component {
  /**
   * render view for TitleHeader
   */
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.titleText}>{this.props.title}</Text>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DCDCDC',
    justifyContent: 'center',
  },
  titleText: {
    textAlign: 'center',
    fontSize: responsiveFontSize(4),
  },
});

export default TitleHeader;
