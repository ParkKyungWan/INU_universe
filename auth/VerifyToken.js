
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage'
import friend from "../pages/friendsPage/friend";
export const URL = 'server-domain'


import socket from "../socket";

export const token_socket_logout = () =>{
  AsyncStorage.removeItem('user');
  AsyncStorage.removeItem('chats');
  try{socket.emit("logout")}catch{}
  
}
const socket_logout = () =>{
  try{socket.emit("logout")}catch{}
}
const socket_login = async () =>{
  //소켓도 연결
  const userName = await getUserName();
  socket.emit('login', userName);
}
export const getTokens = (email, password, navigation) => {
  
  axios.post(`${URL}/login`,
  {
    "userEmail": email,
    "userPassword": password
  })
  .then(res =>{{
        //accessToken, refreshToken 로컬에 저장
        if (res.status === 200){
          AsyncStorage.setItem('user', JSON.stringify({
            'accessToken': res.data.accessToken,
            'refreshToken': res.data.refreshToken,
            'userEmail': email,
            'userName' : res.data.userName,
          }))
          AsyncStorage.setItem('chats',JSON.stringify({}));
          navigation.replace('Splash');
        }
        


  }})
  .catch(error =>{
          if(error.response.status === 401){
              //console.log(error.response.data)
          }
          else{
              //console.log("알수 없는 오류")
          } 
  })
  
  
};

export const requestAddFriend = async (friendToken) =>{
  try {

    const value = await AsyncStorage.getItem("user");

    if (value !== null && friendToken) {

      const Token = await getTokenFromLocal();
      
      if( Token !== null){
        axios
        .get( `${URL}/api/v1/user/friendRequest/accept?token=${friendToken}`,
        {
          headers: {
          "Authorization" : `Bearer ${Token.accessToken}`
          }
        })
        .then((res) => {
          alert("친구요청이 수락되었습니다")
        })
        .catch((err) => {
          //console.log(err);
          alert("요청을 수락할 수 없습니다")
        });

      }else{
        alert("오류가 발생했습니다_code(1)")
      }
      
    }
    else{
      alert("오류가 발생했습니다_code(2)")
    }
  }catch(err){
    //console.log(err);
    alert("오류가 발생했습니다_code(3)")
  }
}

export const getUserName = async() =>{
  try {
    const value = await AsyncStorage.getItem("user");
    let value_json = JSON.parse(value);
    //console.log(value_json.userName)
    return value_json.userName;

  }catch(e){
    return "user_undefined"
  }
}

export const getTokenFromLocal = async () => {
    try {
      const value = await AsyncStorage.getItem("user");

      if (value !== null) {
        //코인이 있을 경우
        let value_json = JSON.parse(value);
        axios
        .get( `${URL}/api/v1/user/user/findOne`,
        {
          headers: {
          "Authorization" : `Bearer ${value_json.accessToken}`
          }
        })
        .catch(async (err) => {

          console.log(err)
          if(err.response.status === 401 ){
            const res2 = await axios.post(`${URL}/api/token/getAccessToken`,
            {"refreshToken": value_json.refreshToken})

            AsyncStorage.setItem('user', JSON.stringify({
              ...value_json,
              'accessToken': res2.data.data.accessToken,
            }))

            value_json.accessToken = res2.data.data.accessToken;
          }

          
        });
        return value_json;
      }
      else{
        return null;
      }
    } catch (e) {
      //console.log(e.message);
    }
  };


export const VerifyToken = async (navigation) => {

    const Token = await getTokenFromLocal();
    // 최초 접속
    if (Token === null){

      navigation.replace('Auth');
    }
    // 로컬 스토리지에 Token데이터가 있으면 -> 토큰들을 헤더에 넣어 검증 
  else{
      socket_logout();
      socket_login();
      navigation.replace('Main');
  }
    
}


