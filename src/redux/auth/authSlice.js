import { createSlice } from '@reduxjs/toolkit';
import { logIn, register, logOut, refreshCurrentUser } from './authOperations';

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLogged: false,
  isFetchingCurrentUser: false,
};

const authSlice = createSlice({
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
      state.isLogged = true;
      state.token = payload.token;
    },

    [logOut.fulfilled](state) {
      state.user = { name: null, email: null };
      state.token = null;
      state.isLogged = false;
    },
    [refreshCurrentUser.pending](state) {
      state.isFetchingCurrentUser = true;
      // state.isLogged = state.token ? true : false;
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
// export default authSlice.reducer;
