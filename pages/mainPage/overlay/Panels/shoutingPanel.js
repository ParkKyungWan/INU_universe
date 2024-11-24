import React, { useState } from 'react';

import { token_socket_logout } from '../../../../auth/VerifyToken';
import {View,StyleSheet,Text,Image,TextInput} from 'react-native';

import Pbtn from './pBtn';

//토스트메세지 라이브러리
import Toast from 'react-native-toast-message';

const logout = (nav) =>{
    token_socket_logout();
    nav.replace('Splash');

}
function ShoutingPanel(props) {

    const [notice,setNotice] = useState(true);
    const changeNotice = () =>{
        if(!notice){
            Toast.show({
                type: 'FiremanToast',
                text1: '[Notification/ON]',
                text2: ' 알림을 켰어요!'
            });
        }else{
            Toast.show({
                type: 'FiremanToast',
                text1: '[Notification/OFF]',
                text2: ' 알림을 끌게요~!'
            });
        }
        setNotice(!notice);
    }

  return( 
    <>
    <View style={styles.panel}>
        <View style={styles.pBodies}>
            <View style={[styles.pBody, styles.pDropShadow]}>
                <Image 
                    style={styles.pBodySearchIcon}
                    source={require('./assets/Icons/friendSearchIcon.png')}
                />
                <TextInput 
                    style={styles.pBodySearchInput}
                    placeholder="등교 중인 친구 검색.."
                />
            </View>
            <View style={styles.pBtns}>
                <Pbtn 
                    btnColor="white" 
                    image={require('./assets/pBtn/logout.png')} 
                    func={()=>{logout(props.navigation)}}/>
                <Pbtn btnColor={notice? "#1C4B95":"#858585"} func={()=>{changeNotice();}} image={ notice ? require('./assets/pBtn/notice.png') : require('./assets/pBtn/no_notice.png') } />
            </View>
        </View>
    </View>
    
    </>
    );
  
}

const styles = StyleSheet.create({
    panel: {
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        flexDirection: 'row',
        position: 'absolute',
        top: 60,
        pointerEvents: 'box-none',

    },
    pBodies:{
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        pointerEvents: 'box-none',
    },
    pBody:{
        width: 349,
        height: 56,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        paddingLeft: 17,
        paddingRight: 17,
        gap: 11,
        pointerEvents: 'box-none',
        

    },
    pBodySearchIcon:{
        marginTop: 12,
        width: 32,
        height: 32,

    },
    pBodySearchInput:{
        marginTop: 1,
        width: '100%',
        height: '100%',
        fontSize: 17,
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
    
  });
  
export default ShoutingPanel;