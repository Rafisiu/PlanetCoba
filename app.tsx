import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from "react-redux";
import store from "./src/redux/store";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PlanetList from './src/screens/PlanetList';
import PlanetDetail from './src/screens/PlanetDetail';
import Wishlist from './src/screens/Wishlist';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const PlanetStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="PlanetList" component={PlanetList} options={{ title: 'List of Planets' }} />
    <Stack.Screen name="PlanetDetail" component={PlanetDetail} options={{ title: 'Planet Detail' }} />
  </Stack.Navigator>
);

const App = () => (
  <Provider store={store}>
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Planets" component={PlanetStack} />
        <Tab.Screen name="Wishlist" component={Wishlist} />
      </Tab.Navigator>
    </NavigationContainer>
  </Provider>
);

export default App;