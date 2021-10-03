/**
 * Component for individual items in a listview(flatlist/sectionedlist)
 */
import React from 'react';
import { StyleSheet, TouchableOpacity, View,TouchableHighlight } from 'react-native';
import { Text } from './Themed';

export default function ListItem(item:any) {
    const navigateToModal = () => {
        let serializedData = JSON.stringify(item);
        item.navigation.navigate('Modal',{serializedData})
}
     
  return (
    <View>
      <View style={styles.helpContainer}>
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
      </View>
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
