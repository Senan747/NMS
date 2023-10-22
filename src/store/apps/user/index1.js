import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addDataLoading: false
}

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setAddDataLoading: (state, action) => {
      state.addDataLoading = action.payload;
    }
  }
});

export const { setAddDataLoading } = dataSlice.actions;
export default dataSlice.reducer;
