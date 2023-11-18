import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ShowUpdate: false,
  updateId: '',
  checkId: []
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
    },
    setCheckId: (state, action) => {
      state.checkId = state.checkId.concat(...state.checkId, action.payload);    
    },
    deleteCheckId: (state, action) => {
      state.checkId = state.checkId.filter(id => id != action.payload)
    },
    removeCheckId: (state, action) => {
      state.checkId = []
    }
  },
});

export const { closeShowUpdate, openShowUpdate, setUpdateId, setCheckId, deleteCheckId, removeCheckId } = ShowUpdate.actions;
export default ShowUpdate.reducer;