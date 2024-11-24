import React, { useEffect, useState } from 'react';

/* 하단 네비게이션 바 구현용 라이브러리 */
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Text,Image} from 'react-native';
import HomePage from '../mainPage/homePage';
import FriendsPage from '../friendsPage/friendsPage';
import ChatNav from '../chatPage/chatNav';

const Tab = createBottomTabNavigator();



function BtmNav({navigation}) {
/*
네비게이터 옵션 관련 레퍼런스
https://reactnavigation.org/docs/bottom-tab-navigator/
*/

  return (
      <Tab.Navigator 
      initialRouteName="Home" 
      screenOptions={{
         headerShown: false,
         tabBarStyle: {
            backgroundColor: "#FFF",
            height: 89,
         },
         tabBarActiveTintColor: '#1C4B95',
         tabBarInactiveTintColor: '#D8D8D8',
         tabBarShowLabel: false,
         lazy:false,
        }}
      >
        <Tab.Screen
          name="Friends"
          component={FriendsPage}
          options={{
            title: 'FriendsList',
            tabBarIcon: ({color}) => (
              <Image 
              source={require('./icons/icon_friends.png')}
              tintColor={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Home"
          component={HomePage}
          navigation = {navigation}
          options={{
            title: 'Home',
            tabBarIcon: ({color}) => (
                <Image 
                source={require('./icons/icon_home.png')}
                tintColor={color}
                />
              ),
          }}
        />
        <Tab.Screen
          name="Chat"
          component={ChatNav}
          options={{
            title: 'Chatting',
            tabBarIcon: ({color}) => (
                <Image 
                source={require('./icons/icon_chat.png')}
                tintColor={color}
                />
              ),
          }}
        />
        
      </Tab.Navigator>
    
  );
}

export default BtmNav;