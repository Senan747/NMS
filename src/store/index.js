// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import index from 'src/store/apps/user/index'
import index1 from 'src/store/apps/user/index1'
import invoice from 'src/store/apps/invoice'
import ShowUpdate from './apps/ShowUpdate'
import vehicleDetails from './apps/user/vehicleDetails'
import details from './apps/user/details'


export const store = configureStore({
  reducer: {
    index,
    index1,
    invoice,
    ShowUpdate,
    vehicleDetails,
    details
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false  
    })
})
