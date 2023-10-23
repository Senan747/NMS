import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchData = createAsyncThunk('waybills/fetchData', async () => {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/vehicles')

    if (!response.ok) {
      throw new Error('HTTP error! Status: ' + response.status)
    }
    const data = await response.json()
    return data.vehicles
  } catch (error) {
    throw new Error('Fetch error: ' + error.message)
  }
})

export const postData = createAsyncThunk('waybills/postData', async dataToPost => {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/vehicles', {
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
    console.log('Data posted successfully:', data)
    return data
  } catch (error) {
    throw new Error('Fetch error: ' + error.message)
  }
})

export const putData = createAsyncThunk('/waybills/putData', async ({combinedData, updateId}) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/vehicles/${updateId}`, {
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

export const deleteData = createAsyncThunk('waybills/deleteData', async (idToDelete) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/vehicles/${idToDelete}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error('HTTP error! Status: ' + response.status);
    }

    // Return the ID of the deleted item to identify it
    return idToDelete;
  } catch (error) {
    throw new Error('Fetch error: ' + error.message);
  }
});


const waybillsSlice = createSlice({
  name: 'waybills',
  initialState: {
    data: []
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        state.data = action.payload
      })
      .addCase(postData.fulfilled, (state, action) => {
        state.data = [...state.data, action.payload]
      })
      .addCase(putData.fulfilled, (state, action) => {
        const updatedData = state.data.map(item => {
          if (item.id === action.payload.id) {
            return action.payload
          }
          return item
        })
        state.data = updatedData
      })
      .addCase(deleteData.fulfilled, (state, action) => {
        // Remove the item with the matching ID from the state
        state.data = state.data.filter(item => item.id !== action.payload);
      })
  }
})

export default waybillsSlice.reducer
