export type Props = {
  img: string
}

const Header: React.FC<Props> = ({ img, children }) => {
  return (
    <header
      className="relative flex flex-col justify-end grid-header h-full overflow-hidden z-10"
    >
      <div
        style={{backgroundImage: `url(${img})`}}
        className="absolute top-[-5%] left-[-5%] h-[110%] w-[110%] bg-slate-300 bg-center bg-cover blur-sm"
      />
      <div className="relative flex flex-col justify-end h-full mx-8 md:mx-16 mb-8 mt-4 text-white">
        {children}
      </div>
    </header>
  )
}

export default Header