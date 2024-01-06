import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';



    export const shazamCoreApi = createApi({
        reducerPath: 'shazamCoreApi',
        baseQuery: fetchBaseQuery({
            baseUrl: 'https://shazam-core.p.rapidapi.com/v1',
            prepareHeaders: (headers) => {
                headers.set('X-RapidAPI-Key', '06e0e1fd8cmsh36e847b01c3a2a9p1586c7jsn3371c4301606')


                return headers;
            }
        }),
        endpoints: (builder) => ({
            getTopCharts: builder.query({query: () => '/charts/world'}),
        })
    })


    export const {
        useGetTopChartsQuery,
    } = shazamCoreApi;