import React from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { useScreenMinHeight } from '../hooks';
import Navigation from './Navigation';

const NotFound = () => {
  const ref = useScreenMinHeight<HTMLDivElement>();
  const history = useHistory();
  const { chart, track } = useParams<{chart: string, track: string}>();
  console.log({chart, track});


  return (
    <div ref={ref} className={`grid grid-layout-lite md:grid-layout-full`}>
      <Navigation>
        <button
          onClick={() => history.push(`/chart/${track ? chart : 0}`)}
          className="p-4 btn w-full transition-colors"
        >
          <span className="text-lg">Charts</span>
        </button>
      </Navigation>
      <main className="row-span-2 flex justify-center items-center
                       w-full h-full p-8 bg-gradient-to-tr from-red-100 bg-slate-100">
        <div className="text-center">
          <h1 className="text-9xl md:text-[12rem] font-black text-red-400">404</h1>
          <p className="text-slate-500 font-normal text-xl mb-4">Page not found</p>
          <Link to={`/chart/${track ? chart : 0}`} className="text-slate-400 hover:text-slate-500 transition-colors">Go to charts</Link>
        </div>
      </main>
    </div>
  )
}

export default NotFound;