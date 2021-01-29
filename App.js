import React, {useEffect, useState} from 'react';
import {StyleSheet, FlatList, SafeAreaView, View, Text} from 'react-native';
import AddItem from './components/AddItem';
import Header from './components/Header';
import ListItem from './components/ListItem';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getData().then((result) => {
      setItems(result);
    });
  }, []);

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('shopping', jsonValue);
      return true;
    } catch (e) {
      console.log('save data error', e);
    }
  };

  const deleteItem = (id) => {
    setItems((prevItems) => {
      return prevItems.filter((item) => {
        return item.id !== id;
      });
    });

    getData().then((result) => {
      let newResult = result.filter((item) => {
        return item.id !== id;
      });

      storeData(newResult).then((res) => {
        if (res) {
          setItems(newResult);
        }
      });
    });
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('shopping');
      let result = jsonValue != null ? JSON.parse(jsonValue) : [];
      return result;
    } catch (e) {
      console.log('error reading value', e);
    }
  };

  const addNewItem = (text, price = 0, quantity = 1) => {
    getData().then((result) => {
      result.unshift({
        id: Math.random().toString(),
        text: text,
        price: price,
        quantity: quantity,
      });

      storeData(result).then((res) => {
        if (res) {
          setItems(result);
        }
      });
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <AddItem addNewItem={addNewItem} />
      {items && items.length > 0 ? (
        <View style={styles.headerView}>
          <Text>ITEM</Text>
          <Text>PRICE</Text>
          <Text>QUANTITY</Text>
          <Text />
        </View>
      ) : null}
      {items ? (
        <FlatList
          data={items}
          renderItem={({item}) => {
            return <ListItem item={item} deleteItem={deleteItem} />;
          }}
        />
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 5,
    fontSize: 25,
  },
});
