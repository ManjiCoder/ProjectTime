import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StatusBar} from 'react-native';
import MyTabs from './navigator/Bottom';

const App = () => {
  return (
    <NavigationContainer>
      <MyTabs />
      <StatusBar barStyle={'default'} />
    </NavigationContainer>
  );
};

export default App;
