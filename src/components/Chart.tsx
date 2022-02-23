import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "../redux/hooks";
import { setTracks } from "../redux/slice";
import Arrow from "./Arrow";
import Header from "./Header";
import Logo from "./Logo";
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
  const tracks = useSelector(state => state.app.tracks)[id];
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if(tracks) return;

    fetch(`/chart/${id}/tracks`)
    .then(res => res.json())
    .then(res => {
      console.log(res);

      dispatch(setTracks({genreId: id, tracks: res.data}));
    });
  }, [dispatch, id, tracks]);

  useLayoutEffect(() => {
    const controller = new AbortController();

    ref.current!.style.minHeight = `${(window.innerHeight-1)}px`;

    window.addEventListener("resize", () => {
      ref.current!.style.minHeight = `${(window.innerHeight-1)}px`
    }, { signal: controller.signal });

    return () => controller.abort();
  });

  let sortedTracks = (() => {
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
  })()

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setSort(e.target.value as Sort)
  }

  return (
    <div ref={ref} className="grid grid-layout-lite md:grid-layout-full">
      <Header
        img={img}
        name={name}
      />
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
                             lg:grid-rows-5 2xl:grid-rows-4 lg:grid-flow-col
                             gap-2 md:gap-4 mx-1 md:mx-16`
        }>
          {!sortedTracks ? (
            Array.from(Array(10)).map((i) => <Track key={i}/>)
          ) : (
            sortedTracks.map(track => (
              <Track
                key={track.position}
                img={track.album.cover_small}
                artist={track.artist.name}
                duration={track.duration}
                title={track.title}
                rank={track.position}
              />
            ))
          )}
        </section>
      </main>
    </div>
  )
}

export default Chart