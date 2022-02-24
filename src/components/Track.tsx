import { useLayoutEffect, useRef } from "react";
import { animated, useSpring } from "@react-spring/web";
import Arrow from "../icons/Arrow";
import { useReorder } from "../hooks";
import { formatDuration } from "../utils";

export type Props = {
  title: string,
  rank: number,
  artist: string,
  duration: number,
  img: string,
  expand?: () => void
}

const defaultProps: Props = {
  title: "This is a filler title",
  rank: 99,
  artist: "Star Biggest",
  duration: 256,
  img: ""
}

const Track: React.FC<Props | {}> = (props) => {
  const loading = Object.keys(props).length === 0;
  const { title, rank, artist, duration, img, expand } = loading ? defaultProps : props as Props;

  const [ref, animProps] = useReorder<HTMLDivElement>();

  const [time, dateTime] = formatDuration(duration);
  return (
    <animated.div style={animProps} ref={ref} className="rounded-lg bg-white drop-shadow-md shadow-slate-900">
      <article
        className={`grid grid-cols-[min-content_1fr_1fr_min-content] grid-rows-[2.5rem]
                  w-full h-16 p-3 ${loading && "font-filler text-slate-200 animate-pulse"}`}
      >
        <div className="flex items-center h-full">
          <h6 className="ml-2 mr-4 font-semibold">
            {rank.toString().padStart(2, '0')}
          </h6>
          <div
            style={{backgroundImage: `url(${img})`}}
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
    </animated.div>
  )
}

export default Track