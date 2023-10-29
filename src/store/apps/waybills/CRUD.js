import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchWaybills = createAsyncThunk('waybills/fetchData', async () => {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/waybills')

    if (!response.ok) {
      throw new Error('HTTP error! Status: ' + response.status)
    }
    const data = await response.json()
    return data.waybills.data
  } catch (error) {
    throw new Error('Fetch error: ' + error.message)
  }
})

export const postWaybills = createAsyncThunk('waybills/postData', async dataToPost => {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/waybills', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToPost)
    })

    if (!response.ok) {
      const errorData = await response.json()

      throw new Error('HTTP error! Status: ' + response.status)
    }

    const data = await response.json()
    return data
  } catch (error) {
    throw new Error('Fetch error: ' + error.message)
  }
})

export const putWaybills = createAsyncThunk('/waybills/putData', async ({combinedData, editId}) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/waybills/${editId}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(combinedData)
    })
    if (!response.ok) {
      const errorData = await response.json()

      throw new Error('HTTP error! Status: ' + response.status)
    }

    const data = await response.json()
    return data
  } catch (error) {
    throw new Error('Fetch error: ' + error.message)
  }
})

export const deleteWaybills = createAsyncThunk('waybills/deleteData', async (idToDelete) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/waybills/${idToDelete}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error('HTTP error! Status: ' + response.status);
    }

    return idToDelete;
  } catch (error) {
    throw new Error('Fetch error: ' + error.message);
  }
});


const waybillsSlice = createSlice({
  name: 'waybills',
  initialState: {
    dataWaybills: []
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchWaybills.fulfilled, (state, action) => {
        state.dataWaybills = action.payload
      })
      .addCase(postWaybills.fulfilled, (state, action) => {
        state.dataWaybills = [...state.dataWaybills, action.payload]
      })
      .addCase(putWaybills.fulfilled, (state, action) => {
        const updatedData = state.dataWaybills.map(item => {
          if (item.id === action.payload.id) {
            return action.payload
          }
          return item
        })
        state.dataWaybills = updatedData
      })
      .addCase(deleteWaybills.fulfilled, (state, action) => {
        state.dataWaybills = state.dataWaybills.filter(item => item.id !== action.payload);
      })
  }
})

export default waybillsSlice.reducer
