import { configureStore } from '@reduxjs/toolkit'
// import { setupListeners } from '@reduxjs/toolkit/query/react'

// ** Reducers
import index from 'src/store/apps/vehicle/index'
import conditions from 'src/store/apps/vehicle/conditions'
import ShowUpdate from './apps/ShowUpdate'
import vehicleDetails from './apps/vehicle/vehicleDetails'
import details from './apps/vehicle/details'
import allDatas from './apps/allData'
import editWaybills from './apps/waybills/editWaybills'
import sort from './apps/vehicle/sort'
import sortWaybills from './apps/waybills/sortWaybills'
import { api } from './apps/vehicle/api'
import { apiWaybill } from './apps/waybills/apiWaybill'

export const store = configureStore({
  reducer: {
    index,
    conditions,
    ShowUpdate,
    vehicleDetails,
    details,
    allDatas,
    editWaybills,
    sort,
    sortWaybills,
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
