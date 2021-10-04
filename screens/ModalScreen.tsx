import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../constants/Colors';
import { Text, View } from '../components/Themed';
import { Image, Center } from "native-base";

export default function ModalScreen(route:any) {
  let modalData:any;

  if(route&&route.route&&route.route.params&&route.route.params.serializedData){
    modalData = JSON.parse(route.route.params.serializedData);
  }
  return (
    <View style={styles.container}>
      <Image source={{uri: "https://wallpaperaccess.com/full/317501.jpg",}} alt="Alternate Text" size="2xl"/>
      <Text style={styles.title}>{modalData&&modalData.title}</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View style={styles.helpContainer}>
        <TouchableOpacity onPress={() => handleLinkPress(modalData.links[0].url)} style={styles.helpLink}>
          <Text style={styles.helpLinkText} lightColor={Colors.light.tint}>
            Open the post link in the browser
          </Text>
        </TouchableOpacity>
      </View>
      {/* Using light status bar on iOS to avoid black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

function handleLinkPress(url:any) {
  WebBrowser.openBrowserAsync(url);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: 'center',
  },
});
