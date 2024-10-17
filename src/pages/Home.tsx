import React from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {appName} from '../types/constants';
const Home = () => {
  return (
    <View>
      <Text>{appName}</Text>
      <Icon name="home" size={30} />
    </View>
  );
};

export default Home;
