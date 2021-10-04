import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React,{useEffect, useState}  from 'react';
import { ColorSchemeName, Pressable, Text, Button, StyleSheet, Alert} from 'react-native';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import * as localStorage from '../constants/Storage';
import {notifyMessage} from '../constants/Helper';
import * as rssParser from "react-native-rss-parser";

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * main navigation stack
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen}/>
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * bottom tabs code
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  //first tab state vars
  const [rssData, setRssData] = useState<any>([]);
  const [feedUrl,setFeedUr] = useState("");
  const [tabUpdated,setTabUpdated] = useState(false);
  const [isLoading,setIsLoading] = useState(false);

  const mounted = React.useMemo(() => ({ current: true }), []);


  //second tab state vars
  const [storageLimit,setStorageLimit] = useState("");
  const [localFeed, setLocalFeed] = useState<any>([]);

  //getting user input url from tab one textInput
  const getInputUrl = function getInputUrl(url:string){
    //for showing spinner
    setIsLoading(true);
    setFeedUr(url);
  }

  //to get local saved feeds
  useEffect(()=>{
    //checking if mounted to avoid unnecessary re-renders
    mounted.current = true;
    const fetchLocaldata = async () => {
      let data = await localStorage.getAllSavedData();
      setLocalFeed([...data])
    }
    if(mounted.current){
      fetchLocaldata();
      setTabUpdated(false);
    }
    return () => { mounted.current = false; };

  },[tabUpdated])

  //fetching RSS feed
  useEffect(() => {
    mounted.current = true;
    const fetchFeed = async () => {
      await fetch(feedUrl)
      .then((response) => response.text())
      .then((responseData) => rssParser.parse(responseData))
      .then((rss) => {
        let refinedData = rss.items.map(function(element) {
          element.description="";
           return element;
       });
        notifyMessage("Successfully fetched data","success");
        setIsLoading(false);
        setRssData([...refinedData]);
      })
      .catch(e=>{
        console.log(e)
        notifyMessage("Failed to load Rss Feed. Please check URL","error");
      })
    }
    if(feedUrl != ""){
      fetchFeed();
    }
  },[feedUrl]);
 
    //storing user entered memory limit of device
    const getInputStorageLimit = function getInputStorageLimit(storageLimit:string){
      localStorage.storeKeyVal('storageLimit',storageLimit);
      notifyMessage("Updated storage Settings","info");
      setStorageLimit(storageLimit);
    }

  const colorScheme = useColorScheme();

  const TabOneScreencomp = (props:any) => (<TabOneScreen {...props} rssData={rssData} isLoading={isLoading} setTabUpdated={setTabUpdated} getInputUrl={getInputUrl}/>)
  const TabTwoScreencomp = (props:any) => (<TabTwoScreen {...props} localFeed={localFeed} getInputStorageLimit={getInputStorageLimit}/>)

  
  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        header:() => (<Text>cc</Text>)
      }}>
      <BottomTab.Screen
        name="TabOne"
        component={TabOneScreencomp}
        options={({navigation}: RootTabScreenProps<'TabOne'>) => ({
          // options={({ navigation,getChildProps}:any) => ({
          title: 'Live Feed',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          // headerRight: () => (
          //   <Pressable
          //     onPress={() => navigation.navigate('Modal')}
          //     style={({ pressed }) => ({
          //       opacity: pressed ? 0.5 : 1,
          //     })}>
          //     <FontAwesome
          //       name="info-circle"
          //       size={25}
          //       color={Colors[colorScheme].text}
          //       style={{ marginRight: 15 }}
          //     />
          //   </Pressable>
          // ),
        })}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoScreencomp}
        options={{
          title: 'Saved Feeds',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * topbar icon
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}