type LinesProps = {
  reverse?: boolean
}

const Lines = ({ reverse = false }: LinesProps) => {
  const colors = ["#061113", "#0D1B21", "#0E2128", "#16282F", "#1E383C", "#1E383C"]

  const list = reverse ? [...colors].reverse() : colors

  return (
    <>
      {list.map((color, idx) => (
        <div key={idx} className="mb-0.25 h-2 w-full" style={{ backgroundColor: color }} />
      ))}
    </>
  )
}

export default Lines
