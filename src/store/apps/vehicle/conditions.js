import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addDataLoading: false,
  dataCondition: '',
  waybillCondition: '',
  page: 0,
}

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setAddDataLoading: (state, action) => {
      state.addDataLoading = action.payload;
    },
    setAddDataCondition: (state, action) => {
      state.dataCondition = action.payload
    },
    setAddWaybillCondition: (state, action) => {
      state.waybillCondition = action.payload
    },
    setPage: (state, action) => {
      state.page = action.payload
    }
  }
});

export const { setAddDataLoading, setAddDataCondition, setAddWaybillCondition, setPage } = dataSlice.actions;
export default dataSlice.reducer;
