import { Action } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import { setError, setGenres, setTracks } from "./slice"
import { RootState } from "./store";

const base = "https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart";

export function fetchGenres() {
  const fetchGenresThunk: ThunkAction<void, RootState, void, Action> = (dispatch) => {

    fetch(`${base}/genre`)
    .then(res => {
      if(res.status !== 200) {
        throw new Error(`Error on /genre`);
      }
      return res.json();
    })
    .then(res => {
      if(!res || !res.data) {
        throw new Error(res);
      }

      dispatch(setGenres(res.data));
    })
    .catch(err => {
      console.error(err);

      dispatch(setError("Error while fetching genres"));
    });
  };

  return fetchGenresThunk;
}

export function fetchTracks(id: number) {
  const fetchTracksThunk: ThunkAction<void, RootState, void, Action> = (dispatch) => {
    fetch(`${base}/chart/${id}/tracks`)
    .then(res => {
      if(res.status !== 200) {
        throw new Error(`Error on /chart/${id}/tracks`);
      }
      return res.json();
    })
    .then(res => {
      if(!res || !res.data) {
        throw new Error(res);
      }

      dispatch(setTracks({genreId: id, tracks: res.data}));
    })
    .catch(err => {
      console.error(err);

      dispatch(setError("Error while fetching tracks"));
    });
  };

  return fetchTracksThunk;
}