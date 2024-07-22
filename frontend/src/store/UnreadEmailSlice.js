import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchEmailCount = createAsyncThunk(
  'emails/fetchEmailCount',
  async (token) => {
    try {
      const response = await axios.get('https://mail-box-client-c2vn.onrender.com/emails/emailscount', {
        headers: {
          "Authorization": token
        }
      });
      return response.data.count;
    } catch (error) {
      throw error;
    }
  }
);

const initialState = {
  count: 0,
  status: 'idle',
  error: null,
};

const emailSlice = createSlice({
  name: 'emails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchEmailCount.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.count = action.payload;
    });
  },
});

export default emailSlice.reducer;
