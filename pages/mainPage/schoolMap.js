import React, { useState, useRef,useEffect } from 'react';
import { StyleSheet,Image,View, TouchableOpacity,Text } from 'react-native';
import { PROVIDER_GOOGLE } from 'react-native-maps';
import MapView, {Marker} from 'react-native-maps';
import { buildingLocs } from './util/buildingLocs';


import axios from "axios";
import { getTokenFromLocal, URL } from '../../auth/VerifyToken';

import useInterval from './util/useInterval';

import * as Location from 'expo-location';
import distance from './util/distance';
import Toast from 'react-native-toast-message';

/*
맵뷰 레퍼런스
https://docs.expo.dev/versions/latest/sdk/map-view/
*/

const SchoolMap = props =>{

  /* 학교 중심의 좌표 */
  const schoolCenter = {
    latitude: 37.3751106262207,
    longitude: 126.63219451904297,
  }
  /* 지도 구현을 위한 부분*/

  const [zoomLevel, setZoomLevel] = useState(0)
  const [myLoc, setMyLoc] = useState({})
  const [friendLoc, setFriendLoc] = useState([])
  const [inSchool, setinSchool] = useState(true)
    const [mapStyle, setmapStyle] = useState([
        {
            "elementType": "labels",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "administrative.neighborhood",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "labels.text",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "poi.business",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "poi.school",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#1c4b95"
              },
              {
                "saturation": -85
              },
              {
                "lightness": 85
              }
            ]
          },
          {
            "featureType": "poi.school",
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "color": "#444444"
              },
              {
                "weight": 5
              }
            ]
          },
          {
            "featureType": "road",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "labels.icon",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "transit",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          }, {
            featureType: "landscape.man_made.building",
            elementType: "geometry.fill",
            stylers: [ { color: "#000000"},{"lightness": 82} ]
        },
        {
            "featureType": "landscape.man_made.building",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "visibility":"on",
                    "color": "#444444"
                }
            ]
        }
       
    ])
    

    const reloadmapView = ()=>{
      props.mapRef.current.animateCamera({
        center: {
          latitude: 37.3751106262207,
          longitude: 126.63219451904297,
        },
        pitch: 85,
        zoom: 18,
      })
    }
    
    const getPlayerLocs = async () =>{
      const Token = await getTokenFromLocal();
      //console.log(Token.accessToken)
      axios
        .get( `${URL}/api/v1/user/location/notFavorite/findAll`,
        {
          headers: {
          "Authorization" : `Bearer ${Token.accessToken}`
          }
        })
        .then((res) => {
          setFriendLoc(res.data.data.friendLocationList);
          //내위치 버튼에 활용될 지도 정보 설정
          props.onlocChange(myLoc);
        })
        .catch((err) => {
          if(err.response.status === 404){

          }
          else{
              //console.log("schoolMap.js/getPlayerLocs error")
          } 
        });

    }
    
    //inschool의 최신상태 반영
    const inSchoolRef = useRef(inSchool);
    useEffect(() => {
      inSchoolRef.current = inSchool;
    }, [inSchool]);

    const getGpsValue = async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('권한 거부됨');
        return;
      }

      let location = await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.High});

      //gps튀는 경우에는 실행하지 않도록 If문 사용
      if( location.coords.latitude !=0){
        setMyLoc(
          {
            "latitude":location.coords.latitude,
            "longitude": location.coords.longitude
          }
         )
         const Token = await getTokenFromLocal();

         //console.log(Token.accessToken);
         if (distance(schoolCenter, myLoc) < 0.01){
          if(!inSchoolRef.current || inSchoolRef.current=="yet"){
            setinSchool(true);
            //등교중으로 변경
            await axios.post(`${URL}/api/v1/user/user/updateSchool`,
            {
              "userStatus" : "SCHOOL",
            },
            {
              headers: {
              "Authorization" : `Bearer ${Token.accessToken}`,
              },
                
            }).then(v=>{
              console.log("SCHOOL")
            }).catch(error =>{
              console.log("map_load: error");
            })
          }
          sendGpsValue();
         }else{
          if(inSchoolRef.current|| inSchoolRef.current=="yet"){
            setinSchool(false);
            //등교중X로 변경
            console.log("NOT_SCHOOL")
            await axios.post(`${URL}/api/v1/user/user/updateNotSchool`,
            {
              "userStatus" : "NOT_SCHOOL",
            },
            {
              headers: {
              "Authorization" : `Bearer ${Token.accessToken}`
              }
            }).then(v=>{
              //meNotSchoolNotofi();

            }).catch(error =>{
              console.log("map_load: error");
            })
          }
         }
        }

      
    }
    const sendGpsValue = async () => {
      try {
        const Token = await getTokenFromLocal();
        
        res = await axios.post(`${URL}/api/v1/user/location/update`,
        {
          "latitude": myLoc.latitude,
          "longitude":myLoc.longitude
        },
        {
            headers: {
            "Authorization" : `Bearer ${Token.accessToken}`
            }
        })
        
      }
      catch(err){
        //console.log("schoolMap.js/sendGpsValue error");
      }
      
    }

    useEffect(() => {
      reloadmapView();
      getGpsValue();
      getPlayerLocs();
    }, []); 
    
    useInterval(() => {
      getGpsValue();
      getPlayerLocs();
    }, 2000);

    useInterval(()=>{
      //현재 줌 상황을 0.2초마다 로딩
      props?.mapRef?.current?.getCamera().then((camera)=>{
        const _zoomLevel = camera.zoom;
        if( Math.abs(_zoomLevel-zoomLevel) > 0.1){
          setZoomLevel(camera.zoom)
        }
      })
    },200)

    const myMarker = () =>{
      return( 
        <Marker
          coordinate={myLoc}
          style={ inSchool? styles.myMarker : styles.myMarker_notschool}
        >
          <Image 
            style={styles.locspot}
            source={require('./assets/mapIcons/locspot.png')} />
        </Marker>
      );
    }
    const friendsMarker = () =>{

      let friendsMarkerContainers = []
      for( let i = 0 ; i < friendLoc.length; i++){
        const tmp_loc = { 
          latitude: friendLoc[i].latitude,
          longitude: friendLoc[i].longitude
        }
        friendsMarkerContainers.push(
          <Marker
          coordinate={tmp_loc}
          key={i}
          style={styles.friendsMarker}
          >
            <View style={styles.profileName}>
              <Text style={styles.profileNameText}>
                {friendLoc[i].userName}
              </Text>
            </View>
            <Image 
              style={styles.profile}
              source={require('./assets/mapIcons/sampleProfile.png')}
              />
          </Marker>
          
        )
      }
      return( 
        friendsMarkerContainers
      );
    }

    const buildingNumberMarkers = () => {
      let buildingNumberMarkerContainer = [];

      for ( let i = 1; i < buildingLocs.length+1 ; i++){
        buildingNumberMarkerContainer.push(
          <Marker
          style={styles.myMarker}
          coordinate={buildingLocs[i-1][0]}
          key={i}
          >
            <View style={styles.buildingNum} >
              <Text style={styles.buildingNumText}>
                {i}
              </Text>
            </View>
            <Text style={styles.buildingNumText2}>
              {buildingLocs[i-1][1]}{buildingLocs[i-1][2] ? "/"+ buildingLocs[i-1][2] : ""}
            </Text>
          </Marker>
        )
      }
      return buildingNumberMarkerContainer;

    }
    return( 
      <>

      <MapView
        ref={ props.mapRef }
        provider={PROVIDER_GOOGLE}
        customMapStyle={mapStyle}
        style={{ alignSelf: 'stretch', height: '100%' }}
        region={props.mapRegion}
      >

       {myMarker()}
       {friendsMarker()}
       {zoomLevel>17.75?buildingNumberMarkers():null}
      </MapView>
      </>
    
    );

  
}

const styles = StyleSheet.create({
  locspot: {
    width: 44,
    height: 44,
    shadowColor: '#000000',
    shadowOpacity: 0.25,
    shadowOffset: {
        width:0,
        height:4
    },
    shadowRadius: 4,
    overflow: 'visible',
  },
  friendsMarker:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  profileName:{
    borderRadius: 10,
    backgroundColor: "white",
    alignItems: 'center',
    textAlign: 'center',
    borderWidth: 2.3,
    borderColor: "#1C4B95",
  },
  profileNameText:{
    fontSize: 14,
    fontWeight: 'bold',
    margin: 3,
    marginLeft: 7, marginRight: 7,
    alignItems: 'center',
    textAlign: 'center',
    color: "#2C2A2A"
  },
  profile: {
    /*width: 44,
    height: 44,
    borderRadius:25,
    borderColor:"#1C4B95",
    borderWidth: 5,
    opacity: 0.85,
    backgroundColor: "white"*/
    width: 45,
    height: 45,
    
  },
  buildingNum: {
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    opacity: 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    width: 20,
    height: 20,
  },
  buildingNumText:{
    fontSize: 11,
  },
  buildingNumText2:{
    textAlign: 'center',
    fontSize: 9,
    color: '#444444',
    opacity: 0.7,
  },
  myMarker:{
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    gap: 4,
    justifyContent: 'center',
    opacity: 1,
  },
  myMarker_notschool:{
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    gap: 4,
    justifyContent: 'center',
    opacity: 0.5,
  },
});
  
export default SchoolMap;

/*
## 맵뷰 Methods

https://unpkg.com/browse/react-native-maps@0.30.1/docs/mapview.md

*/