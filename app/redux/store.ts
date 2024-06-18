import {configureStore} from '@reduxjs/toolkit';
import userReducer from '../redux/slices/userSlice';
import appReducer from '../redux/slices/appSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    app: appReducer
  },
});
