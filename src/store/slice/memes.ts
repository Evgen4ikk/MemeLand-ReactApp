import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const FAV_KEY = 'fk'

interface MemesState{
	liked: string []
}

const initialState: MemesState = {
	liked: JSON.parse(localStorage.getItem(FAV_KEY) ?? '[]'),
}

export const memesSlice = createSlice({
	name: "meme",
	initialState,
	reducers: {
		addLiked(state, action: PayloadAction<string>) {
			state.liked.push(action.payload)
			localStorage.setItem(FAV_KEY, JSON.stringify(state.liked))
		},	
		removeLiked(state, action: PayloadAction<string>) {
			state.liked = state.liked.filter(f => f !== action.payload)
			localStorage.setItem(FAV_KEY, JSON.stringify(state.liked))
		}
	}
})

export const memesActions = memesSlice.actions
export const memesReducer = memesSlice.reducer