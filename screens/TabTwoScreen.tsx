import * as React from 'react';
import * as helpers from '../constants/Helper';
import { 
  // Button, 
  FlatList, StyleSheet, TextInput,View,TouchableOpacity, Appearance} from 'react-native';
import ListItem from '../components/ListItem';
import { onItemPress } from './TabOneScreen';
import EmptyListScreen from "../components/EmptyListScreen";
import { MonoText } from '../components/StyledText';
import { MaterialIcons } from "@expo/vector-icons"

import { Input, Icon,Button,Spinner } from "native-base"


export default function TabTwoScreen(props:any) {
  //only two posts can be saved by default
  const [storageLimit,setStorageLimit] = React.useState("");
  const [dbStorage,setDbStorage] = React.useState(0);
  const isDarkMode = Appearance.getColorScheme() === 'dark';
  const mounted = React.useMemo(() => ({ current: true }), []);

  //fetching device storage limit set by user
  React.useEffect(() => {
      const fetchStorage = async () => {
        let limit = await helpers.getStorageLimit();
        if(mounted.current){
          setDbStorage(limit);
        }
      }
      fetchStorage();
      return () => {
        mounted.current = false;
      }
  },[storageLimit]);

  //gettin user entered storage limit
  const onTextChange = (inputLimit:string) => {
    setStorageLimit(inputLimit);
  }

  const onStorageInputBtnPress = () => {
    props.getInputStorageLimit(storageLimit);
  }

  return (
    <View style={styles.container}>
      <View style={styles.urlBtn}>
      {/* <TextInput style={[styles.textBox,isDarkMode?styles.lightText:styles.darkText]} placeholder="Enter Storage Limit" keyboardType={'numeric'} value={storageLimit} onChangeText={(inputLimit)=>onTextChange(inputLimit)}></TextInput> */}
      <Input size="lg"
      keyboardType={'numeric'}
      onChangeText={(inputLimit)=>onTextChange(inputLimit)}
      style={[styles.textBox,isDarkMode?styles.lightText:styles.darkText]}
      placeholder="Enter Storage Limit"
      value={storageLimit}
      InputLeftElement={
        <Icon
          as={<MaterialIcons name="storage" />}
          size={5}
          ml="2"
          color="muted.400"
        />
      }
       mx="3" w={{ base: "70%", md: "25%"}}
      />

      {/* <TouchableOpacity style={styles.btn}> */}
      {/* <Button
        onPress={()=>onStorageInputBtnPress()}
        title="Save"
        color="#841584"
        accessibilityLabel="Fetch RSS feed"
      /> */}
      <Button onPress={()=>onStorageInputBtnPress()} colorScheme="green">Save</Button>
      {/* </TouchableOpacity> */}
      </View>
      <MonoText style={styles.limitText}>Current Limit: {dbStorage}</MonoText>
      <FlatList
        keyExtractor={(item, index) => {
          return index.toString();
        }}
        data={props.localFeed}
        renderItem={({item}:any) => (
          <ListItem
            {...item}
            key={Math.random}
            onPress={(item:any) => onItemPress(props,item)}
            navigation={props.navigation}
          />
        )}
        ListEmptyComponent={()=>{return <EmptyListScreen msg={"Favorite Feeds appear here!"}/>}}
        ItemSeparatorComponent={() => 
          <View
            style={styles.separator}
          />
      }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop:20,
    height:"100%"
    // flex: 1,
    // alignItems: 'flex-start',
    // justifyContent: 'center',
  },
  urlBtn:{
    flexDirection:"row",
     padding:10,
    // width:"100%",
    // height:"10%",
    // justifyContent:"space-between"
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    // marginVertical: 30,
    height: 1,
    width: '100%',
    marginVertical:20,
    backgroundColor: "#CED0CE",
  },
  textBox:{
    // marginLeft:20,
    // width:"75%",
    // height:60,
    width:"30%",
    height:40,
    fontSize: 20
  },
  lightText:{
    color:'#FFFFFF'
  },
  darkText:{
    color:'#000000'
  },
  btn:{
    height: 100,
    marginTop: 20,
    marginRight:20
  },
  limitText:{
    paddingLeft:23,
    paddingBottom:10
  }
});
