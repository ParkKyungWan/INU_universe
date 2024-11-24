import {View,StyleSheet,Text,Image, TouchableOpacity} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import useInterval from '../mainPage/util/useInterval';
import { useState } from 'react';

function ChatList({targetName,lastChat,stacks,clear}) {
  const navigation = useNavigation();
  
  const [stack,setStack] = useState(0);

  useInterval(async()=>{
    const stack_tmp = stacks[targetName];
    if(stack_tmp != null){
      setStack(stack_tmp)
    }
    
  },200)
  return(
    <TouchableOpacity
      onPress={() => navigation.navigate("ChatRoom", { screen: 'ChatRoom', reciever: targetName, clear: clear, sender: async () =>{return await getUserName()} })}
    >
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/emotions/emo_1.jpg')}
            style={styles.image}
          />
        </View>
        <View style={styles.nameAndMessage}>
          <Text style={styles.name}>{targetName}</Text>
          <Text style={styles.message}>{lastChat}</Text>
        </View>
        <View style={styles.timeAndCount}>
         { stack ?
          <View style={styles.count}>
             <Text style={styles.countText}>{stack}</Text>
          </View>
          :null
         }
        </View>
        <View style={styles.arrowContainner}>
          <Image 
              style={styles.arrow}
              source={require('./assets/Chevron.png')} />
        </View>
      </View>
      <View style={styles.separator} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    container: {
      display:'flex',
      flexDirection: 'row',
      paddingLeft: 28,
      paddingRight: 12,
      alignItems: 'center',
        //height: 71,
        //width: 375,
      },
      imageContainer: {
        //width: 90,
        marginRight: 12,
        overflow: 'hidden', // borderRadius가 적용되려면 overflow: 'hidden'이 필요함
      },
      image: {
        marginTop: 11,
        marginBottom: 9,
        width: 50,
        height: 50,
        borderRadius: 25,
      },
      image_inSchool: {
        marginTop: 10,
        marginBottom: 9,
        width: 50,
        height: 50,
        borderRadius: 25,
        borderColor: '#1C4B95',
        borderWidth: 2,
      },
      nameAndMessage: {
        flex:200,
        //width: 200,
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
      },
      name: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 3,
      },
      message: {
        height:17,
        fontSize: 14,
        fontWeight: 'bold',
        //marginTop: 10,
        fontWeight:400,
      },
      timeAndCount: {
        //marginLeft:20,
        flex:35,
        display: 'flex',
        //width:35,
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
      },
      time: {
        //flex:1,
        height:15,
        marginBottom:4,
      },
      timeText_inSchool: {
        fontWeight:"bold",
        fontSize: 12,
        color:"#1C4B95",
      },
      timeText: {
        fontWeight:"bold",
        fontSize: 12,
        color:"#58616A",
      },
      count: {
        //flex:1,
        height:20,
        width:25,
        marginLeft:8,
        backgroundColor:"#1C4B95",
        borderRadius:8,
        justifyContent:"center",
      },
      countText: {
        fontWeight:"700",
        fontSize: 14,
        color:"#FFFFFF",
        marginLeft:8,
      },
      description: {
        fontSize: 14,
        color: '#555',
      },
      arrowContainner: {
        marginLeft:11,
        display: 'flex',
        flexDirection:'column',
        justifyContent: 'center',
      },
      arrow: {
        width: 24,
        height: 24,
        marginLeft: 0
      },
      separator: {
        backgroundColor: '#F7F7F9',
        height:1,
      },
      onlineIndicator: {
        position: 'absolute',
        width: 15,
        height: 15,
        backgroundColor: '#2DCA8C',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'white',
        bottom: 10 ,
        right: 0,
      },
    });

export default ChatList;