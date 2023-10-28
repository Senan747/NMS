import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchData = createAsyncThunk('appUsers/fetchData', async () => {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/vehicles')

    if (!response.ok) {
      throw new Error('HTTP error! Status: ' + response.status)
    }
    const data = await response.json()
    return data.vehicles.data
  } catch (error) {
    throw new Error('Fetch error: ' + error.message)
  }
})

export const postData = createAsyncThunk('appUsers/postData', async dataToPost => {
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

    // console.log('Data posted successfully:', data)
    return data
  } catch (error) {
    throw new Error('Fetch error: ' + error.message)
  }
})

export const putData = createAsyncThunk('/appUsers/putData', async ({ combinedData, updateId }) => {
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

export const deleteData = createAsyncThunk('appUsers/deleteData', async idToDelete => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/vehicles/${idToDelete}`, {
      method: 'DELETE'
    })

    if (!response.ok) {
      const errorData = await response.json()

      if (response.status === 500) {
        // Burada heç bir şey etməyin və yalnız errorı geri qaytarın
        return thunkAPI.rejectWithValue(errorData)
      }

      throw new Error('HTTP error! Status: ' + response.status)
    }

    // Return the ID of the deleted item to identify it
    return idToDelete
  } catch (error) {
    throw new Error('Fetch error: ' + error.message)
  }
})

export const fetchIdData = createAsyncThunk('appUsers/fetchIdData', async idToGet => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/vehicles/${idToGet}`)

    if (!response.ok) {
      throw new Error('HTTP error! Status: ' + response.status)
    }
    const vehicle = await response.json()
    return vehicle
  } catch (error) {
    throw new Error('Fetch error: ' + error.message)
  }
})

const appUsersSlice = createSlice({
  name: 'appUsers',
  initialState: {
    data: [],
    vehicle: []
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
        state.data = state.data.filter(item => item.id !== action.payload)
      })
      .addCase(fetchIdData.fulfilled, (state, action) => {
        state.vehicle = action.payload
      })
  }
})

export default appUsersSlice.reducer
