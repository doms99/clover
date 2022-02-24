import { useEffect, useMemo, useRef, useState } from "react";
import { Track as TrackType } from "../api/types";
import { useScreenMinHeight } from "../hooks";
import { useDispatch, useSelector } from "../redux/hooks";
import { setTracks } from "../redux/slice";
import Header from "./Header"
import Navigation from "./Navigation";
import Track from "./Track"
import TrackDetails from "./TrackDetails";

export type Props = {
  name: string,
  img: string,
  id: number,

  next: () => void,
  previous: () => void
}

type Sort = "rank" | "asc" | "desc";

const Chart: React.FC<Props> = ({ img, name, id, next, previous }) => {
  const [sort, setSort] = useState<Sort>("rank");
  const [modal, setModal] = useState<TrackType>();
  const tracks = useSelector(state => state.app.tracks)[id];
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  useScreenMinHeight(ref);

  useEffect(() => {
    if(tracks) return;

    fetch(`/chart/${id}/tracks`)
    .then(res => res.json())
    .then(res => {
      console.log(res);

      dispatch(setTracks({genreId: id, tracks: res.data}));
    });
  }, [dispatch, id, tracks]);



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

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setSort(e.target.value as Sort)
  }

  const length = tracks ? tracks.length : 10;

  return (
    <>
      <div ref={ref} className="grid grid-layout-lite md:grid-layout-full">
        <Header
          img={img}
        >
          <h3 className="text-xl md:text-3xl mb-2 font-light">
            <span className="font-semibold">Top</span> {length}
          </h3>
          <h1 className="text-title-md lg:text-title-lg xl:text-title font-bold">{name}</h1>
        </Header>
        <Navigation
          next={next}
          previous={previous}
        />
        <main className="grid-content w-full py-8 bg-slate-100">
          <div className="flex justify-between mb-6 mx-8 md:mx-16">
            <h3 className="text-xl font-medium">Tracks</h3>
            <select
              name="order"
              id="order"
              placeholder="Sort by"
              defaultValue={"rank"}
              onChange={handleChange}
            >
              <option value="rank">Rank</option>
              <option value="asc">Shorter first</option>
              <option value="desc">Longer first</option>
            </select>
          </div>
          <section className={`relative grid
                               grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3
                               lg:grid-rows-${Math.ceil(length/2)}
                               2xl:grid-rows-${Math.ceil(length/3)}
                               lg:grid-flow-col
                               gap-2 md:gap-4 mx-1 md:mx-16`
          }>
            {!sortedTracks ? (
              Array.from(Array(10).keys()).map((i) => <Track key={'loader'+i}/>)
            ) : (
              sortedTracks.map((track, index) => (
                <Track
                  key={track.id}
                  img={track.album.cover_small}
                  artist={track.artist.name}
                  duration={track.duration}
                  title={track.title}
                  rank={track.position}
                  expand={() => setModal(track)}
                />
              ))
            )}
          </section>
        </main>
      </div>
      {modal && <TrackDetails
        img={modal.album.cover_big}
        artist={modal.artist.name}
        duration={modal.duration}
        title={modal.title}
        rank={modal.position}
        genre={name}
        album={modal.album.title}
        preview={modal.preview}
        close={() => setModal(undefined)}
      />}
    </>
  )
}

export default Chart