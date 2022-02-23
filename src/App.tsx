import { useEffect, useState } from "react";
import Chart from "./components/Chart";
import { useSelector, useDispatch } from "./redux/hooks";
import { setGenres } from "./redux/slice";

function App() {
  const [currGenre, setCurrGenre] = useState(0);
  const genres = useSelector(state => state.app.genres);
  const dispatch = useDispatch();

  useEffect(() => {
    if(genres.length !== 0) return;

    fetch("/genre")
    .then(res => res.json())
    .then(res => {
      dispatch(setGenres(res.data));
    })
  }, []);

  return genres.length === 0 ? (
    null
  ) : (
    <Chart
      previous={() => setCurrGenre(curr => (curr-1 + genres.length) % genres.length)}
      next={() => setCurrGenre(curr => (curr+1 + genres.length) % genres.length)}
      img={genres[currGenre].picture_big}
      name={genres[currGenre].name}
      id={genres[currGenre].id}
    />
  );
}

export default App;
