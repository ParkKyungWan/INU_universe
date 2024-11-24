import {View,StyleSheet,Text,Image} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { useNavigation } from "@react-navigation/native";
import useInterval from '../mainPage/util/useInterval';
import { useState } from 'react';
import { getUserName } from '../../auth/VerifyToken';


function friend(props) {
  
  const navigation = useNavigation();
  const [inSchoolTime,setInSchoolTime] = useState(props.inSchoolTime);

  useInterval(() => {
    setInSchoolTime( inSchoolTime+1 );
  }, 60000);
  
  const clearStack = (dummy) =>{}
  const userName = getUserName();

  return(
    <>
      <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate("ChatRoom", { reciever: props.name, sender: userName, clear:clearStack })}>
      <View style={ props.inSchool?styles.container : styles.container_notInSchool}>
        <View style={styles.imageContainer}>
          <Image
            source={ require('../../assets/emotions/emo_1.jpg') }
            style={ props.inSchool? styles.image_inSchool: styles.image}
          />
          {props.inSchool ? (
            <View style={styles.onlineIndicator} />
          ) : null}
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.name}>{props.name}</Text>
          
          {props.inSchool ? (
            <Text style={styles.description}>{inSchoolTime}분 전 등교</Text>
          ) : <Text style={styles.description}>등교 중 아님 </Text>}
        </View>
      </View>
      <View style={styles.separator} />
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
    container_notInSchool: {
        flexDirection: 'row',
        height: 72,
        width: 375,
        opacity: 0.5,
      },
      container:{
        flexDirection: 'row',
        height: 72,
        width: 375,
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
    });

export default friend;