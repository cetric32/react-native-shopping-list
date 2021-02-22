import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import ShoppingView from './Views/ShoppingView';
import AboutView from './Views/AboutView';
import {createDrawerNavigator} from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={ShoppingView} />
        <Drawer.Screen name="About" component={AboutView} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
