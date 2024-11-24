import React, { useEffect } from 'react';
import { Text, View, } from 'react-native';
import { VerifyToken } from './VerifyToken';

const Splash = ({navigation}) => {
    useEffect(()=>{
        VerifyToken(navigation);
    },[])
    
  return (
    <View style ={{backgroundColor:"#FFFFFF",flex:1}}>
    </View>
    );
}

export default Splash;