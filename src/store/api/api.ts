import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query'
import { createApi } from '@reduxjs/toolkit/query/react'
import { IMemes } from '../../types/IMemes'

const API_URL =  'http://localhost:3000/memes'

export const api = createApi({
	 reducerPath: 'api',
	 tagTypes: ['Memes'],
	 baseQuery: fetchBaseQuery({
		baseUrl: API_URL,
	 }),
	 endpoints: builder => ({
		getMemes: builder.query<IMemes[], string>({
			query: (name) => `${name}`,
		}),
	}),
})

export const { useGetMemesQuery } = api