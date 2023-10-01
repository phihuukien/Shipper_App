import { Text } from "react-native";
import React, { useEffect } from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from 'react-redux';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./navigation/TabNavigator";
import SplashScreen from "react-native-splash-screen";
import OrderDetailScreen from "./screens/OrderDetailScreen";
import OrderDetailDeliverring from "./screens/OrderDetailDeliverring";
import { Store } from './Store';

import OrderAction from "./actions/OrderAction";
const Stack = createNativeStackNavigator();

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  })
  return (
    <Provider store={Store}>
      <NavigationContainer >
        <Stack.Navigator>
          <Stack.Screen name="Tabhome" component={TabNavigator} options={{ headerShown: false }}></Stack.Screen>
          <Stack.Screen name="OrderDetail" component={OrderDetailScreen} options={{ headerShown: false }}></Stack.Screen>
          <Stack.Screen name="OrderDetailDeliverring" component={OrderDetailDeliverring} options={{ headerShown: false }}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>

    </Provider>

  )
}
export default App;