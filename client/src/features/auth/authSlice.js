import { createSlice } from '@reduxjs/toolkit';

const user = JSON.parse(localStorage.getItem('User'));

const initialState = {
  user: user ? user : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
});

export default authSlice.reducers;
