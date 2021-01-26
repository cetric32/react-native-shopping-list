import React, {useState} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

export default function AddItem({addNewItem}) {
  const [text, setText] = useState('');

  const onChange = (textValue) => {
    setText(textValue);
  };

  const addItem = () => {
    if (!text) {
      Alert.alert('No Item', 'Please Enter an Item', [{text: 'Ok'}]);
      return;
    }
    addNewItem(text);
    setText('');
  };

  return (
    <View>
      <TextInput
        value={text}
        placeholder="Add Item..."
        style={styles.input}
        onChangeText={onChange}
      />
      <TouchableOpacity style={styles.btn} onPress={addItem}>
        <Text style={styles.btnText}>
          <Icon name="plus" size={20} /> Add Item
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    padding: 8,
    height: 60,
    fontSize: 16,
  },
  btn: {
    backgroundColor: '#c2ba28',
    padding: 9,
    margin: 5,
  },
  btnText: {
    color: 'darkslateblue',
    fontSize: 20,
    textAlign: 'center',
  },
});
