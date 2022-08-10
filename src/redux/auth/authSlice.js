import { createSlice } from '@reduxjs/toolkit';
import { logIn, register, logOut, refreshCurrentUser } from './authOperations';

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLogged: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    [register.fulfilled](state, { payload }) {
      state.user = payload.user;
      state.token = payload.token;
      state.isLogged = true;
    },
    [logIn.fulfilled](state, { payload }) {
      state.user = payload.user;
      state.token = payload.token;
      state.isLogged = true;
    },
    [logOut.fulfilled](state) {
      state.user = { name: null, email: null };
      state.token = null;
      state.isLogged = false;
    },
    // [refreshCurrentUser.pending](state) {
    //   state.isLogged = true;
    // },
    [refreshCurrentUser.fulfilled](state, { payload }) {
      state.user = payload;
      state.isLogged = true;
    },
  },
});

// export default authSlice.reducer;
