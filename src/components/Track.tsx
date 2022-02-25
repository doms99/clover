import Arrow from "../icons/Arrow";
import { TrackApi as TrackType } from "../api/types";
import { useReorder } from "../hooks";
import { formatDuration } from "../utils";
import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";

export type Props = {
  track?: TrackType
}

const defaultProps = {
  title: "This is a filler title",
  rank: 0,
  artist: "Star Biggest",
  duration: 256,
  img: ""
}

const Track: React.FC<Props> = ({ track }) => {
  const history = useHistory();
  let props = defaultProps;
  if(track) {
    props = {
      artist: track.artist.name,
      duration: track.duration,
      rank: track.position,
      title: track.title,
      img: track.album.cover_small
    }
  }

  const expand = useCallback(() => {
    if(!track) return;
    console.log(`${history.location.pathname}/track/${track.id}`);


    history.push(`${history.location.pathname}/track/${track.id}`);
  }, [history, track]);

  return (
    <TrackView
      loading={!track}
      img={props.img}
      title={props.title}
      rank={props.rank}
      artist={props.artist}
      duration={props.duration}
      expand={expand}
    />
  )
}

export default Track;

export type ViewProps = {
  title: string,
  rank: number,
  artist: string,
  duration: number,
  img: string,
  loading?: boolean,
  expand: () => void
}

export const TrackView: React.FC<ViewProps> = ({ title, rank, artist, duration, img, expand, loading }) => {
  const ref = useReorder<HTMLDivElement>();
  const [time, dateTime] = formatDuration(duration);
  return (
    <div
      ref={loading ? undefined : ref}
      className="rounded-lg bg-white drop-shadow-md shadow-slate-900"
    >
      <article
        className={`grid grid-cols-[min-content_1fr_1fr_min-content] grid-rows-[2.5rem]
                  w-full h-16 p-3 ${loading && "loading"}`}
      >
        <div className="flex items-center h-full">
          <h6 className="ml-2 mr-4 font-semibold">
            {rank.toString().padStart(2, '0')}
          </h6>
          <div
            style={loading ? {} : {backgroundImage: `url(${img})`}}
            title="Album cover"
            className="aspect-square h-full rounded-md bg-central bg-slate-300"
          />
        </div>
        <div className="min-w-0 ml-4">
          <h1
          title={title}
          className="text-lg leading-5 font-semibold dot-string">
            {title}
          </h1>
          <address className="text-sm dot-string">
            {artist}
          </address>
        </div>
        <time dateTime={dateTime} className="m-auto">{time}</time>
        {expand && (
          <button
            className="aspect-square flex flex-center h-full p-2 btn
                       rounded-full -rotate-45"
            onClick={expand}
          >
            <Arrow className="stroke-slate-300 inline-block w-1/4 mr-2" />
            <Arrow className="stroke-slate-300 inline-block w-1/4 rotate-180" />
          </button>
        )}
      </article>
    </div>
  );
}