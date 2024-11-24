import React, { useEffect,useState } from 'react';

import {View,StyleSheet,Text, ScrollView} from 'react-native';
import ChatList from './chatList';

import AsyncStorage from '@react-native-async-storage/async-storage';
import socket from "../../socket.js";

function ChatPage() {
  
  const [stacks,setStacks] = useState({});

  const clearStacks=( name )=>{
    let tmp_stack = stacks;
    stacks[name] = 0;
    setStacks(tmp_stack);
  }
  async function changeChatStorage_recieve( who, what, sender ){
    /*console.log(who,what)
    setMessages(prevMessages => [...prevMessages, { from: who, text: what} ]);
    const value = await AsyncStorage.getItem("chats");
    let chatOrigin_ = JSON.parse(value);
    chatOrigin_[route.params.reciever] = [...chatOrigin_[route.params.reciever], { from: who, text: what }];
    await AsyncStorage.setItem('chats',JSON.stringify(chatOrigin_));
    console.log(chatOrigin_);*/

    //채팅 추가
    const value = await AsyncStorage.getItem("chats");
    let chatOrigin_ = JSON.parse(value);
    //console.log(route.params.reciever);
    //console.log(chatOrigin_[sender]);
    let orgMessage = []
    try{ 
      orgMessage = chatOrigin_[sender];
      //console.log(orgMessage);
      delete chatOrigin_[sender] //채팅 맨 위로 올리기
      const newMessage = [ ...orgMessage, { from: who, text: what} ]
      chatOrigin_[sender] = newMessage;
    } catch{//메세지가 왔는데 해당 유저가 보낸 메세지는 처음일 때
      orgMessage = []
      const newMessage = [ ...orgMessage, { from: who, text: what} ]
      chatOrigin_[sender] = newMessage;
    }
    
    //안 읽은 메세지 수 증가

    
    
    let stacks_tmp = stacks;
    stacks_tmp[sender] = stacks_tmp[sender]==undefined? 1 : stacks_tmp[sender]+1;
    setStacks(stacks_tmp);

    
    //채팅 변화 내용 업데이트
    AsyncStorage.setItem('chats',JSON.stringify(chatOrigin_));
    //console.log(newMessage);
  }
  useEffect( ()=>{
    
    async function setSocket(){

      socket.on('message',(message,sender)=>{
        //console.log(sender);
        changeChatStorage_recieve(0,message,sender);
      })

      
    }
    setSocket();

  },[]);


   /*채팅중인거만 가져오기*/
  
   const [chatNames, setChatNames] = useState([]); 

   useEffect( ()=>{
 
     async function setChatStorage(){
       const value = await AsyncStorage.getItem("chats");
       const value_json = JSON.parse(value);
  
       let _chatNames = Object.keys(value_json);
      
       for ( let i = 0 ; i < _chatNames.length; i++){
          const _lastChat = value_json[ _chatNames[i] ][ value_json[ _chatNames[i] ].length-1 ].text
          _chatNames[i] = [ _chatNames[i], _lastChat ]
       }
      
      setChatNames(_chatNames);
 
     }
     setChatStorage();
 
   })
   /*채팅중인거만 가져오기*/

  return( 
    <>
    <View style={styles.top}/>
    <ScrollView style={styles.scrollView}>
      <View style={styles.body}>
          <Text style={styles.text}>
            채팅
          </Text>
      </View>
      <View style={styles.room}>
        {chatNames.reverse().map((name, index) => (
          <ChatList key={index} targetName={name[0]} lastChat={name[1]} stacks={stacks} clear={clearStacks}/>
        ))}
      </View>
    </ScrollView>
    <NavDisplayBar loc={2} />
    </>
    );
  
}

const styles = StyleSheet.create({
    top: {
      backgroundColor: "#1C4B95",
      height:136,
      //flex:1,
    },
    scrollView: {
      backgroundColor:"#ffffff"
    },
    body: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: "center",
    },
    text: {

      fontSize:20,
      fontWeight:"bold",
      flex: 1,
      //justifyContent: "center",
      marginTop:39,
      marginLeft:28,
      marginBottom:15,
    },
    room: {
      height:71,
      //flex:1
    }
  });
  
export default ChatPage;