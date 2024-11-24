import React from 'react';

import {View,StyleSheet,Text,Image, TouchableOpacity} from 'react-native';

Pbtn = props => {

  return( 
    <>
    <TouchableOpacity activeOpacity={0.5} onPress={()=>{props.func()}}>
    <View style={[ styles.pBtn, styles.pDropShadow, {backgroundColor: props.btnColor} ]}>
        <View style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
            <Image 
                style={styles.pBtnInnerImage}
                source={props.image}
            />
        </View>
    </View>
    </TouchableOpacity>
    </>
    );
  
}

const styles = StyleSheet.create({
    pBtn:{
        width: 47,
        height: 47,
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    pBtnInnerImage:{
        width: 26,
        height: 26,
    },
    pDropShadow:{
        shadowColor: '#000000',
        shadowOpacity: 0.25,
        shadowOffset: {
            width:0,
            height:4
        },
        shadowRadius: 4,
        overflow: 'visible',
    },
  });
  
export default Pbtn;