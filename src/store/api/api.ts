import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query'
import { createApi } from '@reduxjs/toolkit/query/react'
import { IMemes } from '../../types/IMemes'
import { IUsers } from '../../types/IUsers'
import { IProfile } from '../../types/IProfile'

export const api = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
	tagTypes: ['meme'],
	refetchOnFocus: true,
	endpoints: build => ({
		fetchAllMemes: build.query<IMemes[], string>({
			query: () => ({
				url: '/memes'
			}),
			providesTags: () => [{
				type: 'meme'
			}]
		}),
		createMeme: build.mutation<IMemes, IMemes>({
			query: meme => ({
				url: '/memes',
				method: 'POST',
				body: meme,
			}),
			invalidatesTags: () => [{
				type: 'meme'
			}]
		}),
		deleteMeme: build.mutation({
      query: (id) => ({
        url: `/memes/${id}`,
        method: 'DELETE',
      }),
    }),
		fetchMemeInfo: build.query<IMemes, number>({
			query: (memeId: number) => ({
				url: `/meme/${memeId}`
			}),
		}),
		fetchUserMeme: build.query<IUsers[], number>({
			query: (userId: number) => ({
				url: `/users?id=${userId}`,
			}),
		}),
		fetchProfileData: build.query<IProfile, string>({
			query: () => ({
				url: '/myProfile',
			}),
		}),
	}),
})
