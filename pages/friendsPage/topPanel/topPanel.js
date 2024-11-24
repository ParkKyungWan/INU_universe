import React, { useState } from 'react';

import {View,StyleSheet,Text, TouchableOpacity} from 'react-native';

import AllFriends from './everyFriends/allFriends';
import Friends from './inCollege/friends';
import MyProfile from './myProfile';

const MyButton = () => {
  const [buttonPressCount, setButtonPressCount] = useState(0);

  const handleButtonPress = () => {
    setButtonPressCount(prevCount => (prevCount + 1) % 2);
  };

  //const buttonStyle = (buttonPressCount === 1) ? styles.buttonPressed : styles.button;
  const pressedLeftButtonStyle = buttonPressCount === 1 ? styles.button : styles.leftButtonPressed;
  const pressedRightButtonStyle = buttonPressCount === 0 ? styles.button : styles.rightButtonPressed;


  //const textStyle = buttonPressCount === 1 ? styles.btnTextPressed : styles.btnText;
  const pressedLeftTextStyle = buttonPressCount === 1 ? styles.leftBtnText : styles.pressedLeftBtnText;
  const pressedRightTextStyle = buttonPressCount === 0 ? styles.RightBtnText : styles.pressedRightBtnText;


  return( 
    <>
    <View style={styles.twoBtn}>
      <View style={styles.body}>
        <TouchableOpacity
        activeOpacity={1}
        style={pressedLeftButtonStyle}
        onPress={buttonPressCount? handleButtonPress : ()=>{}}>
          <Text style={pressedLeftTextStyle}>등교 중</Text>
        </TouchableOpacity>
        <TouchableOpacity
        activeOpacity={1}
        style={pressedRightButtonStyle}
        onPress={buttonPressCount? ()=>{} : handleButtonPress }>
          <Text style={pressedRightTextStyle}>모든 친구</Text>
        </TouchableOpacity>
      </View>
    </View>
    <View style={styles.profileCon}>
      <MyProfile style={styles.myProfile}/>
    </View>
    
    {buttonPressCount === 0 ? <Friends/> : <AllFriends/>}
    </>
    );
  
}

const styles = StyleSheet.create({
    twoBtn: {
      marginTop: 80,
      marginBottom: 18,
      //height: 60,
      paddingHorizontal: 24,
    },
    body: {
      flex:1,
      flexDirection: "row",
      backgroundColor: '#F7F7F9',
      borderRadius: 8,
      height: 60,
    },
    leftButtonPressed: {
      flex:1,
      backgroundColor: "#FFFFFF",
      borderRadius: 8,
      marginTop: 6,
      marginBottom: 6,
      marginLeft: 6,
      justifyContent: "center",
      shadowColor: '#000000',
      shadowOpacity: 0.25,
      shadowOffset: {
          width:0,
          height:4
      },
      shadowRadius: 4,
      overflow: 'visible',
    },
    rightButtonPressed: {
      flex:1,
      backgroundColor: "#FFFFFF",
      borderRadius: 8,
      marginTop: 6,
      marginBottom: 6,
      marginRight: 6,
      justifyContent: "center",
      shadowColor: '#000000',
      shadowOpacity: 0.25,
      shadowOffset: {
          width:0,
          height:4
      },
      shadowRadius: 4,
      overflow: 'visible',
    },
    button: {
      flex:1,
      marginTop: 6,
      marginBottom: 6,
      marginLeft: 6,
      justifyContent: "center",
    },
    pressedLeftBtnText:{
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#1C4B95',
    },
    pressedRightBtnText:{
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#1C4B95',
      //marginLeft: 12,
    },
    leftBtnText:{
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#AAB0B7'
    },
    RightBtnText:{
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#AAB0B7',
      marginRight: 12,
    },
    myProfile: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
    },
    profileCon: {
      height:133,

    },
  });
  
export default MyButton;