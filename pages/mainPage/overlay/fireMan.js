/* 횃불이 캐릭터 버튼(위치 공개 범위 지정용) */

import React from 'react';
import {View,StyleSheet,Image,TouchableOpacity} from 'react-native';
import Toast from 'react-native-toast-message';

function FireMan() {

  const saySomething = () =>{

    const sentences = [
      ["저는 유니버스의 가이드"," 횃불이에요!"],
      ["전부터 봐왔는데.."," 인기 많으실 듯"],
      ["졸업하기 싫다~"," 몇 학년이세요?"],
      ["오늘 학식 뭐더라.."," 혹시 아세요?"],
      ["저는 국밥이 제일 맛있던데요!",""],
      ["후아아암.."," 앗"],
      ["우리 학교 정말 좋죠 ?!"," 완전 만족!"],
      ["애들이 다 어디갔지.."," 얘들아~"],
    ]
    
    const randSent = sentences[ Math.floor(Math.random() * sentences.length) ]
    Toast.show({
      type: 'FiremanToast',
      text1: randSent[0],
      text2: randSent[1],
    });
  }
  return( 
    <>
    <View style={styles.body}>
        <TouchableOpacity activeOpacity="0.6" onPress={()=>{saySomething()}}>
          <Image 
              style={styles.fireman}
              source={require('./assets/charactor/fireman.png')}
          />
        </TouchableOpacity>
    </View>
    </>
    );
  
}

const styles = StyleSheet.create({
    body: {
      display: 'flex',
      flexDirection: 'row',
      position: 'absolute',
      bottom: 10,
      width: '100%',
      justifyContent:'center', 
      pointerEvents:'box-none',
    },
    fireman: {
        width: 52,
        height: 103,
        shadowColor: '#000000',
        shadowOpacity: 0.5,
        shadowOffset: {
            width:0,
            height:4
        },
        shadowRadius: 4,
        overflow: 'visible',
    }
  });
  
export default FireMan;