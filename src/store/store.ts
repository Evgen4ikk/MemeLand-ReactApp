import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { api } from './api/api'
import { memeIdReducer } from './slice/getMemeId'
import { userIdReducer } from './slice/getUserId'


const reducers: any = combineReducers({
	[api.reducerPath]: api.reducer,
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
export type AppDispatch = typeof store.dispatch