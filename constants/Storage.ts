/**
 * Function and operations related to local storage of device
 */
import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveData = async (key:any,value:any) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
      // saving error
      console.log(e);
    }
  }

  export const storeKeyVal = async (key:any,value:any) => {
    try {
      await AsyncStorage.setItem(key, value)
    } catch (e) {
      // saving error
      console.log(e);
    }
  }

  

export const getData = async (key:string) => {
    try {
      const value = await AsyncStorage.getItem(key)
      if(value !== null) {
        // value previously stored
        return parseInt(value);
      }
      return false;
    } catch(e) {
      return false;
        console.log("getData error",e);
      // error reading value
    }
  }

export const getDataJson = async (key:string) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key)
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      // error reading value
      console.log(e);
    }
}

export const getAllSavedData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const result = await AsyncStorage.multiGet(keys);
      let data:any = [];
        result.map(req => {
           req.forEach(item=>{
            if(isJsonString(item)){
                let jsonData:any = item
                data.push(JSON.parse(jsonData));
            }
          })
        });
        return data;
    } catch (error) {
      console.error(error)
    }
  }

  const isJsonString = (str:any) => {
    try {
      var json = JSON.parse(str);
      return (typeof json === 'object');
    } catch (e) {
      return false;
    }
  }

export const getAllStoredKeys = async () => {
    try {
        const keys = await AsyncStorage.getAllKeys();
        return keys;
      } catch (error) {
        console.error(error)
      }
}