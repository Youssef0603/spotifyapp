import React from 'react';
import {View, Text} from 'react-native';
import LandingScreen from './LandingScreen';
import {enableScreens} from 'react-native-screens';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import ArtistAlbumScreen from './screens/artists/ArtistAlbumScreen';
import SplashScreen from './SplashScreen';
import {useSelector} from 'react-redux';

const useUserState = () => useSelector((state: {user: any}) => state.user);
const useAppState = () => useSelector((state: {app: any}) => state.app);

const Main = () => {
  const {apiToken} = useUserState();
  const {loaded} = useAppState();
  enableScreens();
  const Stack = createNativeStackNavigator();
  const navigationTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'white',
    },
  };
  const renderContent = () => {
    if(!loaded) {
      return (
        <Stack.Navigator>
          <Stack.Screen name="SplashScreen" component={SplashScreen} options={{headerShown:false}} />
        </Stack.Navigator>
      );
    }
    if(!apiToken && loaded) {
      return (
        <Stack.Navigator>
          <Stack.Screen
            name="LandingScreen"
            component={LandingScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      );
    }
    console.log(apiToken)
    if(loaded &&apiToken) {
      return (
        <Stack.Navigator>
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ArtistAlbumScreen"
            component={ArtistAlbumScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      );
    }
    return null;
  };
  return (
    <NavigationContainer independent={true} theme={navigationTheme}>
      {renderContent()}
    </NavigationContainer>
  );
};

export default Main;
