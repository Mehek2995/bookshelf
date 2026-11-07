export default function BookView({ book, onBack }) {
  return (
    <div className="bookview">
      <button onClick={onBack}>Back to shelf</button>
      <h2>{book.title}</h2>
      <textarea placeholder="Start writing..." rows="12" cols="60" />
    </div>
  )
}