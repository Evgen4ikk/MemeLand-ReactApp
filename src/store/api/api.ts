import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query'
import { createApi } from '@reduxjs/toolkit/query/react'
import { IMemes } from '../../types/IMemes'
import { IUsers } from '../../types/IUsers'
import { IProfile } from '../../types/IProfile'
import { IComments } from '../../types/IComments'
import { IAnswers } from '../../types/IAnswer'

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
      query: (meme) => ({
        url: `/memes/${meme.id}`,
        method: 'DELETE'
      }),
			invalidatesTags: () => [{
				type: 'meme'
			}]
    }),
		updateMeme: build.mutation({
      query: (meme) => ({
        url: `/memes/${meme.id}`,
        method: 'PUT',
				body: meme
      }),
			invalidatesTags: () => [{
				type: 'meme'
			}]
    }),
		fetchMemeId: build.query<IMemes, number>({
			query: (memeId: number) => ({
				url: `/memes/${memeId}`,
			}),
			providesTags: () => [{
				type: 'meme'
			}]
		}),
		fetchCommentsMemeId: build.query<IComments[], number>({
			query: (id: number) => ({
				url: `/memes/${id}/comments`
			}),
			providesTags: () => [{
				type: 'meme'
			}]
		}),
		createComment: build.mutation<IComments, IComments>({
			query: comment => ({
				url: '/comments',
				method: 'POST',
				body: comment
			}),
			invalidatesTags: () => [{
				type: 'meme'
			}]
		}),
		deleteComment: build.mutation<IComments, IComments>({
			query: (comment) => ({
				url: `/comments/${comment.id}`,
				method: 'DELETE',
				body: comment
			}),
			invalidatesTags: () => [{
				type: 'meme'
			}]
		}),
		fetchAnswersMemeId: build.query<IAnswers[], number>({
			query: (id: number) => ({
				url: `/memes/${id}/answers`
			}),
			providesTags: () => [{
				type: 'meme'
			}]
		}),
		fetchCommentAnswers: build.query<IAnswers[], number>({
			query: (commentId: number) => ({
				url: `/comments/${commentId}/answers`,
			}),
			providesTags: (commentId) => [
				{ type: 'meme', commentId },
			],
		}),
		createAnswer: build.mutation<IAnswers, IAnswers>({
			query: answer => ({
				url: '/answers',
				method: 'POST',
				body: answer
			}),
			invalidatesTags: () => [{
				type: 'meme'
			}]
		}),
		deleteAnswer: build.mutation<IAnswers, IAnswers>({
			query: (answer) => ({
				url: `/answers/${answer.id}`,
				method: 'DELETE',
				body: answer
			}),
			invalidatesTags: () => [{
				type: 'meme'
			}]
		}),
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
				type: 'meme'
			}]
		}),
		fetchSubscriptions: build.query<IUsers[], string>({
			query: () => ({
				url: '/subscriptions'
			})
		}),
		likedMeme: build.mutation<IMemes, IMemes>({
			query: (meme: IMemes) => ({
				url: '/liked',
				method: 'POST',
				body: meme,
			}),
		}),
		unLikedMeme: build.mutation<IMemes, number | undefined>({
			query: (id: number) => ({
				url: `/liked/${id}`,
				method: 'DELETE'
			})
		}),
		fetchLiked: build.query<any, string>({
			query: () => ({
				url: '/liked'
			})
		}),
		fetchMyMemes: build.query<IMemes[], string>({
			query: () => ({
				url: `/memes?myMeme=true`
			})
		})
	}),
})
