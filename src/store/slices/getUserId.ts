import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const USER_ID_KEY = 'uik'

interface MemeIdState {
	userId: any
}

const initialState: MemeIdState = {
	userId: JSON.parse(localStorage.getItem(USER_ID_KEY) ?? '0'),
}

export const memeIdSlice = createSlice({
	name: 'id',
	initialState,
	reducers: {
		getUserId(state, action: PayloadAction<number | undefined >) {
			state.userId = action.payload
			localStorage.setItem(USER_ID_KEY, JSON.stringify(state.userId))
		},
	},
})

export const userIdAction = memeIdSlice.actions
export const userIdReducer = memeIdSlice.reducer