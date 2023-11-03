import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ShowEdit: false,
  editId: '',
  page: 0
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
    },
    setPage: (state, action) => {
      state.page = action.payload
    }
  },
});

export const { closeShowEdit, openShowEdit, setEditId, setPage } = ShowEdit.actions;
export default ShowEdit.reducer;