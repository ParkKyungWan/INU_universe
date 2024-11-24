import BtmNav from './pages/btmNavigator/btmNav';
import Splash from './auth/Splash';
import LoginPage from './auth/LoginPage';


import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";

import * as Linking from 'expo-linking';
import { useEffect } from 'react';
import { requestAddFriend } from './auth/VerifyToken';

export default function App() {
  //for linking
  const url = Linking.useURL();
  // App.js > App()

  const handleURL = async (url) => {
    const { hostname, path, queryParams } = Linking.parse(url);
    if (path === 'addFriend') {
        await requestAddFriend(queryParams.token);
    } else {
        //console.log(path, queryParams.token);
    }
  }

  useEffect(() => {
    // Do something with URL
    if (url) {
        handleURL(url);
    } else {
        //console.log('No URL');
    }
  }, [url])

  //for navigate
  const Stack = createStackNavigator();

  return(
    <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Splash" 
          screenOptions = {{ headerShown: false, animationEnabled: false }}
          >
            <Stack.Screen name="Splash"  component={Splash} />
            <Stack.Screen name="Auth" component={LoginPage}/>
            <Stack.Screen name="Main" component={BtmNav} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}
