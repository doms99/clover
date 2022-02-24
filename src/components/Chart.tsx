import { useCallback, useEffect, useMemo, useState } from "react";
import { Track as TrackType } from "../api/types";
import { useScreenMinHeight } from "../hooks";
import Arrow from "../icons/Arrow";
import { useDispatch, useSelector } from "../redux/hooks";
import { setCurrentGenre } from "../redux/slice";
import { fetchGenresAndCurrTracks, fetchTracks } from "../redux/thunks";
import Header from "./Header"
import Navigation from "./Navigation";
import Track from "./Track"

type Sort = "rank" | "asc" | "desc";

const defaultGenre = {
  name: "Best Genre",
  img: ""
}

const Chart: React.FC = () => {
  const [sort, setSort] = useState<Sort>("rank");
  const tracks = useSelector(state => state.app.tracks[state.app.genres[state.app.currentGenre]?.id]);
  const genre = useSelector(state => state.app.genres[state.app.currentGenre]);
  const loaded = useSelector(state => state.app.genres.length !== 0);
  const dispatch = useDispatch();

  let props = defaultGenre;
  if(genre) {
    props = {
      name: genre.name,
      img: genre.picture_big
    }
  }

  // Fetch genres if not loaded
  useEffect(() => {
    if(loaded) return;

    dispatch(fetchGenresAndCurrTracks());
  }, [dispatch, loaded]);

  // Fetch tracks if not loaded
  useEffect(() => {
    if(tracks || !loaded) return;

    dispatch(fetchTracks());
  }, [dispatch, tracks, loaded]);

  let sortedTracks = useMemo(() => {
    if(!tracks) return;

    switch(sort) {
      case "asc": {
        return [...tracks].sort((a, b) => a.duration - b.duration);
      }
      case "desc": {
        return [...tracks].sort((a, b) => b.duration - a.duration);
      }
      default: {
        return tracks;
      }
    }
  }, [tracks, sort]);

  const onSortChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value as Sort)
  }, []);

  const next = useCallback(() => {
    dispatch(setCurrentGenre(1));
  }, [dispatch]);

  const previous = useCallback(() => {
    dispatch(setCurrentGenre(-1));
  }, [dispatch]);

  return (
    <ChartView
      loading={!loaded}
      img={props.img}
      name={props.name}
      tracks={sortedTracks}

      onSortChange={onSortChange}
      previous={previous}
      next={next}
    />
  )
}

export default Chart;

export type ViewProps = {
  loading?: boolean,
  img: string,
  name: string,
  tracks?: TrackType[],

  onSortChange: React.ChangeEventHandler<HTMLSelectElement>,
  next: () => void,
  previous: () => void
}

export const ChartView: React.FC<ViewProps> = (props) => {
  const ref = useScreenMinHeight<HTMLDivElement>();
  const { loading, img, name, tracks, onSortChange, next, previous } = props;
  const length = tracks ? tracks.length : 10;

  return (
    <div ref={ref} className={`grid grid-layout-lite md:grid-layout-full ${loading && "loading"}`}>
      <Header
        img={img}
      >
        <h3 className="text-xl md:text-3xl mb-2 font-light">
          <span className="font-semibold">Top</span> {length}
        </h3>
        <h1 className="text-title-md lg:text-title-lg xl:text-title font-bold">
          {name}
        </h1>
        <div className="md:hidden absolute right-0 top-0 drop-shadow-sm">
          <button
            onClick={previous}
            className="inline-flex flex-center aspect-square
                      h-12 p-4 mr-4 btn-transparent rounded-full"
          >
            <Arrow className="stroke-white h-full m-auto" />
          </button>
          <button
            onClick={next}
            className="inline-flex flex-center aspect-square
                      h-12 p-4 btn-transparent rounded-full"
          >
            <Arrow className="stroke-white h-full m-auto rotate-180" />
          </button>
        </div>
      </Header>
      <Navigation>
        <div className="w-max m-auto ">
          <button
            onClick={previous}
            className="inline-flex flex-center aspect-square
                      h-12 p-4 mr-4 btn rounded-full"
          >
            <Arrow className="stroke-slate-300 h-full m-auto" />
          </button>
          <button
            onClick={next}
            className="inline-flex flex-center aspect-square
                      h-12 p-4 btn rounded-full"
          >
            <Arrow className="stroke-slate-300 h-full m-auto rotate-180" />
          </button>
        </div>
      </Navigation>
      <main className="grid-content w-full py-8 bg-slate-100">
        <div className="flex justify-between mb-6 mx-8 md:mx-16">
          <h3 className="text-xl font-medium">Tracks</h3>
          <select
            name="order"
            id="order"
            placeholder="Sort by"
            defaultValue={"rank"}
            onChange={onSortChange}
          >
            <option value="rank">Rank</option>
            <option value="asc">Shorter first</option>
            <option value="desc">Longer first</option>
          </select>
        </div>
        <section className={
            `grid-track
            lg:grid-rows-${Math.ceil(length/2)}
            2xl:grid-rows-${Math.ceil(length/3)}`
        }>
          {!tracks ? (
            Array.from(Array(10).keys()).map((i) => <Track key={'loader'+i}/>)
          ) : (
            tracks.map((track) => (
              <Track
                key={`${name}-${track.id}`}
                track={track}
              />
            ))
          )}
        </section>
      </main>
    </div>
  );
}