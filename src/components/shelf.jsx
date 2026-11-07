export default function Shelf({ books }) {
  return (
    <div className="row">
      {books.map((b) => (
        <button key={b.id} className="book" style={{ background: b.color }}>
          {b.title}
        </button>
      ))}
    </div>
  )
}