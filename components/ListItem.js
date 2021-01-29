import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
export default function ListItem({item, deleteItem}) {
  const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
  return (
    <TouchableOpacity style={styles.listItem}>
      <View style={styles.listItemView}>
        <Text style={styles.listItemText}>{item.text}</Text>
        <Text style={styles.listItemText}>{formatNumber(item.price)}</Text>
        <Text style={styles.listItemText}>{formatNumber(item.quantity)}</Text>
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
  listItemText: {color: 'black', fontSize: 18},
});
