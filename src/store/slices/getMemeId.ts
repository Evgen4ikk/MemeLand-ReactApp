import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const MEME_ID_KEY = 'mik'

interface MemeIdState {
	memeId: any
}

const initialState: MemeIdState = {
	memeId: JSON.parse(localStorage.getItem(MEME_ID_KEY) ?? '0'),
	
}

export const memeIdSlice = createSlice({
	name: 'id',
	initialState,
	reducers: {
		getMemeId(state, action: PayloadAction<number>) {
			state.memeId = action.payload
			localStorage.setItem(MEME_ID_KEY, JSON.stringify(state.memeId))
		},
	},
})

export const memeIdAction = memeIdSlice.actions
export const memeIdReducer = memeIdSlice.reducer