import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const MEME_ID_KEY = 'ik'

interface MemeIdState {
	memeId: number;
}

const initialState: MemeIdState = {
	memeId: JSON.parse(localStorage.getItem(MEME_ID_KEY) ?? '0')
}

export const memeIdSlice = createSlice({
	name: 'id',
	initialState,
	reducers: {
		getMemeId(state, action : PayloadAction<any>) {
			state.memeId =action.payload
			localStorage.setItem(MEME_ID_KEY, JSON.stringify(state.memeId))
		}
	}
})

export const memeIdAction = memeIdSlice.actions
export const memeIdReducer = memeIdSlice.reducer