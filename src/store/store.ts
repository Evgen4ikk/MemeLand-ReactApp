import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { api } from './api/api'
import { memesReducer } from './slice/memes'
import { memeIdReducer } from './slice/getMemeId'
import { userIdReducer } from './slice/getUserId'

const reducers = combineReducers({
	[api.reducerPath]: api.reducer,
	favMemes: memesReducer,
	getMemeId: memeIdReducer,
	getUserId: userIdReducer
})

export const store = configureStore
({
	reducer: reducers,
	middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>