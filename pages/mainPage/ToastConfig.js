// App.jsx
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import { View, Text } from 'react-native';
/*
  1. Create the config
*/
export const toastConfig = {
 
  FiremanToast: ({ text1, text2, props }) => (
    <View style={{ 
      height: 21,
      backgroundColor: 'white',
      shadowColor: '#000000',
        shadowOpacity: 0.25,
        shadowOffset: {
            width:4,
            height:4
        },
        shadowRadius: 4,
        borderRadius: 25,
        textAlign: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        position:'absolute',
        bottom: 116,
        display: 'flex',
        flexDirection: "column",
        justifyContent: "center",
        
      }}>
      <Text style={{
          fontWeight: '600',
      }}>
        <Text style={{
          fontWeight: 'bold',
          color: '#14408D'
          }}>{text1}
        </Text>
        {text2}
      </Text>
      
    </View>
  ),

  PushToast: ({ text1, text2, props }) => (
    <View style={{
      width: '80%',
      height: 80,
      backgroundColor: 'white'
    }}>
      <Text>{text1}</Text>
    </View>
  )
};