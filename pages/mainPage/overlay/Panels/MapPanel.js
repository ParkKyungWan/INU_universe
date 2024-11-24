import {React,useState} from 'react';

import {View,StyleSheet,Text, TouchableOpacity} from 'react-native';
import Pbtn from './pBtn';
import Toast from 'react-native-toast-message';

const MapPanel = props => {

    const onPressMyloc = () =>{
        
        //플레이어 위치가 정상적인지 확인
        if( Object.keys(props.locData).length != 0){
            Toast.show({
                type: 'FiremanToast',
                text1: "[Myloc]",
                text2: " 현재 위치로 이동!",
              });
            props.mapInfo['ref'].current.animateCamera({
                center: props.locData,
              })
        }else{
            Toast.show({
                type: 'FiremanToast',
                text1: "[Loading..]",
                text2: " 위치를 불러오고 있어요..",
              });
        }
    }
  return( 
    <>

    <View style={styles.pDownPanel} >
        <View style={styles.pBodies} >
            <View style={styles.pBtns}>
                <Pbtn btnColor="white" image={require('./assets/pBtn/myloc.png')} func={onPressMyloc}/>
            </View>
        </View>
    </View>
    </>
    );
  
}

const styles = StyleSheet.create({
    pBodies:{
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        pointerEvents: 'box-none',
    },
    pBtns:{
        width: 349,
        display: 'flex',
        flexDirection: 'row-reverse',
        gap: 8,
        pointerEvents: 'box-none',
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
    pDownPanel:{
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        flexDirection: 'row',
        position: 'absolute',
        bottom: 16,
        pointerEvents: 'box-none',
    },
  });
  
export default MapPanel;