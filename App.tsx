/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import React from 'react';
import Main from './app/Main';
import { Provider } from 'react-redux';
import {store} from './app/redux/store';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';


const App = (props: any) => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
      <Provider store={store}>
        <GestureHandlerRootView style={styles.container}>
          <Main />
        </GestureHandlerRootView>
        </Provider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
