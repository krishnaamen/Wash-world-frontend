// authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as Securestore from 'expo-secure-store';

interface AuthState {
  token: string | null;
  
}

const initialState: AuthState = {
  token: null,
  
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<any>) {
      console.log('setting token', action.payload);
      state.token = action.payload;
      Securestore.setItemAsync('token', action.payload);
    },
    clearToken(state) {
      state.token = '';
      Securestore.deleteItemAsync('token');
      Securestore.deleteItemAsync('current_user');
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;
