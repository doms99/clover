import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Genre, Track } from "../api/types";

export type State = {
  genres: Genre[],
  currentGenre: number,
  tracks: {
    [key: string]: Track[]
  },
  currentTracks: Track[],
  modal: Track | undefined,
  error: string | undefined,
}

export const slice = createSlice({
  name: 'app',
  initialState: {
    genres: [],
    currentGenre: 0,
    tracks: {},
    currentTracks: [],
    modal: undefined,
    error: undefined
  } as State,
  reducers: {
    setGenres(state, action: PayloadAction<Genre[]>) {
      const { currentGenre, tracks } = state;

      state.genres = action.payload;
      state.currentTracks = tracks[action.payload[currentGenre].id];
    },
    setTracks(state, action: PayloadAction<{ genreId: number, tracks: Track[] }>) {
      const { genreId, tracks } = action.payload;
      state.tracks = {
        ...state.tracks,
        [genreId]: tracks
      };
    },
    setModal(state, action: PayloadAction<Track | undefined>) {
      state.modal = action.payload;
    },
    setCurrentGenre(state, action: PayloadAction<-1 | 1>) {
      const { currentGenre, genres, tracks } = state;

      const newCurr = (currentGenre + action.payload + genres.length) % genres.length;
      state.currentGenre = newCurr;
      state.currentTracks = tracks[genres[newCurr].id];
    },
    setError(state, action: PayloadAction<string | undefined>) {
      state.error = action.payload;
    },
  }
});
// Action creators are generated for each case reducer function
export const { setGenres, setTracks, setModal, setCurrentGenre, setError } = slice.actions;

export default slice.reducer;