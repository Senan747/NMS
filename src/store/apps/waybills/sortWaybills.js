import { createSlice } from "@reduxjs/toolkit";

const sortSlice = createSlice({
    name: 'sort',
    initialState: {
        sortFieldWaybill: ''
    },
    reducers: {
        setSortFieldWaybill: (state, action) => {
            state.sortFieldWaybill = action.payload
        }
    }
})

export const {setSortFieldWaybill} = sortSlice.actions
export default sortSlice.reducer