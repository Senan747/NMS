import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/api/' }),
  tagTypes: ['success'],
  endpoints: builder => ({
    getVehicles: builder.query({
      query: ({ page1, value }) => {
        let query = `vehicles?page=${page1}`
        if (value) {
          query += `&vehicle_plate_number=${value}`
        }
        return query;
      },
      providesTags: ['success']
    }),
    getVehiclesId: builder.query({
      query: (updateId) => {
        let query = `vehicles/${updateId}`
        return query;
      },
      providesTags: ['success']
    }),
    createVehicle: builder.mutation({
      query: vehicleData => ({
        url: 'vehicles',
        method: 'POST',
        body: vehicleData
      }),
      invalidatesTags: ['success']
    }),
    updateVehicle: builder.mutation({
      query: ({ updateId, vehicleData }) => ({
        url: `vehicles/${updateId}`,
        method: 'PUT',
        body: vehicleData
      }),
      invalidatesTags: ['success']
    }),
    deleteVehicle: builder.mutation({
      query: id => ({
        url: `vehicles/${id}`,
        method: 'DELETE'
      }),
      onError: (error, { idToDelete }, context) => {
        if (error.status === 500) {
          return error
        }
      },
      invalidatesTags: ['success']
    })
  })
})

export const { useGetVehiclesQuery, useGetVehiclesIdQuery, useCreateVehicleMutation, useUpdateVehicleMutation, useDeleteVehicleMutation } = api
