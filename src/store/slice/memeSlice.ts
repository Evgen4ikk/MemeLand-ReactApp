import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMemes } from '../../types/IMemes'
import { memeAPI } from '../api/memeAPI'


interface MemesState {
  memes: IMemes[];
}

const initialState: MemesState = {
  memes: [],
};


const memesSlice = createSlice({
  name: 'memes',
  initialState,
  reducers: {
    incrementLikes: (state, action: PayloadAction<number>) => {
      const meme = state.memes.find((meme) => meme.id === action.payload);
      if (meme) {
        meme.likes++;
      }
    },
    decrementLikes: (state, action: PayloadAction<number>) => {
      const meme = state.memes.find((meme) => meme.id === action.payload);
      if (meme) {
        meme.likes--;
      }
    },
  },
});

export const memeAction = memesSlice.actions
export const memeReducer = memesSlice.reducer