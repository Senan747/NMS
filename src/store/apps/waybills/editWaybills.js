import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ShowEdit: false,
  editId: '',
  pageWaybill: 0,
  checkWaybillId: []
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
    },
    setCheckWaybillId: (state, action) => {
      state.checkWaybillId = state.checkWaybillId.concat(...state.checkWaybillId, action.payload);    
    },
    deleteCheckWaybillId: (state, action) => {
      state.checkWaybillId = state.checkWaybillId.filter(id => id != action.payload)
    },
    removeCheckWaybillId: (state, action) => {
      state.checkWaybillId = []
    }
  },
});

export const { closeShowEdit, openShowEdit, setEditId, setPageWaybill, setCheckWaybillId, deleteCheckWaybillId, removeCheckWaybillId } = ShowEdit.actions;
export default ShowEdit.reducer;