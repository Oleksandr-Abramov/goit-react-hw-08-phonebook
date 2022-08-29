import { createSlice } from '@reduxjs/toolkit';
import { logIn, register, logOut, refreshCurrentUser } from './authOperations';

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLogged: false,
  isFetchingCurrentUser: false,
  isLoginOk: true,
  isRegisterOk: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    [register.pending](state) {
      state.isRegisterOk = true;
    },

    [register.fulfilled](state, { payload }) {
      state.user = payload.user;
      state.token = payload.token;
      state.isLogged = true;
    },

    [register.rejected](state) {
      state.isRegisterOk = false;
    },

    [logIn.pending](state) {
      state.isLoginOk = true;
    },

    [logIn.fulfilled](state, { payload }) {
      state.user = payload.user;
      state.isLogged = true;
      state.token = payload.token;
      state.isLoginOk = true;
    },

    [logIn.rejected](state) {
      state.isLogged = false;
      state.isLoginOk = false;
    },

    [logOut.fulfilled](state) {
      state.user = { name: null, email: null };
      state.token = null;
      state.isLogged = false;
    },

    [refreshCurrentUser.pending](state) {
      state.isFetchingCurrentUser = true;
    },

    [refreshCurrentUser.fulfilled](state, { payload }) {
      state.isLogged = true;
      state.user = payload;
      state.isFetchingCurrentUser = false;
    },

    [refreshCurrentUser.rejected](state) {
      state.isFetchingCurrentUser = false;
    },
  },
});
const authReducer = authSlice.reducer;
export default authReducer;
