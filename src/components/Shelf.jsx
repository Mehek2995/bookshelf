const PER_ROW = 5

function coverSize(b) {
  const height = Math.round(120 + (b.h - 90) * 0.45)
  const width = Math.max(96, Math.round((height * b.w) / b.h))
  return { width, height }
}

export default function Shelf({ books, onOpen }) {
  const rows = []
  for (let i = 0; i < books.length; i += PER_ROW) rows.push(books.slice(i, i + PER_ROW))
  while (rows.length < 2) rows.push([]) // always show at least two planks

  return (
    <div className="shelf">
      {rows.map((row, r) => (
        <div className="row" key={r}>
          {row.map((b) => {
            const written = b.pages.filter((p) => p.trim()).length
            return (
              <button
                key={b.id}
                className="book"
                style={{ ...coverSize(b), '--c': b.color }}
                onClick={() => onOpen(b.id)}
              >
                <span className="label">{b.title}</span>
                <small>{written} {written === 1 ? 'page' : 'pages'} written</small>
              </button>
            )
          })}
        </div>
      ))}
    </div>
  )
}