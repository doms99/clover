import React from 'react'
import Logo from '../icons/Logo'

const Navigation: React.FC = ({ children }) => {
  return (
    <aside className="hidden md:block grid-sidebar w-full z-0 bg-white shadow-slate-900 drop-shadow-lg">
      <div title="Top pop" className="my-6 m-auto w-min font-sans">
        <Logo className="w-16 m-auto fill-slate-800"/>
        <h1 className="font-light text-3xl text-slate-500 whitespace-nowrap">
          <span className="font-bold text-slate-800">Top</span> pop
          </h1>
      </div>
      {children}
    </aside>
  )
}

export default Navigation