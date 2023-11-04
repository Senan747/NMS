import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/api/' }),
  tagTypes: ['success'],
  endpoints: builder => ({
    getVehicles: builder.query({
      query: page => `vehicles?page=${page}`,
      providesTags: ['success'],
    }),
    createVehicle: builder.mutation({
      query: vehicleData => ({
        url: 'vehicles',
        method: 'POST',
        body: vehicleData,
      }),
      invalidatesTags: ['success'],
    }),
    updateVehicle: builder.mutation({
      query: ({ updateId, vehicleData }) => ({
        url: `vehicles/${updateId}`,
        method: 'PUT',
        body: vehicleData,
      }),
      invalidatesTags: ['success'],
    }),
    deleteVehicle: builder.mutation({
      query: id => ({
        url: `vehicles/${id}`,
        method: 'DELETE',
      }),
      onError: (error, { idToDelete }, context) => {
        if (error.status === 500) {
          return error;
        }
      },
      invalidatesTags: ['success'],
    }),
    getAllVehicles: builder.mutation({
      query: () => 'vehicles/index/all', // Fixed the query URL
      providesTags: ['success']// Updated the tag to match the expected response
    }),
  }),
});

export const {
  useGetVehiclesQuery,
  useCreateVehicleMutation,
  useUpdateVehicleMutation,
  useDeleteVehicleMutation,
  useGetAllVehiclesMutation,
} = api;
