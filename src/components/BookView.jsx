export default function BookView({ book, onBack, onTextChange }) {
  {
    return (
      <div className="bookview">
        <button onClick={onBack}>Back to shelf</button>
        <h2>{book.title}</h2>
        <textarea
          value={book.text || ''}
          onChange={(e) => onTextChange(e.target.value)}
          rows="12"
          cols="60"
        />
      </div>
    )
  }
}