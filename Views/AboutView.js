import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import Header from '../components/Header';

export default function AboutView({navigation}) {
  return (
    <SafeAreaView>
      <View>
        <Header navigation={navigation} />
        <Text>About Us</Text>
      </View>
    </SafeAreaView>
  );
}
