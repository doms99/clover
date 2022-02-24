export type Props = {
  img: string
}

const Header: React.FC<Props> = ({ img, children }) => {
  return (
    <header
        className="relative grid-header h-full overflow-hidden z-10"
    >
      <div
        style={{backgroundImage: `url(${img})`}}
        className="absolute top-[-5%] left-[-5%] h-[110%] w-[110%] bg-none bg-center bg-cover blur-sm"
      />
      <div className="absolute bottom-0 left-0 w-full mx-8 md:mx-16 mb-8 text-white">
        {children}
      </div>
    </header>
  )
}

export default Header