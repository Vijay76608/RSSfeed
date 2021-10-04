/**
 * Component for individual items in a listview(flatlist/sectionedlist)
 */
import React from 'react';
import { StyleSheet, TouchableOpacity, View,TouchableHighlight } from 'react-native';
// import { Text } from './Themed';

import {
  Box,
  FlatList,
  Heading,
  Avatar,
  HStack,
  VStack,
  Text,
  Spacer,
  Center,
  NativeBaseProvider,
  Pressable,
} from "native-base"


export default function ListItem(item:any) {
    const navigateToModal = () => {
        let serializedData = JSON.stringify(item);
        item.navigation.navigate('Modal',{serializedData})
}
     
  return (
    <View>
      {/* <View style={styles.helpContainer}>
        <TouchableOpacity 
                onPress={()=>navigateToModal()}
                onLongPress={()=>item.onPress(item)}
                style={styles.helpLink}>
            <Text
            style={styles.getStartedText}
            lightColor="rgba(0,0,0,0.8)"
            darkColor="rgba(255,255,255,0.8)">
            {item.title}
            </Text>
        </TouchableOpacity>
        <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          Posted Date:{item.published.substr(0, 17)}
        </Text>
      </View> */}
      <Pressable onLongPress={()=>item.onPress(item)}
        onPress={()=>navigateToModal()}
        >
      <HStack space={3} justifyContent="space-between">
              <Avatar
                size="48px"
                
              >{item.title.substr(0,2)}</Avatar>
              <VStack>
                <Text
                  _dark={{
                    color: "warmGray.50",
                  }}
                  color="coolGray.800"
                  bold
                >
                  {item.title.substr(0,23)}
                </Text>
                <Text
                  color="coolGray.600"
                  _dark={{
                    color: "warmGray.200",
                  }}
                >
                  {item.title.substr(0,10)}
                </Text>
              </VStack>
              <Spacer />
              <Text
                fontSize="xs"
                _dark={{
                  color: "warmGray.50",
                }}
                color="coolGray.800"
                alignSelf="flex-start"
              >
                {item.published.substr(0, 17)}
              </Text>
            </HStack>
            </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
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
