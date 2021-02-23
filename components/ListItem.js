import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import CheckBox from '@react-native-community/checkbox';
import {Tooltip, Text as EText} from 'react-native-elements';

export default function ListItem({item, deleteItem, toggleCheckBox}) {
  return (
    <TouchableOpacity style={styles.listItem}>
      <View style={styles.listItemView}>
        <Tooltip
          popover={
            <EText>
              Click to {item.isComplete ? 'make Incomplete' : 'Complete'}
            </EText>
          }>
          <CheckBox
            value={item.isComplete}
            onValueChange={(newValue) => toggleCheckBox(item.id, newValue)}
          />
        </Tooltip>

        <Icon name="shopping-basket" size={20} color="green" />
        <Text
          style={styles.listItemText(item.isComplete)}
          onPress={() => {
            toggleCheckBox(item.id, !item.isComplete);
          }}>
          {' '}
          {item.text}
        </Text>
        <Icon
          name="trash"
          size={20}
          color="firebrick"
          onPress={() => {
            deleteItem(item.id);
          }}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  listItem: {
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  listItemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listItemText: (value = false) => {
    let result = {
      color: 'black',
      fontSize: 18,
      width: '80%',
    };

    let line = {
      textDecorationStyle: 'solid',
      textDecorationLine: 'line-through',
    };
    return value ? {...result, ...line} : result;
  },
});
