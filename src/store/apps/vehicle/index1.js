import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addDataLoading: false,
  dataCondition: '',
  waybillCondition: ''
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
    }
  }
});

export const { setAddDataLoading, setAddDataCondition, setAddWaybillCondition } = dataSlice.actions;
export default dataSlice.reducer;
