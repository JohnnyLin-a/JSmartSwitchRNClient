/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import SmartSwitch from './Components/SmartSwitch';
import {Provider} from 'react-redux';
import store from './store/store';

const App: () => React$Node = () => {
  return (
    <Provider store={store}>
      <View style={{flex: 1}}>
        <SmartSwitch />
      </View>
    </Provider>
  );
};

export default App;
