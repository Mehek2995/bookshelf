import { useRef, useEffect } from 'react'
import { PX, reflow } from '../lib/pagination'

export default function BookView({ book, onBack, onPagesChange }) {
  const pageStyle = { width: book.w * PX, height: book.h * PX }
  const areas = useRef([]) // the textarea elements
  const pending = useRef(null) // where the cursor should go after redraw

  useEffect(() => {
    if (!pending.current) return
    const { index, pos } = pending.current
    const ta = areas.current[index]
    if (ta) {
      ta.focus()
      ta.setSelectionRange(pos, pos)
    }
    pending.current = null
  })

  function handleChange(i, e) {
    const value = e.target.value
    const caret = e.target.selectionStart
    const draft = book.pages.map((p, j) => (j === i ? value : p))
    const next = reflow(book, draft, i)
    if (next[i].length < value.length && caret > next[i].length) {
      pending.current = { index: i + 1, pos: caret - next[i].length }
    }
    onPagesChange(next)
  }

  return (
    <div className="bookview">
      <button onClick={onBack}>Back to shelf</button>
      <h2>{book.title}</h2>
      <div className="spread">
        {book.pages.slice(0, 2).map((text, i) => (
          <textarea
            key={i}
            ref={(el) => (areas.current[i] = el)}
            className="page"
            style={pageStyle}
            value={text}
            onChange={(e) => handleChange(i, e)}
          />
        ))}
      </div>
    </div>
  )
}