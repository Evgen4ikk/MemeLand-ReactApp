import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const USER_ID_KEY = 'uik'

interface UserIdState {
	userId: number
}

const initialState: UserIdState = {
	userId: JSON.parse(localStorage.getItem(USER_ID_KEY) ?? '0')
}

export const userIdSlice = createSlice({
	name: 'id',
	initialState,
	reducers: {
		getUserId(state, action : PayloadAction<number>) {
			state.userId = action.payload
			localStorage.setItem(USER_ID_KEY, JSON.stringify(state.userId))
		}
	}
})

export const userIdAction = userIdSlice.actions
export const userIdReducer = userIdSlice.reducer