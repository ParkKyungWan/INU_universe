import React from 'react';

import {View,StyleSheet,Text, ScrollView} from 'react-native';

import TopPanel from './topPanel/topPanel';
import NavDisplayBar from '../mainPage/overlay/navDisplayBar';



function FriendsPage() {
  return( 
    <>
    <ScrollView style={styles.container}>
      <TopPanel/>
    </ScrollView>
    <NavDisplayBar loc={0}/>
    </>
    );
  
}

const styles = StyleSheet.create({
    container: {
      //flex:1,
      backgroundColor:"#FFFFFF"
    },
    bottom: {
      //display: 'flex',
      flexDirection: 'column',
      flex: 1,
    },
  });
  
export default FriendsPage;