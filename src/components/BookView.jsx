const PX = 3.78 // pixels per millimetre

export default function BookView({ book, onBack, onPageChange }) {
  const pageStyle = { width: book.w * PX, height: book.h * PX }

  return (
    <div className="bookview">
      <button onClick={onBack}>Back to shelf</button>
      <h2>{book.title}</h2>
      <div className="spread">
        {book.pages.slice(0, 2).map((text, i) => (
          <textarea
            key={i}
            className="page"
            style={pageStyle}
            value={text}
            onChange={(e) => onPageChange(i, e.target.value)}
          />
        ))}
      </div>
    </div>
  )
}