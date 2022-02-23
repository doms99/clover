const Loader = () => {
  return (
    <div className="relative left-1/2 transform -translate-x-1/2 inline-block w-20 h-20 shadow-slate-800 drop-shadow-sm">
      <div style={{animationDelay: '-0.24s'}} className="absolute inline-block left-2 w-4 bg-white animate-grow" />
      <div style={{animationDelay: '-0.12s'}} className="absolute inline-block left-8 w-4 bg-white animate-grow" />
      <div style={{animationDelay: '0s'}} className="absolute inline-block left-14 w-4 bg-white animate-grow" />
    </div>
  )
}

export default Loader