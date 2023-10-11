// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import user from 'src/store/apps/user'
import invoice from 'src/store/apps/invoice'
import ShowUpdate from './apps/showUpdate'


export const store = configureStore({
  reducer: {
    user,
    invoice,
    ShowUpdate
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})
