
import {AlertIOS,ToastAndroid,Platform} from 'react-native';
export function showToast(showMsg){
    if(Platform.OS === 'android'){
        ToastAndroid.show(showMsg,ToastAndroid.SHORT);
    }else{
        
    }
}
