import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query'
import { createApi } from '@reduxjs/toolkit/query/react'
import { IMemes } from '../../types/IMemes'

export const api = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
	tagTypes: ['api'],
	refetchOnFocus: true,
	endpoints: build => ({
		fetchAllMemes: build.query<IMemes[], string>({
			query: () => ({
				url: '/memes'
			}),
		}),
	}),
})
