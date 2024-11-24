import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
//import { NavigationContainer } from "@react-navigation/native";
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import ChatPage from './chatPage';
import ChatRoom from './chatRoom';


const Stack = createStackNavigator(); 

function ChatNav({navigation, route, onRouteChange}) {
  // const [currentRoute, setCurrentRoute] = useState('');

  // useEffect(() => {
  //   const routeName = getFocusedRouteNameFromRoute(route);
  //   console.log('Current Route in ChatNav:', routeName);

  //   // Pass the routeName to the callback in the parent component
  //   onRouteChange(routeName);
  // }, [route, onRouteChange]);
  
  return (
      <Stack.Navigator
        initialRouteName="ChatPage"
        screenOptions = {{ headerShown: false, lazy:false }}
      >
        <Stack.Screen
        name="ChatPage"
        component={ChatPage}
        options={{ title: 'chatPage'}}
        initialParams={{ screenName: "ChatPage" }}
        />
        <Stack.Screen
        name="ChatRoom"
        component={ChatRoom}
        navigation = {navigation}
        options={{ title: 'chatRoom' }}
        initialParams={{ screenName: "ChatRoom" }}
        />
      </Stack.Navigator>
  );
} 

export default ChatNav;