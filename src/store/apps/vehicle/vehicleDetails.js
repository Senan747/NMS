import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchVehicleEngine = createAsyncThunk('vehicles/fetchVehicleEngine', async () => {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/engine_types')

    if (!response.ok) {
      throw new Error('HTTP error! Status: ' + response.status)
    }
    const data = await response.json()
    return data.engine_types
  } catch (error) {
    throw new Error('Fetch error: ' + error.message)
  }
})

export const fetchVehicleFuel = createAsyncThunk('vehicles/fetchVehicleFuel', async () => {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/fuel_kindes')

    if (!response.ok) {
      throw new Error('HTTP error! Status: ' + response.status)
    }
    const data = await response.json()
    return data.fuel_kindes
  } catch (error) {
    throw new Error('Fetch error: ' + error.message)
  }
})

export const fetchVehicleTypes = createAsyncThunk('vehicles/fetchVehicleTypes', async () => {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/vehicle_types')

    if (!response.ok) {
      throw new Error('HTTP error! Status: ' + response.status)
    }

    const data = await response.json()
    return data.vehicle_types
  } catch (error) {
    throw new Error('Fetch error: ' + error.message)
  }
})

export const fetchVehicleKindes = createAsyncThunk('vehicles/fetchVehicleKindes', async () => {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/vehicle_kindes')

    if (!response.ok) {
      throw new Error('HTTP error! Status: ' + response.status)
    }

    const data = await response.json()
    return data.vehicle_kindes
  } catch (error) {
    throw new Error('Fetch error: ' + error.message)
  }
})

export const fetchTechnicalConditions = createAsyncThunk('vehicles/fetchTechnicalConditions', async () => {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/technical_conditions')

    if (!response.ok) {
      throw new Error('HTTP error! Status: ' + response.status)
    }

    const data = await response.json()
    return data.technical_conditions
  } catch (error) {
    throw new Error('Fetch error: ' + error.message)
  }
})

export const fetchStacks = createAsyncThunk('vehicles/fetchStacks', async () => {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/stacks')

    if (!response.ok) {
      throw new Error('HTTP error! Status: ' + response.status)
    }

    const data = await response.json()
    return data.stack
  } catch (error) {
    throw new Error('Fetch error: ' + error.message)
  }
})

const vehiclesSlice = createSlice({
  name: 'vehicles',
  initialState: {
    engineTypes: [],
    vehicleFuel: [],
    vehicleType: [],
    vehicleKind: [],
    technicalConditions: [],
    stacks: []
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchVehicleEngine.fulfilled, (state, action) => {
        state.engineTypes = action.payload
      })
      .addCase(fetchVehicleFuel.fulfilled, (state, action) => {
        state.vehicleFuel = action.payload
      })
      .addCase(fetchVehicleTypes.fulfilled, (state, action) => {
        state.vehicleType = action.payload
      })
      .addCase(fetchVehicleKindes.fulfilled, (state, action) => {
        state.vehicleKind = action.payload
      })
      .addCase(fetchTechnicalConditions.fulfilled, (state, action) => {
        state.technicalConditions = action.payload
      })
      .addCase(fetchStacks.fulfilled, (state, action) => {
        state.stacks = action.payload
      })
  }
})

export default vehiclesSlice.reducer
