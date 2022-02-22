import Arrow from "./Arrow"

export type Props = {
  img: string,
  rank: number
}

const Track: React.FC<Props> = ({ img, rank }) => {
  return (
    <article className="flex items-center justify-between w-full h-16 p-3 rounded-lg bg-white drop-shadow-md shadow-slate-900">
      <div
        style={{backgroundImage: `url(${img})`}}
        title="Album cover"
        className="aspect-square h-full rounded-md bg-cover bg-center"
      />
      <span className="font-semibold">{rank.toString().padStart(2, '0')}</span>
      <h1 title={'test'} className="text-lg font-semibold whitespace-nowrap text-ellipsis overflow-hidden">test</h1>
      <address className="text-sm text-stone-400">test</address>
      <time>2:56</time>
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