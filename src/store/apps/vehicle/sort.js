import { createSlice } from "@reduxjs/toolkit";

const sortSlice = createSlice({
    name: 'sort',
    initialState: {
        sortField: ''
    },
    reducers: {
        setSortField: (state, action) => {
            state.sortField = action.payload
        }
    }
})

export const {setSortField} = sortSlice.actions
export default sortSlice.reducer