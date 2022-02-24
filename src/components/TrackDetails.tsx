import { useRef, useState } from "react";
import { formatDuration, formatOrdinal } from "../utils";
import Cancel from "../icons/Cancel";
import Pause from "../icons/Pause";
import Play from "../icons/Play";
import Tag from "./Tag";

export type Props = {
  title: string,
  rank: number,
  artist: string,
  duration: number,
  img: string
  album: string,
  preview?: string,
  close: () => void
}

const TrackDetails: React.FC<Props> = ({ title, rank, artist, duration, img, album, preview, close }) => {
  const [time, dateTime] = formatDuration(duration);
  const [playing, setPlaying] = useState(false);
  const ref = useRef<HTMLAudioElement>();

  function handlePlay() {
    if(!preview) return;

    if(!ref.current) {
      const audio = new Audio(preview);
      audio.addEventListener("play", () => setPlaying(true));
      audio.addEventListener("pause", () => setPlaying(false));
      audio.addEventListener("ended", () => {
        setPlaying(false);
        audio.currentTime = 0;
      });

      ref.current = audio;
    }

    if(ref.current.paused) ref.current.play();
    else ref.current.pause();
  }

  function handleClose() {
    if(ref.current && !ref.current.paused) ref.current.pause();
    close();
  }

  return (
    <div className="backdrop">
      <section className="fixed central grid grid-modal gap-4
                          w-max p-4 pr-16
                          font-medium text-left
                          bg-white rounded-3xl text-xl
                          shadow-slate-800 drop-shadow-md"
      >
        <button
          className="absolute top-0 right-0 h-12 p-4 m-2 btn rounded-full z-50"
          onClick={handleClose}
        >
          <Cancel className="fill-slate-300 h-full"/>
        </button>
        <div
          className="relative grid-side aspect-square h-64 rounded-xl bg-central bg-slate-600 overflow-hidden"
        >
          <img src={img} alt="Album cover" className="absolute central" />
          {preview && (
            <button
              className="absolute central p-2 hover:p-1 aspect-square h-1/3 transition-all"
              onClick={handlePlay}
            >
              {playing ? (
                <Pause className="fill-slate-50 h-full"/>
              ) : (
                <Play className="fill-slate-50 h-full"/>
              )}
            </button>
          )}
        </div>
        <Tag label="Title" >
          <h1
            title={title}
            className="text-title-md font-bold text-slate-600 dot-string">
              {title}
          </h1>
        </Tag>
        <Tag label="Rank" >
          <p className="text-title-md font-semibold text-slate-600">{formatOrdinal(rank)}</p>
        </Tag>

        <div className="flex justify-between">
          <Tag label="Artist" >
            <address className="text-lg text-slate-600 dot-string">
              {artist}
            </address>
          </Tag>
          <Tag label="Duration" >
            <p className="text-lg text-slate-600 dot-string">
              <time dateTime={dateTime} className="m-auto">{time}</time>
            </p>
          </Tag>
          <Tag label="Album" >
            <p className="text-lg text-slate-600 dot-string">
              {album}
            </p>
          </Tag>
        </div>
      </section>
    </div>
  )
}

export default TrackDetails