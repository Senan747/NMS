import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ShowUpdate: false,
};

const ShowUpdate = createSlice({
  name: "ShowUpdate",
  initialState,
  reducers: {
    openShowUpdate: (state, action) => {
      state.ShowUpdate = true;
    },
    closeShowUpdate: (state, action) => {
      state.ShowUpdate = false
    }
  },
});

export const { closeShowUpdate, openShowUpdate } = ShowUpdate.actions;
export default ShowUpdate.reducer;