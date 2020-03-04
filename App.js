/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';

import SmartSwitch from './Components/SmartSwitch';

const App: () => React$Node = () => {
  return (
    <View style={{flex: 1}}>
      <SmartSwitch />
    </View>
  );
};

export default App;
