import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import index from 'src/store/apps/vehicle/index'
import index1 from 'src/store/apps/vehicle/index1'
import invoice from 'src/store/apps/invoice'
import ShowUpdate from './apps/ShowUpdate'
import vehicleDetails from './apps/vehicle/vehicleDetails'
import details from './apps/vehicle/details'
import CRUD from './apps/waybills/CRUD'
import editWaybills from './apps/waybills/editWaybills'
import sort from './apps/vehicle/sort'
import sortWaybills from './apps/waybills/sortWaybills'

export const store = configureStore({
  reducer: {
    index,
    index1,
    invoice,
    ShowUpdate,
    vehicleDetails,
    details, 
    CRUD,
    editWaybills,
    sort,
    sortWaybills
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})
