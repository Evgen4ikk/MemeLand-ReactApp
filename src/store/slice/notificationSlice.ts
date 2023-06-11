import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { INotification } from '../../types/INotification'

const NOTIVICATION_KEY = 'not_k'

interface NotificationState {
	notification: INotification[]
}

const initialState: NotificationState = {
	notification: JSON.parse(localStorage.getItem(NOTIVICATION_KEY) ?? '[]'),
}

const notificationSlice = createSlice({
	name: 'notification',
	initialState,
	reducers: {
		addNotification(state, action: PayloadAction<INotification>) {
			state.notification.push(action.payload)
			localStorage.setItem(NOTIVICATION_KEY, JSON.stringify(state.notification))
		},	
		removeNotification(state, action: PayloadAction<INotification>) {
			state.notification = state.notification.filter(f => f !== action.payload)
			localStorage.setItem(NOTIVICATION_KEY, JSON.stringify(state.notification))
		}
	},
})

export const notificationAction = notificationSlice.actions
export const notificationReducer = notificationSlice.reducer