import React from 'react'
import Arrow from './Arrow'
import Logo from './Logo'

export type Props = {
  next: () => void,
  previous: () => void
}

const Navigation: React.FC<Props> = ({ next, previous }) => {
  return (
    <aside className="hidden md:block grid-sidebar w-full z-0 bg-white shadow-slate-900 drop-shadow-lg">
      <div className="my-6 m-auto w-min">
        <Logo className="w-16 m-auto fill-slate-800"/>
        <h1 className="font-light text-3xl text-slate-500 whitespace-nowrap">
          <span className="font-bold text-slate-800">Top</span> pop
          </h1>
      </div>
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
                     h-12 p-4 mr-4 btn rounded-full"
        >
          <Arrow className="stroke-slate-300 h-full m-auto rotate-180" />
        </button>
      </div>
    </aside>
  )
}

export default Navigation