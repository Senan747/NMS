import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ShowUpdate: false,
  updateId: ''
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
    },
    setUpdateId: (state, action) => {
      state.updateId = action.payload
    }
  },
});

export const { closeShowUpdate, openShowUpdate, setUpdateId } = ShowUpdate.actions;
export default ShowUpdate.reducer;