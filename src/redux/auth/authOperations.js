import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchCurrentUser,
  loginUser,
  logOutUser,
  registerUser,
  tokenUser,
} from 'service/apiService';

export const register = createAsyncThunk(
  'auth/register',
  async (regData, { rejectWithValue }) => {
    try {
      const user = await registerUser(regData);
      // console.log('~ user register', user);

      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logIn = createAsyncThunk(
  'auth/login',
  async (loginData, { rejectWithValue }) => {
    try {
      const user = await loginUser(loginData);
      // console.log('~ user logIn', user);
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const logOut = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const user = await logOutUser();
      // console.log('~ user logOut', user);
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const refreshCurrentUser = createAsyncThunk(
  'auth/refresh',
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return rejectWithValue();
    }

    tokenUser.set(persistedToken);

    // console.log('~ getState()', getState());
    try {
      const user = await fetchCurrentUser();
      // console.log('~ user refreshCurrentUser', user);
      return user;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);
