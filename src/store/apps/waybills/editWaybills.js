import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ShowEdit: false,
  editId: ''
};

const ShowEdit = createSlice({
  name: "ShowEdit",
  initialState,
  reducers: {
    openShowEdit: (state, action) => {
      state.ShowEdit = true;
    },
    closeShowEdit: (state, action) => {
      state.ShowEdit = false
    },
    setEditId: (state, action) => {
      state.editId = action.payload
    }
  },
});

export const { closeShowEdit, openShowEdit, setEditId } = ShowEdit.actions;
export default ShowEdit.reducer;