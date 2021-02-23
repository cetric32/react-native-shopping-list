import React from 'react';
import {
  Linking,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Header from '../components/Header';

export default function AboutView({navigation}) {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Header navigation={navigation} />
        <Text style={styles.text}>
          A simple App to manage your Shopping List. Allows you to Add and
          Delete Items.
        </Text>
        <Text style={styles.text}>Developed by:</Text>

        <TouchableOpacity
          style={styles.link}
          onPress={() => Linking.openURL('https://linkedin.com/in/cetric32')}>
          <Text style={styles.linkText}>Cetric Lihalakha</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    padding: 5,
    fontSize: 20,
  },
  link: {
    padding: 9,
    width: '100%',
    margin: 2,
  },
  linkText: {
    color: 'blue',
    fontSize: 20,
  },
});
