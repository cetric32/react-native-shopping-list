import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function Header(props) {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => {
          props.navigation.toggleDrawer();
        }}>
        <Icon name="bars" style={styles.icon} />
      </TouchableOpacity>
      <Text style={styles.text}>{props.title}</Text>
    </View>
  );
}

Header.defaultProps = {
  title: 'Shopping List',
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    padding: 15,
    backgroundColor: 'darkslateblue',
    flexDirection: 'row',
  },
  text: {
    color: 'white',
    fontSize: 23,
    textAlign: 'center',
    width: '80%',
  },
  icon: {
    color: 'white',
    fontSize: 23,
    textAlign: 'left',
  },
});
