import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchWaybills = createAsyncThunk('waybills/fetchWaybills', async () => {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/waybills/index/all')

    if (!response.ok) {
      throw new Error('HTTP error! Status: ' + response.status)
    }
    const data = await response.json()
    return data.waybills
  } catch (error) {
    throw new Error('Fetch error: ' + error.message)
  }
})

export const fetchData = createAsyncThunk('appUsers/fetchData', async () => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/vehicles/index/all`)

    if (!response.ok) {
      throw new Error('HTTP error! Status: ' + response.status)
    }
    const data = await response.json()
    return data.vehicles
  } catch (error) {
    throw new Error('Fetch error: ' + error.message)
  }
})

const waybillsSlice = createSlice({
  name: 'waybills',
  initialState: {
    dataWaybills: [],
    data: []
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchWaybills.fulfilled, (state, action) => {
        state.dataWaybills = action.payload
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.data = action.payload
      })
  }
})

export default waybillsSlice.reducer
