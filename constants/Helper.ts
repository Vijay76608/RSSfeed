/**
 * Function and operations that are common and used throughout the project
 */

import {
    ToastAndroid,
    Platform,
    Alert,
  } from 'react-native';
import {Toast} from "native-base"
import * as localStorage from "../constants/Storage";

//toast or alert based on platform
export const notifyMessage = (msg: string,status:any) => {
  Toast.show({
    title: msg,
    placement: "top",
    status:status
  })
  //   if (Platform.OS === 'android') {
  //     Toast.show({
  //       title: "Hello world",
  //     })
  //     ToastAndroid.show(msg, ToastAndroid.SHORT)
  //   } else {
  //     Alert.alert(msg);
  // }
}

//Boolean to check storage limitation
export const checkStorageLimit = async () => {
    const keys = await localStorage.getAllStoredKeys();
    const storageLimit = await localStorage.getData("storageLimit");
    if(keys!.length >= Number(storageLimit)){
        return false;
      } else {
        return true;
    }
}

export const getStorageLimit = async () => {
  const storageLimit = await localStorage.getData("storageLimit");
  if(storageLimit){
      return storageLimit;
    } else {
      return 0;
  }
}

//detect JSON object from string
export const isJsonString = (str:any) => {
  try {
    var json = JSON.parse(str);
    return (typeof json === 'object');
  } catch (e) {
    return false;
  }
}

//check if string is valid url
export const isValidURL = (string:string) => {
  var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
  return (res !== null)
};