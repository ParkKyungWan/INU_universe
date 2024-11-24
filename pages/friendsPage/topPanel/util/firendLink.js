import { Share } from "react-native";
import axios from "axios";
import { URL } from "../../../../auth/VerifyToken";
import { getTokenFromLocal } from "../../../../auth/VerifyToken";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getFriendUrl = async () =>{
    const Token = await getTokenFromLocal();
    const userName = await AsyncStorage.getItem('user');
    const res = await axios.get( `${URL}/api/v1/user/friendRequest/get`,
        {
          headers: {
          "Authorization" : `Bearer ${Token.accessToken}`
          }
        })
    await Share.share({ message: "[유니버스 - 친구추가]\n\n 유니버스에서 친구가 되고 싶어요! 다음의 링크를 클릭하면 자동수락돼요. \n\n univPrj://addFriend?/--/token="+res.data.data.friendRequestURL })
}
