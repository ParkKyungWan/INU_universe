/* 네비게이션 바 위에 얇은 회색 선 */
import React from 'react';

import {View,StyleSheet,Text} from 'react-native';

NavDisplayBar = props => {

    //네비게이션의 활성 영역을 알려주는 3개의 바 (활성화시 파란색)
    const loadBars = () => {
        const result = [];
        for (let i = 0; i < 3; i++) {
            if( i == props.loc ){
                result.push(
                <View key={i} style={[styles.flexItem]}>
                    <View style={{flex:1}}/>
                    <View style={[{flex:3},styles.activate]}/>
                    <View style={{flex:1}}/>
                </View>
                );
            }else{
                result.push(<View key={i} style={styles.flexItem}/>);
            }
        }
        return result;
      };

      
  return( 
    <View style={styles.navDisplayBar}>
        {loadBars()}
    </View>
    
    );
  
}

const styles = StyleSheet.create({
    navDisplayBar: {
      bottom: 0,
      height: 3,
      backgroundColor: '#D8D8D8',
      display: 'flex',
      flexDirection: 'row'
    },
    flexItem: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row'
    },
    activate: {
        backgroundColor: '#1C4B95',
        borderRadius: 25
    }
  });
  
export default NavDisplayBar;