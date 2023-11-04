import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const allApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/api/' }),
  reducerPath: 'allDatas',
  endpoints: (builder) => ({
    fetchWaybills: builder.query({
      query: () => 'waybills/index/all',
    }),
    fetchData: builder.query({
      query: () => 'vehicles/index/all',
    }),
  }),
});

export const { useFetchWaybillsQuery, useFetchDataQuery } = allApi;
