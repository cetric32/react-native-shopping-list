import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  FlatList,
  SafeAreaView,
  View,
  Text,
  Alert,
} from 'react-native';
import AddItem from '../components/AddItem';
import Header from '../components/Header';
import ListItem from '../components/ListItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';

export default function ShoppingView({navigation}) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getData().then((result) => {
      setItems(result);
    });
  }, []);

  const toggleCheckBox = (id, value) => {
    getData().then((result) => {
      let newResult = result.map((item) => {
        if (item.id === id) {
          item.isComplete = value;
        }

        return item;
      });

      storeData(newResult).then((res) => {
        if (res) {
          setItems(newResult);
        }
      });
    });
  };

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
    if (!text) {
      Alert.alert('No Item', 'Please Enter an Item', [{text: 'Ok'}]);
      return;
    }

    if (isNaN(price)) {
      Alert.alert('Invalid Price', 'Please Enter a Number', [{text: 'Ok'}]);
      return;
    }

    if (isNaN(quantity)) {
      Alert.alert('Invalid Quantity', 'Please Enter a Number', [{text: 'Ok'}]);
      return;
    }

    getData().then((result) => {
      result.unshift({
        id: Math.random().toString(),
        text: text,
        price: price,
        quantity: quantity,
        isComplete: false,
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
      <Header navigation={navigation} />
      <AddItem addNewItem={addNewItem} />
      {items && items.length > 0 ? (
        <FlatList
          data={items}
          renderItem={({item}) => {
            return (
              <ListItem
                item={item}
                deleteItem={deleteItem}
                toggleCheckBox={toggleCheckBox}
              />
            );
          }}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <View style={styles.emptyViewContainer}>
          <View style={styles.emptyIconView}>
            <Icon name="list" size={35} style={styles.emptyIcon} />
          </View>
          <View style={styles.emptyViewHeader}>
            <Text style={styles.emptyTextHeader}>Your List is Empty</Text>
          </View>
          <View style={styles.emptyContentView}>
            <Text style={styles.emptyContentText}>
              Start adding things you need to make sure nothing is left behind.
            </Text>
          </View>
        </View>
      )}
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
  headerText: {color: 'darkslateblue'},
  emptyViewContainer: {
    alignItems: 'center',
    margin: 3,
  },
  emptyViewHeader: {
    margin: 3,
  },
  emptyTextHeader: {fontWeight: 'bold'},
  emptyContentText: {
    padding: 20,
    textAlign: 'center',
  },
  emptyContentView: {
    width: '70%',
  },
  emptyIconView: {
    width: 80,
    height: 80,
    backgroundColor: '#e3ebfa',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 80,
  },
  emptyIcon: {
    color: 'blue',
  },
});
