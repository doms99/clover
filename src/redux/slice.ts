import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Genre, Track } from "../api/types";

export type State = {
  genres: Genre[],
  tracks: {
    [key: string]: Track[]
  }
}

export const slice = createSlice({
  name: 'app',
  initialState: {
    genres: [],
    tracks: {}
  } as State,
  reducers: {
    setGenres(state, action: PayloadAction<Genre[]>) {
      state.genres = action.payload;
    },
    setTracks(state, action: PayloadAction<{ genreId: number, tracks: Track[] }>) {
      const { genreId, tracks } = action.payload;
      state.tracks = {
        ...state.tracks,
        [genreId]: tracks
      };
    }
  }
});
// Action creators are generated for each case reducer function
export const { setGenres, setTracks } = slice.actions;

export default slice.reducer;