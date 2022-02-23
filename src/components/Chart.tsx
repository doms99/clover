import { useLayoutEffect, useMemo, useRef, useState } from "react"
import { Track as TrackType } from "../api/types";
import Loader from "./Loader";
import Track from "./Track"

export type Props = {
  name: string,
  img: string,
  tracks?: TrackType[]
}

type Sort = "rank" | "asc" | "desc";

const Chart: React.FC<Props> = ({ img, name, tracks }) => {
  const [sort, setSort] = useState<Sort>("rank")
  const ref = useRef<HTMLDivElement>(null)

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
      <header
        className="relative grid-header h-full overflow-hidden z-20"
      >
        <div
          style={{backgroundImage: `url(${img})`}}
          className="absolute top-[-5%] left-[-5%] h-[110%] w-[110%] bg-none bg-bottom bg-cover blur-sm"
        />
        <div className="absolute bottom-0 left-0 w-full mx-8 md:mx-16 mb-8 text-white">
          <h3 className="text-xl md:text-3xl mb-2 font-light"><span className="font-semibold">Top</span> 10</h3>
          <h1 className="text-title-md lg:text-title-lg xl:text-title font-bold">{name}</h1>
        </div>
      </header>
      <aside className="grid-sidebar w-full z-0 bg-white shadow-slate-900 drop-shadow-lg"></aside>
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
        <section className={`grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 ${tracks && "lg:grid-rows-5 xl:grid-rows-4"} lg:grid-flow-col gap-1 md:gap-4 mx-1 md:mx-16`}>
          {!sortedTracks ? (
            <div className="w-full lg:col-span-2 xl: col-span-3"><Loader /></div>
          ) : (
            sortedTracks.map(track => (
              <Track
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