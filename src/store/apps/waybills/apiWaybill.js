import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiWaybill = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/api/' }),
  reducerPath: 'apiWaybill',
  tagTypes: ['success'],
  endpoints: builder => ({
    getWaybills: builder.query({
      query: ({pageWaybill, value}) => {
        let query = `waybills?page=${pageWaybill}`
        if(value){
          query += `&waybills_no=${value}`
        }
        return query;
      },
      providesTags: ['success']
    }),
    getAllWaybills: builder.query({
      query: () => '/waybills/index/all',
      providesTags: ['success']
    }),
    getWaybillsId: builder.query({
      query: (editId) => {
        let query = `waybills/${editId}`
        return query;
      },
      providesTags: ['success']
    }),
    createWaybill: builder.mutation({
      query: waybillData => ({
        url: 'waybills',
        method: 'POST',
        body: waybillData
      }),
      invalidatesTags: ['success']
    }),
    updateWaybill: builder.mutation({
      query: ({ editId, waybillData }) => ({
        url: `waybills/${editId}`,
        method: 'PUT',
        body: waybillData
      }),
      invalidatesTags: ['success']
    }),
    deleteWaybill: builder.mutation({
      query: id => ({
        url: `waybills/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['success']
    })
  })
})

export const {
  useGetWaybillsQuery,
  useGetAllWaybillsQuery,
  useGetWaybillsIdQuery,
  useCreateWaybillMutation,
  useUpdateWaybillMutation,
  useDeleteWaybillMutation,
} = apiWaybill
