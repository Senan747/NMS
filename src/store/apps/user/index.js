import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch Users
export const fetchData = createAsyncThunk('appUsers/fetchData', async (params) => {
  const response = await axios.get('/apps/users/list', { params });
  return response.data;
});

// Add User
export const addUser = createAsyncThunk('appUsers/addUser', async (data, { getState, dispatch }) => {
  const response = await axios.post('/apps/users/add-user', { data });
  dispatch(fetchData(getState().user.params));
  return response.data;
});

// Delete User
export const deleteUser = createAsyncThunk('appUsers/deleteUser', async (id, { getState, dispatch }) => {
  const response = await axios.delete('/apps/users/delete', { data: id });
  dispatch(fetchData(getState().user.params));
  return response.data;
});

// Update User
export const updateUser = createAsyncThunk('appUsers/updateUser', async (data, { getState, dispatch }) => {
  const response = await axios.put('/apps/users/update-user', { data });
  dispatch(fetchData(getState().user.params));
  return response.data;
});

const appUsersSlice = createSlice({
  name: 'appUsers',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.users;
      state.total = action.payload.total;
      state.params = action.payload.params;
      state.allData = action.payload.allData;
    });
  },
});

export default appUsersSlice.reducer;
