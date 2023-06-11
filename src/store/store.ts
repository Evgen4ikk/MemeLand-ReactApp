import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { memeAPI } from './api/memeAPI'
import { userAPI } from './api/userAPI'
import { notificationReducer } from './slice/notificationSlice'

const reducers: any = combineReducers({
	[memeAPI.reducerPath]: memeAPI.reducer,
	[userAPI.reducerPath]: userAPI.reducer,
	notification: notificationReducer,
})

export const store = configureStore({
	reducer: reducers,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(memeAPI.middleware, userAPI.middleware),
})

export type RootState = ReturnType<typeof store.getState>
