import React, { useEffect } from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Colors from './constants/Colors';
import SpotifySVG from './assets/svg/SpotifySVG.svg';
import Fonts from './constants/Fonts';
import {authorize} from 'react-native-app-auth';
import {spotifyAuthConfig} from './authconfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import { setApiToken } from './redux/slices/userSlice';

const LandingScreen = (props: any) => {
  const dispatch = useDispatch();

  const handleSpotifyLogin = async () => {
    try {
      const result = await authorize(spotifyAuthConfig);
      if(result.accessToken){
        const expirationDate = new Date(result.accessTokenExpirationDate).getTime()
        AsyncStorage.setItem('api_token',result.accessToken)
        AsyncStorage.setItem('expirationDate',expirationDate.toString())
        dispatch(setApiToken(result.accessToken))
      }

    } catch (error) {
      console.error(error);
    }
  };

  return (
      <View style={{flex: 1, paddingHorizontal: 20, backgroundColor: Colors.black, alignItems:'center'}}>
        <View style={{alignItems: 'center', justifyContent: 'center', flex:1}}>
          <SpotifySVG height={90} width={90} />

          <View style={{paddingVertical:12}} >
          <Text style={{color: Colors.white, fontSize: 35, fontFamily: Fonts.bold, textAlign: 'center'}}>
            Stream your favorite music
          </Text>
          </View>
         
        </View>
        <View style={{flexDirection: 'row', paddingHorizontal: 12, flex:1, alignItems:'flex-start'}}>
          <TouchableOpacity
            onPress={handleSpotifyLogin}
            style={{
              flexDirection: 'row',
              backgroundColor: Colors.white,
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 10,
              borderRadius: 8,
            }}>
            <Text style={{color: Colors.primary_text, fontSize: 16, fontFamily: Fonts.bold, textAlign: 'center'}}>
              Login
            </Text>
            <View style={{marginLeft: 10}}>
              <SpotifySVG height={25} width={25} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
  );
};

export default LandingScreen;
