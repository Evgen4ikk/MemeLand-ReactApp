import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const FAV_KEY = 'fk'

interface MemesState{
	favourites: string []
}

const initialState: MemesState = {
	favourites: JSON.parse(localStorage.getItem(FAV_KEY) ?? '[]'),
}

export const memesSlice = createSlice({
	name: "meme",
	initialState,
	reducers: {
		addFavourite(state, action: PayloadAction<string>) {
			state.favourites.push(action.payload)
			localStorage.setItem(FAV_KEY, JSON.stringify(state.favourites))
		},	
		removeFavourite(state, action: PayloadAction<string>) {
			state.favourites = state.favourites.filter(f => f !== action.payload)
			localStorage.setItem(FAV_KEY, JSON.stringify(state.favourites))
		}
	}
})

export const memesActions = memesSlice.actions
export const memesReducer = memesSlice.reducer