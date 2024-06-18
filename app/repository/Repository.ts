import axios from 'axios';
import {I18nManager, Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_URL} from '@env';

const baseURL = `${API_URL}`;
console.log(baseURL);
const fetchClient = () => {
  const instance = axios.create({
    baseURL: baseURL,
  });

  instance.interceptors.request.use(
    async config => {
      config.headers['os'] = Platform.OS;
      config.headers['Accept'] = 'application/json';
      config.headers['Content-Type'] =
        config.headers['Content-Type'] || 'application/json';
      let apiToken = await AsyncStorage.getItem('api_token');
      console.log('apiToken', apiToken);
      config.headers['Authorization'] = `Bearer ${apiToken}`;
      return config;
    },
    error => {
      return Promise.reject(error);
    },
  );

  return instance;
};

export default fetchClient();
