import { useCallback, useRef, useState } from "react";
import { formatDuration, formatOrdinal } from "../utils";
import Cancel from "../icons/Cancel";
import Pause from "../icons/Pause";
import Play from "../icons/Play";
import Tag from "./Tag";
import { useLoad } from "../hooks";
import { useSelector } from "../redux/hooks";
import { useDispatch } from "react-redux";
import { setModal } from "../redux/slice";

const TrackDetails: React.FC = () => {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>();
  const track = useSelector(state => state.app.modal);
  const genre = useSelector(state => state.app.genres[state.app.currentGenre]?.name);
  const dispatch = useDispatch();

  const playPause = useCallback(() => {
    if(!track || !track.preview) return;

    if(!audioRef.current) {
      const audio = new Audio(track.preview);
      audio.addEventListener("play", () => setPlaying(true));
      audio.addEventListener("pause", () => setPlaying(false));
      audio.addEventListener("ended", () => {
        setPlaying(false);
        audio.currentTime = 0;
      });

      audioRef.current = audio;
    }

    if(audioRef.current.paused) audioRef.current.play();
    else audioRef.current.pause();
  }, [track]);

  const close = useCallback(() => {
    if(audioRef.current && !audioRef.current.paused) audioRef.current.pause();
    dispatch(setModal(undefined));
  }, [dispatch]);

  return (
    !track ? null :
    <TrackDetailsView
      title={track.title}
      rank={track.position}
      genre={genre}
      artist={track.artist.name}
      duration={track.duration}
      img={track.album.cover_big}
      preview={track.preview}
      playing={playing}

      close={close}
      playPause={playPause}
    />
  )
}

export default TrackDetails;

export type ViewProps = {
  title: string,
  rank: number,
  genre?: string,
  artist: string,
  duration: number,
  img: string
  preview?: string,
  playing?: boolean,

  close: () => void,
  playPause: () => void
}

export const TrackDetailsView: React.FC<ViewProps> = (props) => {
  const { title, rank, genre, playing, artist,
          duration, img, preview, close, playPause } = props;
  const [time, dateTime] = formatDuration(duration);
  const [sizeRef, opacityRef] = useLoad<HTMLElement, HTMLDivElement>([
    {
      from: "scale-0",
      to: "scale-100"
    },
    {
      from: "before:opacity-0",
      to: "before:opacity-60"
    }
  ]);

  return (
    <div ref={opacityRef} className="backdrop transition-opacity">
      <section ref={sizeRef} className="modal">
        <button
          className="absolute top-0 right-0 h-12 p-4 m-2
                     btn-transparent md:btn rounded-full z-50"
          onClick={close}
        >
          <Cancel className="fill-slate-50 sm:fill-slate-300 h-full"/>
        </button>
        <div
          className="relative grid-side aspect-square w-full sm:h-72
            rounded-xl bg-central bg-slate-600 drop-shadow-sm overflow-hidden"
        >
          <img src={img} alt="Album cover" className="h-full" />
          {preview && (
            <button
              className="absolute central p-2 hover:p-1 aspect-square h-1/3
                         drop-shadow-lg transition-all"
              onClick={playPause}
            >
              {playing ? (
                <Pause className="fill-slate-50 h-full m-auto"/>
              ) : (
                <Play className="fill-slate-50 h-full m-auto"/>
              )}
            </button>
          )}
        </div>
        <Tag label="Title" >
          <h1
            title={title}
            className="text-2xl md:text-title-md font-bold text-slate-600">
              {title}
          </h1>
        </Tag>
        <Tag label="Rank" >
          <p>
            <span className="text-2xl md:text-title-md font-semibold text-slate-600">
              {formatOrdinal(rank)}
            </span>
            {genre && (
              <span className="text-xl md:text-3xl font-light text-slate-400">
                {` in ${genre}`}
              </span>
            )}
          </p>
        </Tag>

        <div className="grid grid-cols-2 ">
          <Tag label="Artist" >
            <address className="text-lg text-slate-600">
              {artist}
            </address>
          </Tag>
          <Tag label="Duration" >
            <p className="text-lg text-slate-600 dot-string">
              <time dateTime={dateTime} className="m-auto">{time}</time>
            </p>
          </Tag>
        </div>
      </section>
    </div>
  );
}