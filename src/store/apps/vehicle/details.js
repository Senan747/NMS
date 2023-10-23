import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import _ from 'lodash';

// Növü için async/await fonksiyonu
export const fetchTypeData = createAsyncThunk('dataField/fetchTypeData', async ( row ) => {
  try {
    const endpoint = `http://127.0.0.1:8000/api/vehicle_types/${row}`;
    const response = await fetch(endpoint);

    if (response.ok) {
      const result = await response.json();
      return result.vehicle_types_title;
    } else {
      throw new Error('Error fetching data');
    }
  } catch (error) {
    throw error;
  }
});

// Mövzu için async/await fonksiyonu
export const fetchSubjectData = createAsyncThunk('dataField/fetchSubjectData', async ( row ) => {
  try {
    const endpoint = `http://127.0.0.1:8000/api/vehicle_kindes/${row}`;
    const response = await fetch(endpoint);

    if (response.ok) {
      const result = await response.json();
      return result.vehicle_kindes_title;
    } else {
      throw new Error('Error fetching data');
    }
  } catch (error) {
    throw error;
  }
});

// Mühərrik için async/await fonksiyonu
export const fetchEngineData = createAsyncThunk('dataField/fetchEngineData', async ( row ) => {
  try {
    const endpoint = `http://127.0.0.1:8000/api/engine_types/${row}`;
    const response = await fetch(endpoint);

    if (response.ok) {
      const result = await response.json();
      return result.engine_types_title;
    } else {
      throw new Error('Error fetching data');
    }
  } catch (error) {
    throw error;
  }
});

// Yanacaq için async/await fonksiyonu
export const fetchFuelData = createAsyncThunk('dataField/fetchFuelData', async ( row ) => {
  try {
    const endpoint = `http://127.0.0.1:8000/api/fuel_kindes/${row}`;
    const response = await fetch(endpoint);

    if (response.ok) {
      const result = await response.json();
      return result.fuel_kindes_title;
    } else {
      throw new Error('Error fetching data');
    }
  } catch (error) {
    throw error;
  }
});

// Texniki için async/await fonksiyonu
export const fetchConditionData = createAsyncThunk('dataField/fetchConditionData', async ( row ) => {
  try {
    const endpoint = `http://127.0.0.1:8000/api/technical_conditions/${row}`;
    const response = await fetch(endpoint);

    if (response.ok) {
      const result = await response.json();
      return result.technical_conditions_title;
    } else {
      throw new Error('Error fetching data');
    }
  } catch (error) {
    throw error;
  }
});

const initialState = {
  typeField: null, // İlk durumu tanımlayın
  subjectField: null,
  engineField: null,
  fuelField: null,
  conditionField: null,
};

const dataSlice = createSlice({
  name: 'dataField',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTypeData.fulfilled, (state, action) => {
        state.typeField = action.payload;
      })
      .addCase(fetchSubjectData.fulfilled, (state, action) => {
        state.subjectField = action.payload;
      })
      .addCase(fetchEngineData.fulfilled, (state, action) => {
        state.engineField = action.payload;
      })
      .addCase(fetchFuelData.fulfilled, (state, action) => {
        state.fuelField = action.payload;
      })
      .addCase(fetchConditionData.fulfilled, (state, action) => {
        state.conditionField = action.payload;
      });
  },
});

export default dataSlice.reducer;
