
import { iMemesData } from '../../types/IMemes'
import { api } from './api'

export const memeApi = api.injectEndpoints({
	endpoints: builder => ({
		createMeme: builder.mutation<null, iMemesData>({
			query: (meme) => ({
				body: meme,
				url: '/',
				method: 'POST',
			}),
			invalidatesTags: () => [{
				type: 'Memes',
			}]
		}),
	}),
	
})

export const { useCreateMemeMutation } = memeApi