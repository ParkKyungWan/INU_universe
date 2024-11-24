import React, { useState, useRef, useEffect } from "react";
import { Image,View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView } from "react-native";
//import { useNavigation } from "@react-navigation/native";

import AsyncStorage from '@react-native-async-storage/async-storage'

import { getUserName } from "../../auth/VerifyToken.js";
import socket from "../../socket.js";


const ChatRoom = ({navigation, route, clear}) => {
  /* 채팅 테스트 시작*/


  const [messages, setMessages] = useState([]);

  useEffect( ()=>{

    async function setChatStorage(){
      
      route.params.clear(route.params.reciever);
      //쌓인 스택 초기화

      const name = await getUserName();
      setUserName( name );
      console.log(name);

      const value = await AsyncStorage.getItem("chats");
      let chatOrigin_ = JSON.parse(value);
      if(chatOrigin_[route.params.reciever]){
        setMessages(chatOrigin_[route.params.reciever]);
      }

    }
    setChatStorage();

    return ()=>{
      route.params.clear(route.params.reciever);
      //쌓인 스택 초기화
    }
  },[])

  
  async function changeChatStorage( who, what ){
    /*console.log(who,what)
    setMessages(prevMessages => [...prevMessages, { from: who, text: what} ]);
    const value = await AsyncStorage.getItem("chats");
    let chatOrigin_ = JSON.parse(value);
    chatOrigin_[route.params.reciever] = [...chatOrigin_[route.params.reciever], { from: who, text: what }];
    await AsyncStorage.setItem('chats',JSON.stringify(chatOrigin_));
    console.log(chatOrigin_);*/


    if ( who == 1){
      const value = await AsyncStorage.getItem("chats");
      let chatOrigin_ = JSON.parse(value);
      setMessages(prevMessages => {
        const newMessages = [...prevMessages, { from: who, text: what} ]
        delete chatOrigin_[route.params.reciever] //채팅 맨 위로 올리기
        chatOrigin_[route.params.reciever] = newMessages;
        AsyncStorage.setItem('chats',JSON.stringify(chatOrigin_));
        return newMessages;
        }
      );
    } else {
      setMessages(prevMessages => {
        return [...prevMessages, { from: who, text: what} ];
      });

    }

  }

  useEffect( ()=>{
    
    async function setSocket(){

      socket.on('message',(message,sender)=>{
        //console.log(sender);
        changeChatStorage(0,message);
      })

      
    }
    setSocket();

  },[]);
  
  
 

  /* 채팅 테스트 종료 */
  const [newMessage, setNewMessage] = useState('');
  const [isKUP, setisKUP] = useState(false);
  const [userName, setUserName] = useState("");
  const [reciever, setReciever] = useState(""); 

  const scrollViewRef = useRef();
  const keyboardRef = useRef();


  const addMessage = async () => {
    
    await changeChatStorage(1,newMessage);
    socket.emit("sendMessage", newMessage, reciever, userName, (res)=>{});
    setNewMessage('');

    // 스크롤뷰를 아래로 이동
    setTimeout(() => {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }, 50);
    
  };

  useEffect(() => {
    // 하단 바 없애기
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: "none"
      }
        
    });
    
    
    // 스크롤뷰를 아래로 이동
    setTimeout(() => {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }, 50);

    /* 처음에 컴포넌트가 마운트되면 스크롤뷰를 아래로 이동, 키보드도 올림
    scrollViewRef.current.scrollToEnd({ animated: true });
    keyboardRef.current.focus();
    scrollViewRef.current.scrollToEnd({ animated: true });
    */

    setReciever(route.params.reciever);

    return () => navigation.getParent()?.setOptions({
      tabBarStyle: undefined
    });
  }, [navigation]);
  

  const getMessageContainerStyle = (isCurrentUser) => {
    return {
      alignSelf: isCurrentUser ? 'flex-end' : 'flex-start',
      backgroundColor: isCurrentUser ? '#1C4B95' : '#FFFFFF',
      borderRadius: 25,
      marginVertical: 5,
      maxWidth: '80%', // 말풍선의 최대 너비
      padding: 10,
    };
  };

  const getMessageTextStyle = (isCurrentUser) => {
    return {
      color: isCurrentUser ? '#FFFFFF' : '#333333',
      fontSize: 16,
      marginLeft: 3,
      marginRight: 3,
    };
  };

  return (
    <View style={Styles.body}>
      <View style={Styles.top}>
        <View style={Styles.arrowContainner}>
          <TouchableOpacity 
            onPress={()=>{navigation.goBack()}}>
            <Image 
                
                style={Styles.arrow}
                source={require('./assets/back.png')} />
          </TouchableOpacity>
        </View>
        <View style={Styles.nameContainer}> 
          <Text style={Styles.userName}>
            {reciever}
          </Text>
        </View>
      </View>
      <ScrollView
      contentContainerStyle={Styles.scrollview}
      ref={scrollViewRef}
      >
        {messages.map((message, index) => (
          <View
            key={index}
            style={getMessageContainerStyle(message.from)} // 각 메시지의 홀/짝 여부로 사용자 구분
          >
            <Text style={getMessageTextStyle(message.from)}>{message.text}</Text>
          </View>
        ))}
      </ScrollView>
      {/* <View style={Styles.kAVcontainer}> */}
      <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={Styles.inputContainer}
      >
        <TouchableOpacity style={Styles.textInputContainer}>
          <TextInput
            ref={keyboardRef}
            style={Styles.input}
            value={newMessage}
            onChangeText={text => setNewMessage(text)}
          />
        </TouchableOpacity>
        <TouchableOpacity
        activeOpacity={1}
        style={Styles.sendButton}
        onPress={()=>{addMessage();}}
        >
          <View style={Styles.sendArrowContainner}>
            <Image
            style={Styles.sendArrow}
            source={require('./assets/arrow_upward.png')} />
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <View style={Styles.kAVcontainer}/>
      {/* </View> */}
    </View>
  )
}

export default ChatRoom;



const Styles = StyleSheet.create({
  body: {
    backgroundColor: '#90A5C0',
    flex:1,
  },
  top: {
    flexDirection: 'row',
    position : "absolute",
    width:"100%",
    height:136,
    backgroundColor: '#rgba(144, 165, 192, 0.77)',
    flex:1,
    zIndex: 2,
  },
  arrowContainner:{
    position : "absolute",
    marginTop: 63,
    marginLeft: 16,
    zIndex: 3,
    
  },
  arrow:{
    height: 36,
    width: 36,
    zIndex:3,
  },
  nameContainer: {
    flex:1,
    marginTop:26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    color:"#FFFFFF",
    fontSize: 21,
    fontWeight:"bold",
    textAlign: 'center',
  },
  HomeText: {
    fontSize: 30,
    textAlign: "center",
  },
  scrollview: {
    position: 'absolute',
    top: 0,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    paddingTop: 136,
    flexDirection: 'column-reverse',
    alignItems: 'flex-end',
    width: "100%",
    display: 'flex',
    flexDirection: 'column',
  },
  kAVcontainer:{
    zIndex: 10,
    height:31,
    backgroundColor:"#FFFFFF",
  },
  messageText: {
    fontSize: 16,
    marginBottom: 8,
  },
  inputContainer: {
    //height:89,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical:13,
    backgroundColor:"#FFFFFF",
  },
  textInputContainer:{
    paddingVertical:13,
    position : "absolute",
    width:"100%",
  },
  input: {
    alignSelf: "center",
    width:"91%",
    height: 32,
    padding: 8,
    borderRadius:30,
    backgroundColor:"#EDF3FC",
  },
  sendArrowContainner:{
    alignItems: 'center',
  },
  sendArrow: {
    width:15,
    height:15,
    marginTop:7,
  },
  sendButton: {
    width:30,
    height:30,
    borderRadius:50,
    backgroundColor:"#F3B143",
    marginLeft:327,
    marginBottom:13,
  },
})