import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query'
import { createApi } from '@reduxjs/toolkit/query/react'
import { IUsers } from '../../types/IUsers'
import { IMemes } from '../../types/IMemes'
import { IProfile } from '../../types/IProfile'

export const userAPI = createApi({
	reducerPath: 'userAPI',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
	tagTypes: ['user'],
	refetchOnFocus: true,
	endpoints: build => ({
		fetchUserId: build.query<IUsers[], number>({
			query: (userId: number) => ({
				url: `/users?id=${userId}`
			})
		}),
		fetchUserIdMeme: build.query<IUsers[], number>({
			query: (id: number) => ({
				url: `/users?id=${id}`
			})
		}),
		fetchMemesUserId: build.query<IMemes[], number>({
			query: (id: number) => ({
				url: `/users/${id}/memes`
			})
		}),
		fetchProfileData: build.query<IProfile, string>({
			query: () => ({
				url: '/myProfile',
			}),
		}),
		subUser: build.mutation<IUsers, IUsers>({
			query: user => ({
				url: '/subscriptions',
				method: 'POST',
				body: user
			})
		}),
		unSubUser: build.mutation<IUsers, number | undefined>({
			query: (id: number) => ({
				url: `/subscriptions/${id}`,
				method: 'DELETE'
			})
		}),
		updateUser: build.mutation<IUsers, IUsers>({
			query: (user) => ({
				url: `/users/${user.id}`,
				method: 'PUT',
				body: user
			}),
			invalidatesTags: () => [{
				type: 'user'
			}]
		}),
		fetchSubscriptions: build.query<IUsers[], string>({
			query: () => ({
				url: '/subscriptions'
			})
		}),
	}),
})
