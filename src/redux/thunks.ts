import { Action } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import { setError, setGenres, setTracks } from "./slice"
import { RootState } from "./store";

export function fetchGenresAndCurrTracks() {
  const fetchGenresThunk: ThunkAction<void, RootState, void, Action> = (dispatch, getState) => {
    const { currentGenre } = getState().app;
    let id: number;

    fetch("/genre")
    .then(res => res.json())
    .then(res => {
      dispatch(setGenres(res.data));

      id = res.data[currentGenre].id;
      return fetch(`/chart/${id}/tracks`)
    })
    .then(res => res.json())
    .then(res => {
      console.log(res);

      dispatch(setTracks({genreId: id, tracks: res.data}));
    })
    .catch(err => {
      console.error(err);

      dispatch(setError("Error while fetching genres"));
    });
  };

  return fetchGenresThunk;
}

export function fetchTracks() {
  const fetchTracksThunk: ThunkAction<void, RootState, void, Action> = (dispatch, getState) => {
    const { currentGenre, genres } = getState().app;
    const id = genres[currentGenre].id;

    fetch(`/chart/${id}/tracks`)
    .then(res => res.json())
    .then(res => {
      console.log(res);

      dispatch(setTracks({genreId: id, tracks: res.data}));
    })
    .catch(err => {
      console.error(err);

      dispatch(setError("Error while fetching tracks"));
    });
  };

  return fetchTracksThunk;
}