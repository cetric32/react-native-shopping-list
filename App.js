import React, {useState} from 'react';
import {StyleSheet, FlatList, SafeAreaView} from 'react-native';
import AddItem from './components/AddItem';
import Header from './components/Header';
import ListItem from './components/ListItem';

export default function App() {
  const [items, setItems] = useState([
    {id: Math.random().toString(), text: 'Milk'},
    {id: Math.random().toString(), text: 'Eggs'},
    {id: Math.random().toString(), text: 'Lemons'},
    {id: Math.random().toString(), text: 'Cheese'},
    {id: Math.random().toString(), text: 'Choma'},
  ]);

  const deleteItem = (id) => {
    setItems((prevItems) => {
      return prevItems.filter((item) => {
        return item.id !== id;
      });
    });
  };

  const addNewItem = (text) => {
    setItems([{id: Math.random().toString(), text: text}, ...items]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <AddItem addNewItem={addNewItem} />
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
});
