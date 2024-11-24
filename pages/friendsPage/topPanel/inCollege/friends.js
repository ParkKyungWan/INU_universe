import {React,useEffect,useState} from 'react';
import {View,StyleSheet,Text, Image, ScrollView,TouchableOpacity} from 'react-native';
import Friend from '../../friend.js';

import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage'

import { getTokenFromLocal, URL } from '../../../../auth/VerifyToken.js';
import friend from '../../friend.js';
import { getFriendUrl } from '../util/firendLink.js';

function Friends() {
  const [myfriends, setMyfriends] = useState([])
  const [myID, setMyID] = useState(0)


  useEffect( () => {
    const getToken = async () =>{
      const Token = await getTokenFromLocal();
      //console.log(Token.accessToken)
      axios
        .get( `${URL}/api/v1/user/friend/findInSchool`,
        {
          headers: {
          "Authorization" : `Bearer ${Token.accessToken}`
          }
        })
        .then((res) => {
          setMyfriends(res.data.data.friendList);
          setMyID(res.data.data.userId)
        })
        .catch((err) => {
          if(err.response.status === 404){

          }
          else{
              console.log(err)
          } 
        });
    }
    getToken();
    
  }, []);

  const getInSchoolTime = ( whenOnSchool )=>{
    const now = new Date();
    const targetTime = new Date(whenOnSchool);
    const differenceInMinutes = Math.round((now - targetTime) / (1000 * 60));
    return differenceInMinutes;
  }

  const showFriends = () =>{
    let friendsContainerArr = [];
    for( i = 0; i < myfriends.length ; i++){
      friendsContainerArr.push(
        <Friend key={i} inSchool={1} inSchoolTime={getInSchoolTime(myfriends[i].schoolDate)} name={myfriends[i].friendName}/>
  
      )
    }
    return friendsContainerArr;
  }
  
  
  return( 
    <>
    <View style={styles.body}>
      <View style={styles.leftText}>
        <Text style={styles.bodyText}>등교 중 <Text style={styles.bodyCountText}>{myfriends.length}</Text>명</Text>
        {/* <Text style={styles.bodyCountText}>5</Text>
        <Text style={styles.bodyText}>명</Text> */}
      </View>
      <View style={styles.rightText}>
        <TouchableOpacity onPress={()=>{getFriendUrl()}}>
        <Text style={styles.innerRightText}>
          친구 추가
        </Text>
        </TouchableOpacity>
      </View>
    </View>
    {showFriends()}
    
    
    </>
    );
}

const styles = StyleSheet.create({
    body: {
      height: 58,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    leftText:{
      flexDirection: 'row',
      marginTop: 23,
      marginLeft: 28,
    },
    rightText:{
      marginTop: 23,
      marginRight: 39,
    },
    innerRightText:{
      color: '#1C4B95',
      fontWeight: 'bold',
      fontSize: 16,
    },
    bodyText: {
      fontSize: 18,
      fontWeight: '600',
      textAlign: 'center',
      color: '#000000',
      
    },
    bodyCountText: {
      color: '#1C4B95',
      fontWeight: 'bold',
    },
    scrollContainer: {
      paddingVertical: 16,
    },
  });
  
export default Friends;