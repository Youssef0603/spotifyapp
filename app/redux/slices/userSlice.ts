import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  apiToken: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setApiToken: (state, action) => {
      state.apiToken = action.payload;
    },
  },
});

export const { setApiToken } = userSlice.actions;
export default userSlice.reducer;
