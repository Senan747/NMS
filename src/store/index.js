import { configureStore } from '@reduxjs/toolkit'
// import { setupListeners } from '@reduxjs/toolkit/query/react'

// ** Reducers
import ShowUpdate from './apps/vehicle/ShowUpdate'
import vehicleDetails from './apps/vehicle/vehicleDetails'
import editWaybills from './apps/waybills/editWaybills'
import { api } from './apps/vehicle/api'
import { apiWaybill } from './apps/waybills/apiWaybill'

export const store = configureStore({
  reducer: {
    ShowUpdate,
    vehicleDetails,
    editWaybills,
    [api.reducerPath]: api.reducer,
    [apiWaybill.reducerPath]: apiWaybill.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
      .concat(api.middleware)
      .concat(apiWaybill.middleware)
})

// setupListeners(store.dispatch)
