

import React, { useEffect } from "react";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DeliveringScreen from "../screens/DeliveringScreen";
import Display from "../contants/Display";
import Colors from "../contants/Colors";
import OrderScreen from "../screens/OrderScreen";
import OrderAction from "../actions/OrderAction";
import { useSelector, useDispatch } from 'react-redux';
const BottomTabsN = createBottomTabNavigator();

const BottomTabs = () =>{
  const dispatch = useDispatch<any>();
  useEffect(() => {
    dispatch(OrderAction.getOrderDeliverring());
  })
return (

  <BottomTabsN.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: {
        position: 'absolute',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        height: Display.setHeight(8),
        backgroundColor: Colors.DEFAULT_WHITE,
        borderTopWidth: 0,
      },
      tabBarShowLabel: true,
      tabBarActiveTintColor: Colors.DEFAULT_GREEN,
      tabBarInactiveTintColor: Colors.INACTIVE_GREY,
    }}>
    <BottomTabsN.Screen
      name="Order"
      component={OrderScreen}
      options={{
        tabBarIcon: ({color}) => (
          <Ionicons name="home-outline" size={23} color={color} />
        ),
      }}
    />
     
    <BottomTabsN.Screen
      name="Delivering"
      component={DeliveringScreen}
      options={{
        tabBarIcon: ({color}) => (
          <Ionicons name="reorder-four-sharp" size={23} color={color} />
        ),
      }}
    />
   
   
  </BottomTabsN.Navigator>
)
    }
export default BottomTabs;