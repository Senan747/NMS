import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ShowEdit: false,
  editId: '',
  pageWaybill: 0
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
    setPageWaybill: (state, action) => {
      state.pageWaybill = action.payload
    }
  },
});

export const { closeShowEdit, openShowEdit, setEditId, setPageWaybill } = ShowEdit.actions;
export default ShowEdit.reducer;