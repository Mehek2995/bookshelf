export default function Shelf({ books, onOpen }) {
  return (
    <div className="row">
      {books.map((b) => (
        <button
          key={b.id}
          className="book"
          style={{ background: b.color }}
          onClick={() => onOpen(b.id)}
        >
          {b.title}
        </button>
      ))}
    </div>
  )
}