export type Props = {
  label: string
}

const Tag: React.FC<Props> = ({ label, children }) => {
  return (
    <div className="relative flex items-center h-full px-2">
      <p className="absolute top-0 left-0 margin-2 text-sm text-slate-400">{label}</p>
      <div className="pt-4">{children}</div>
    </div>
  )
}

export default Tag