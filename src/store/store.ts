import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { memeAPI } from './api/memeAPI'
import { userAPI } from './api/userAPI'
import { memeReducer } from './slice/memeSlice'

const reducers: any = combineReducers({
	[memeAPI.reducerPath]: memeAPI.reducer,
	[userAPI.reducerPath]: userAPI.reducer,
	memes: memeReducer,
})

export const store = configureStore({
	reducer: reducers,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(memeAPI.middleware, userAPI.middleware),
})

export type RootState = ReturnType<typeof store.getState>
