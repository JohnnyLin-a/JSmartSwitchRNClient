import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';

class Title extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.props.title}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'grey',
    // height: 22,
  },
});

export default Title;
