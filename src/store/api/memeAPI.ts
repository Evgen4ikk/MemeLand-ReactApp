import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query'
import { createApi } from '@reduxjs/toolkit/query/react'
import { IAnswers } from '../../types/IAnswer'
import { IComments } from '../../types/IComments'
import { IMemes, IMemesHistory } from '../../types/IMemes'

export const memeAPI = createApi({
	reducerPath: 'memeAPI',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
	tagTypes: ['meme'],
	refetchOnFocus: true,
	endpoints: build => ({
		fetchAllMemes: build.query<IMemes[], string>({
			query: () => ({
				url: '/memes',
			}),
			providesTags: () => [
				{
					type: 'meme',
				},
			],
		}),
		createMeme: build.mutation<IMemes, IMemes>({
			query: meme => ({
				url: '/memes',
				method: 'POST',
				body: meme,
			}),
			invalidatesTags: () => [
				{
					type: 'meme',
				},
			],
		}),
		deleteMeme: build.mutation({
			query: meme => ({
				url: `/memes/${meme.id}`,
				method: 'DELETE',
			}),
			invalidatesTags: () => [
				{
					type: 'meme',
				},
			],
		}),
		updateMeme: build.mutation({
			query: meme => ({
				url: `/memes/${meme.id}`,
				method: 'PUT',
				body: meme,
			}),
			invalidatesTags: () => [
				{
					type: 'meme',
				},
			],
		}),
		searchMemes: build.query<IMemes[], string>({
			query: (search: string) => ({
				url: '/memes',
				params: {
					q: search,
				},
			}),
		}),
		fetchMemeId: build.query<IMemes, number>({
			query: (memeId: number) => ({
				url: `/memes/${memeId}`,
			}),
			providesTags: () => [
				{
					type: 'meme',
				},
			],
		}),
		fetchCommentsMemeId: build.query<IComments[], number>({
			query: (id: number) => ({
				url: `/memes/${id}/comments`,
			}),
			providesTags: () => [
				{
					type: 'meme',
				},
			],
		}),
		createComment: build.mutation<IComments, IComments>({
			query: comment => ({
				url: '/comments',
				method: 'POST',
				body: comment,
			}),
			invalidatesTags: () => [
				{
					type: 'meme',
				},
			],
		}),
		deleteComment: build.mutation<IComments, IComments>({
			query: comment => ({
				url: `/comments/${comment.id}`,
				method: 'DELETE',
				body: comment,
			}),
			invalidatesTags: () => [
				{
					type: 'meme',
				},
			],
		}),
		fetchAnswersMemeId: build.query<IAnswers[], number>({
			query: (id: number) => ({
				url: `/memes/${id}/answers`,
			}),
			providesTags: () => [
				{
					type: 'meme',
				},
			],
		}),
		fetchCommentAnswers: build.query<IAnswers[], number>({
			query: (commentId: number) => ({
				url: `/comments/${commentId}/answers`,
			}),
			providesTags: commentId => [{ type: 'meme', commentId }],
		}),
		createAnswer: build.mutation<IAnswers, IAnswers>({
			query: answer => ({
				url: '/answers',
				method: 'POST',
				body: answer,
			}),
			invalidatesTags: () => [
				{
					type: 'meme',
				},
			],
		}),
		deleteAnswer: build.mutation<IAnswers, IAnswers>({
			query: answer => ({
				url: `/answers/${answer.id}`,
				method: 'DELETE',
				body: answer,
			}),
			invalidatesTags: () => [
				{
					type: 'meme',
				},
			],
		}),
		likedMeme: build.mutation<IMemes, IMemes>({
			query: (meme: IMemes) => ({
				url: `/liked`,
				method: 'POST',
				body: meme,
			}),
			invalidatesTags: () => [
				{
					type: 'meme',
				},
			],
		}),
		unLikedMeme: build.mutation<IMemes, number | undefined>({
			query: (id: number) => ({
				url: `/liked/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: () => [
				{
					type: 'meme',
				},
			],
		}),
		fetchLiked: build.query<any, string>({
			query: () => ({
				url: '/liked',
			}),
			providesTags: () => [
				{
					type: 'meme',
				},
			],
		}),
		fetchMyMemes: build.query<IMemes[], string>({
			query: () => ({
				url: `/memes?myMeme=true`,
			}),
		}),
		fetchAllHistory: build.query<IMemesHistory[], any>({
			query: () => ({
				url: '/history',
			}),
			providesTags: () => [
				{
					type: 'meme',
				},
			],
		}),
		AddToHistory: build.mutation<IMemesHistory, IMemesHistory>({
			query: meme => ({
				url: '/history',
				method: 'POST',
				body: meme,
			}),
		}),
		RemoveHistoryMeme: build.mutation<IMemesHistory, IMemesHistory>({
			query: meme => ({
				url: `/history/${meme.id}`,
				method: 'DELETE',
				body: meme,
			}),
			invalidatesTags: () => [
				{
					type: 'meme',
				},
			],
		}),
		clearAllHistory: build.mutation<void, void>({
      query: () => ({
        url: '/history',
        method: 'DELETE',
      }),
			invalidatesTags: () => [
				{
					type: 'meme',
				},
			],
    }),
	}),
})
