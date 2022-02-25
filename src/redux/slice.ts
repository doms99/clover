import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GenreApi, TrackApi } from "../api/types";

export type Chart = {
  data: GenreApi,
  loaded: boolean,
  tracks: {
    [key: number]: TrackApi
  }
}

export type State = {
  loaded: boolean,
  charts: {
    [key: number]: Chart
  },
  error: string | undefined
}

const initialState: State = {
  loaded: false,
  charts: {},
  error: undefined
};

export const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setGenres(state, action: PayloadAction<GenreApi[]>) {
      const res: typeof initialState.charts = {};

      for(let genre of action.payload) {
        const gObj = {
          data: genre,
          loaded: false,
          tracks: {}
        };

        res[genre.id] = gObj
      }

      state.charts = res;
      state.loaded = true;
    },
    setTracks(state, action: PayloadAction<{ genreId: number, tracks: TrackApi[] }>) {
      const { genreId, tracks } = action.payload;

      state.charts[genreId].loaded = true;
      for(let track of tracks) {
        state.charts[genreId].tracks[track.id] = track;
      }
    },
    setError(state, action: PayloadAction<string | undefined>) {
      state.error = action.payload;
    },
  }
});
// Action creators are generated for each case reducer function
export const { setGenres, setTracks, setError } = slice.actions;

export default slice.reducer;