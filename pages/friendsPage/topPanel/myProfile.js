import {View,StyleSheet,Text,Image} from 'react-native';
import { getUserName } from '../../../auth/VerifyToken';
import { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

function MyProfile() {
  const [userName, setUserName] = useState("")
  const [changingPrf, setChangingPrj] = useState(0);
  const [profileNum, setProfileNum] = useState(1);
  const [profile,setProfile] = useState(require('../../../assets/emotions/bigEmo_1.jpeg'));
  
  useEffect(()=>{ async function getun(){setUserName(await getUserName());} getun();},[])
  
  const nextProfile = async () =>{
    if(!changingPrf){ setChangingPrj(1);}
    setProfileNum( (prevNum)=>{ return (prevNum + 1 == 10) ? 1 : prevNum + 1 }  )
    if(profileNum==1){
      setProfile(require('../../../assets/emotions/bigEmo_1.jpeg'));
    }
    else if (profileNum==2){
      setProfile(require('../../../assets/emotions/bigEmo_2.jpeg'));
    }
    else if (profileNum==3){
      setProfile(require('../../../assets/emotions/bigEmo_3.jpeg'));
    }
    else if (profileNum==4){
      setProfile(require('../../../assets/emotions/bigEmo_4.jpeg'));
    }
    else if (profileNum==5){
      setProfile(require('../../../assets/emotions/bigEmo_5.jpeg'));
    }
    else if (profileNum==6){
      setProfile(require('../../../assets/emotions/bigEmo_6.jpeg'));
    }
    else if (profileNum==7){
      setProfile(require('../../../assets/emotions/bigEmo_7.jpeg'));
    }
    else if (profileNum==8){
      setProfile(require('../../../assets/emotions/bigEmo_8.jpeg'));
    }
    else if (profileNum==9){
      setProfile(require('../../../assets/emotions/bigEmo_9.jpeg'));
    }
  }

  const changingEnd =()=>{
    setChangingPrj(0);
  }

  return(
    <>
    <View style={styles.body}>
      <Text style={styles.text}>
        내 프로필
      </Text>
    </View>
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={ profile }
          style={styles.image}
        />
        {/* <View style={styles.onlineIndicator}/>*/}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.name}>{userName}</Text>
        <Text style={styles.description}>교내에 위치 : 1시간</Text>
      </View>
      

      <View style={[styles.changeProfile, changingPrf? {marginRight:0}: null]}>
        <TouchableOpacity onPress={()=>{nextProfile();}}>
          <Image
            source={ require('../../../assets/emotions/changeProfile.png') }
            style={styles.changeProfileImg}
          />
        </TouchableOpacity>
      </View>
      { changingPrf ?
        <View style={styles.changingEnd}>
          <TouchableOpacity onPress={()=>{changingEnd();}}>
            <Image
              source={ require('../../../assets/emotions/check.png') }
              style={styles.changeEndImg}
            />
          </TouchableOpacity>
        </View>
        : null }
    </View>
    <View style={styles.separator} />
    </>
  );
}

const styles = StyleSheet.create({
    body: {
      flex:1,
      marginTop:23,
      marginLeft:28,
      height:59,
    },
    text: {
      fontSize: 18,
      fontWeight: 'bold',
      //textAlign: 'center',
      color: '#000000'
    },
    container: {
      flexDirection: 'row',
      height: 73,
        //width: 375,
      },
      imageContainer: {
        marginLeft: 28,
        marginRight: 13,
        overflow: 'hidden', // borderRadius가 적용되려면 overflow: 'hidden'이 필요함
      },
      image: {
        marginTop: 10,
        marginBottom: 9,
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 0,
        borderColor: 'rgba(28, 75, 149, 0.25)',
      },
      textContainer: {
        flexDirection: 'column',
      },
      name: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 5,
      },
      description: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#555',
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
      changeProfileImg:{
        alignSelf: 'center',
        width:26,
        height:26,
        tintColor: '#4570AD',
      },
      changeEndImg:{
        alignSelf: 'center',
        width:26,
        height:26,
        tintColor:'#2E8B57',
      },
      changeProfile:{
        alignSelf: 'center',
        marginLeft: 'auto',
        marginRight: 39,
      },
      changingEnd:{
        marginLeft: 14,
        marginRight: 39,
        alignSelf: 'center',
      }
    });

export default MyProfile;