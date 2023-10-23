// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import index from 'src/store/apps/vehicle/index'
import index1 from 'src/store/apps/vehicle/index1'
import invoice from 'src/store/apps/invoice'
import ShowUpdate from './apps/ShowUpdate'
import vehicleDetails from './apps/vehicle/vehicleDetails'
import details from './apps/vehicle/details'

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
