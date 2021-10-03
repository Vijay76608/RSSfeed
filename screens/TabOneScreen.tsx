import * as React from 'react';
import { Alert, Button, ListRenderItemInfo, StyleSheet, Appearance} from 'react-native';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { event } from 'react-native-reanimated';
import ListItem from '../components/ListItem';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import * as localStorage from '../constants/Storage';
import * as helper from '../constants/Helper';
import { MonoText } from '../components/StyledText';
import EmptyListScreen from '../components/EmptyListScreen';

//on long press of each post
export const onItemPress=(props:any,item:any)=>{
  Alert.alert(
    //label of post as title
    item.title,
    "Do you want to save the post to phone?",
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      {
        text: "OK", onPress: async ()  => {
          if(await helper.checkStorageLimit()){
            localStorage.saveData(item.id,item);
            if(props.route.name === "TabOne"){
              //to inform second tab about updated status
              props.setTabUpdated(true);
            }
            helper.notifyMessage("Successfully saved to the device");
          } else {
            helper.notifyMessage("Unable to save. Storage limit exceeded");
          }
      }
    }
    ],
    { cancelable: false }
  );
}


export default function TabOneScreen(props:any) {
  const [url,setURL] = React.useState("");
  const isDarkMode = Appearance.getColorScheme() === 'dark';

  const onTextChange = (inputUrl:string) => {
    setURL(inputUrl);
  }
  const onBtnPress = () => {
    const isValidUrl = helper.isValidURL(url);
    if(isValidUrl){
      props.getInputUrl(url);
    } else {
      Alert.alert("Invalid URL");
    }
  }
 
  return (
    <View style={styles.container}>
      <View style={styles.urlBtn}>
      <TextInput style={[styles.textBox,isDarkMode?styles.lightText:styles.darkText]} placeholder="Enter RSS URL" value={url} onChangeText={(url)=>onTextChange(url)}></TextInput>
      <Button
        onPress={()=>onBtnPress()}
        title="Get Feed"
        accessibilityLabel="Fetch RSS feed"
      />
      </View>
      <FlatList
        keyExtractor={(item, index) => {
          return index.toString();
        }}
        data={props.rssData}
        renderItem={({item}:any) => (
          <ListItem
            {...item}
            key={Math.random}
            onPress={(item:any) => onItemPress(props,item)}
            navigation={props.navigation}
          />
        )}
        ListEmptyComponent={()=>{return <EmptyListScreen msg={"Please enter RSS URL above"}/>}}
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
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  urlBtn:{
    height:100,
    margin:20,
    width:"90%",
    justifyContent:"space-between"
  },
  textBox:{
    height:60,
    fontSize: 20,
  },
  lightText:{
    color:'#FFFFFF'
  },
  darkText:{
    color:'#000000'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    // marginVertical: 30,
    height: 1,
    width: '100%',
    backgroundColor: "#CED0CE",
  },
  itemSeparator : {
    height: 1,
    width: "100%",
    backgroundColor: "#CED0CE",
    marginLeft: "14%"
  },
  emptyList:{
    flex:1,
    justifyContent:"flex-end",
    alignItems:"flex-end"
  }
});
