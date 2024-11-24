
import { View, Text, StyleSheet,Image, Dimensions, TouchableOpacity } from 'react-native';
import { getTokens } from './VerifyToken';

const test_login = ( num, nav ) =>{
    getTokens('test'+num+'@test.com', 1234, nav);
    
} 

function LoginPage({navigation}) {
    return (
        <View style={styles.body}>
            <Image 
                style={styles.fireman}
                source={require('./assets/logo/inulogo.png')}
            />
            <View style={{gap:10}}>
            <TouchableOpacity style={styles.loginBtn} activeOpacity={0.55} 
                onPress={()=>{test_login(1,navigation)}}>
                <View style={styles.loginBtnInner}>
                    <Image 
                        style={styles.googleLogo}
                        source={require('./assets/logo/googlelogo.png')}
                    />
                    <Text style={styles.loginText}> 경완_테스트 계정 </Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginBtn} activeOpacity={0.55} 
                onPress={()=>{test_login(2,navigation)}}>
                <View style={styles.loginBtnInner}>
                    <Image 
                        style={styles.googleLogo}
                        source={require('./assets/logo/googlelogo.png')}
                    />
                    <Text style={styles.loginText}> 성민_테스트 계정 </Text>
                </View>
            </TouchableOpacity>


            
            <TouchableOpacity style={styles.loginBtn} activeOpacity={0.55} 
                onPress={()=>{test_login(3,navigation)}}>
                <View style={styles.loginBtnInner}>
                    <Image 
                        style={styles.googleLogo}
                        source={require('./assets/logo/googlelogo.png')}
                    />
                    <Text style={styles.loginText}> 정목_테스트 계정 </Text>
                </View>
            </TouchableOpacity>

            </View>
        </View>
    )
}

var {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
    body: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      flex: 1,
    },
    fireman: {
        width:188,height:188,
        marginTop: height*0.5-188,
    },
    loginBtn:{
        width: width*0.86,
        height: 53,
        borderWidth: 3,
        borderRadius: 15,
        borderColor: '#1C4B95',
        borderStyle: "solid",
        display: 'flex',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset:{
            width:4,
            height:4,
        },
        backgroundColor:'white',
        
    },googleLogo:{
        width:28, height:28,
    },loginText:{
        fontSize: 16,
        fontWeight: 'bold',
    },
    loginBtnInner:{
        display:'flex',
        alignItems: 'center',
        flexDirection:'row',
        flex:1,
        gap: 5,
    }
  });

export default LoginPage;