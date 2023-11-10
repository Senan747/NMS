import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataCondition: '',
  waybillCondition: '',
}

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setAddDataCondition: (state, action) => {
      state.dataCondition = action.payload
    },
    setAddWaybillCondition: (state, action) => {
      state.waybillCondition = action.payload
    },
  }
});

export const { setAddDataCondition, setAddWaybillCondition } = dataSlice.actions;
export default dataSlice.reducer;
