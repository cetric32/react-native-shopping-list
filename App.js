import React, {useEffect, useState} from 'react';
import {StyleSheet, FlatList, SafeAreaView, View, Text} from 'react-native';
import AddItem from './components/AddItem';
import Header from './components/Header';
import ListItem from './components/ListItem';
import RNFS from 'react-native-fs';

export default function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    let path = RNFS.DocumentDirectoryPath + '/shopping.json';
    RNFS.exists(path)
      .then((result) => {
        if (result) {
          // if we have a file, read it
          return RNFS.readFile(path);
        } else {
          return false;
        }
      })
      .then((content) => {
        console.log(content);
        if (content) {
          setItems(JSON.parse(content));
        }
      })
      .catch((err) => console.log(err.message, err.code));
  }, []);

  const deleteItem = (id) => {
    setItems((prevItems) => {
      return prevItems.filter((item) => {
        return item.id !== id;
      });
    });

    save_data_to_file();
  };

  const save_data_to_file = () => {
    let path = RNFS.DocumentDirectoryPath + '/shopping.json';

    RNFS.exists(path)
      .then((result) => {
        return result;
      })
      .then((content) => {
        if (content) {
          return RNFS.unlink(path);
        } else {
          return true;
        }
      })
      .then(() => {
        return RNFS.writeFile(path, JSON.stringify(items));
      })
      .then((success) => {
        console.log('FILE WRITTEN!');
      })
      .catch((err) => {
        console.log(err.message, err.code);
      });
  };

  const addNewItem = (text, price = 0, quantity = 1) => {
    setItems([
      {
        id: Math.random().toString(),
        text: text,
        price: price,
        quantity: quantity,
      },
      ...items,
    ]);
    save_data_to_file();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <AddItem addNewItem={addNewItem} />
      {items.length > 0 ? (
        <View style={styles.headeView}>
          <Text>ITEM</Text>
          <Text>PRICE</Text>
          <Text>QUANTITY</Text>
          <Text />
        </View>
      ) : null}
      <FlatList
        data={items}
        renderItem={({item}) => {
          return <ListItem item={item} deleteItem={deleteItem} />;
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headeView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    fontSize: 25,
  },
});
