import React, {useEffect} from 'react';
import Fonts from './constants/Fonts';
import {View, Text} from 'react-native';
import Colors from './constants/Colors';
import {useDispatch} from 'react-redux';
import SpotifySVG from './assets/svg/SpotifySVG.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setApiToken} from './redux/slices/userSlice';
import { setLoaded } from './redux/slices/appSlice';
 
const SplashScreen = (props: any) => {
  const dispatch = useDispatch();
 
  useEffect(() => {
    initialize();
  }, []);

  const initialize = async () => {
    try {
      const apiToken = await AsyncStorage.getItem('api_token');
      if (apiToken) {
        dispatch(setApiToken(apiToken));
        dispatch(setLoaded(true))
      }else{
        dispatch(setLoaded(true))
      }
    } catch (e) {
      console.error('Initialization failed:', e);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: Colors.black}}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <SpotifySVG height={100} width={100} />
      </View>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-end'}}>
        <Text
          style={{
            color: Colors.white,
            fontSize: 20,
            fontFamily: Fonts.bold,
            paddingBottom: 40,
          }}>
          By Spotify
        </Text>
      </View>
    </View>
  );
};
export default SplashScreen;
