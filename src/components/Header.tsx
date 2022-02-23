export type Props = {
  img: string,
  name: string
}

const Header: React.FC<Props> = ({ img, name }) => {
  return (
    <header
        className="relative grid-header h-full overflow-hidden z-10"
    >
      <div
        style={{backgroundImage: `url(${img})`}}
        className="absolute top-[-5%] left-[-5%] h-[110%] w-[110%] bg-none bg-center bg-cover blur-sm"
      />
      <div className="absolute bottom-0 left-0 w-full mx-8 md:mx-16 mb-8 text-white">
        <h3 className="text-xl md:text-3xl mb-2 font-light"><span className="font-semibold">Top</span> 10</h3>
        <h1 className="text-title-md lg:text-title-lg xl:text-title font-bold">{name}</h1>
      </div>
    </header>
  )
}

export default Header