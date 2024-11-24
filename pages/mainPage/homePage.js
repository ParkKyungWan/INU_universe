import {React,useState,useRef,useEffect} from 'react';

import {Keyboard,View,StyleSheet,Text} from 'react-native';
import SchoolMap from './schoolMap';
import NavDisplayBar from './overlay/navDisplayBar';
import FireMan from './overlay/fireMan';
import ShoutingPanel from './overlay/Panels/shoutingPanel';
import MapPanel from './overlay/Panels/MapPanel';


//반복실행함수
import useInterval from './util/useInterval';

//토스트메세지 라이브러리
import Toast from 'react-native-toast-message';
import { toastConfig } from './ToastConfig';
import { getUserName } from '../../auth/VerifyToken';


function HomePage({navigation}) {

  
  //schoolMap 에서 받아서 ./overlay/Panels/MapPanel로 보낼 위치 값
  const [locData, setLocData] = useState({});
  const handleLocDataChange = (newLoc) => {
    setLocData(newLoc);
  };

  //키보드 열림 감지(토스트 메세지 안띄우도록)
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  //로그인 환영 알림
  useEffect(() => {

    async function getun(){
      const un = await getUserName();
      Toast.show({
        type: 'FiremanToast',
        text1: "[Login] "+un+ '님',
        text2: ' 오랜만이에요!'
      });
    } getun();

  },[])

  //지도 기본 값 설정
  const [mapRegion, setmapRegion] = useState({
    latitude: 37.3751106262207,
    longitude: 126.63219451904297,
    latitudeDelta: 0.0028,
    longitudeDelta: 0.0028,
    });

  const mapViewRef = useRef(null);

  //지도 정보
  const mapInfo = {
    'region' : mapRegion,
    'setRegion' : setmapRegion,
    'ref': mapViewRef,

  }

  /*일단 8초마다 주기적으로 토스트(테스트 중 )
  useInterval(() => {
    Toast.show({
      type: 'FiremanToast',
      text1: '모든 친구에게 ',
      text2: '위치를 공유하고 있어요'
    });
    
  }, 8000);
  */

  return( 
    <>
    <View style={styles.body}>
      <SchoolMap mapRegion={mapRegion} mapRef={mapViewRef} onlocChange={handleLocDataChange}/>
    </View>
    <ShoutingPanel navigation={navigation}/>
    <FireMan/>
    <MapPanel mapInfo={mapInfo} locData={locData}  />
    <NavDisplayBar loc={1} />

    {
      //키보드 켜져있을때는 토스트 보이지 않도록 하기
      !isKeyboardVisible &&
      <Toast
      
        config={toastConfig}
        position='bottom'
        visibilityTime={2500}
        swipeable={false}
        bottomOffset={0}
        />
    }
    </>
    );
  
}

const styles = StyleSheet.create({
    body: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
    },
  });
  
export default HomePage;