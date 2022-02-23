import Arrow from "./Arrow";

function formatDuration(secunds: number) {
  let res: string = (secunds % 60).toString().padStart(2, '0');
  let rem: number = Math.floor(secunds/60);
  while(rem > 0) {
    res = `${rem % 60}:${res}`;
    rem = Math.floor(rem/60);
  }

  return res;
}

export type Props = {
  title: string,
  rank: number,
  artist: string,
  duration: number,
  img: string
}

const Track: React.FC<Props> = ({ title, rank, artist, duration, img }) => {
  return (
    <article className="grid grid-cols-[min-content_1fr_1fr_min-content] grid-rows-[2.5rem] w-full h-16 p-3 rounded-lg bg-white drop-shadow-md shadow-slate-900">
      <div className="flex items-center h-full">
        <h6 className="ml-2 mr-4 font-semibold">{rank.toString().padStart(2, '0')}</h6>
        <div
          style={{backgroundImage: `url(${img})`}}
          title="Album cover"
          className="aspect-square h-full rounded-md bg-cover bg-center"
        />
      </div>
      <div className="min-w-0 ml-4">
        <h1 title={title} className="text-lg leading-5 font-semibold whitespace-nowrap text-ellipsis overflow-hidden">{title}</h1>
        <address className="text-sm text-stone-400 whitespace-nowrap text-ellipsis overflow-hidden">{artist}</address>
      </div>
      <time className="m-auto">{formatDuration(duration)}</time>
      <button className="aspect-square h-full p-2 transition-all
                       hover:bg-slate-100 active:bg-slate-200
                         rounded-full -rotate-45">
        <Arrow className="stroke-slate-300 inline-block w-1/4 mr-2" />
        <Arrow className="stroke-slate-300 inline-block w-1/4 rotate-180" />
      </button>
    </article>
  )
}

export default Track