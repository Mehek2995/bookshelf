import { useState, useRef, useEffect } from 'react'
import { PX, reflow } from '../lib/pagination'
import { exportPdf } from '../lib/exportPdf'

export default function BookView({ book, onBack, onPagesChange }) {
  const [sp, setSp] = useState(0) // index of the left page of the open spread
  const [scale, setScale] = useState(1)
  const pageStyle = { width: book.w * PX, height: book.h * PX }
  const areas = useRef([])
  const pending = useRef(null)

  useEffect(() => {
    function fit() {
      const W = book.w * PX * 2
      const H = book.h * PX
      setScale(Math.min((window.innerHeight - 230) / H, (window.innerWidth - 80) / W, 1))
    }
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [book.w, book.h])

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

  function handleChange(o, e) {
    const i = sp + o
    const value = e.target.value
    const caret = e.target.selectionStart
    const draft = book.pages.map((p, j) => (j === i ? value : p))
    const next = reflow(book, draft, i)
    if (next[i].length < value.length && caret > next[i].length) {
      const target = i + 1
      const newSp = target > sp + 1 ? sp + 2 : sp
      pending.current = { index: target - newSp, pos: caret - next[i].length }
      setSp(newSp)
    }
    onPagesChange(next)
  }

  function goNext() {
    if (sp + 2 >= book.pages.length) onPagesChange([...book.pages, '', ''])
    setSp(sp + 2)
  }

  return (
    <div className="bookview">
      <button onClick={onBack}>Back to shelf</button>
      <button onClick={() => exportPdf(book)}>Export PDF</button>
      <h2>{book.title}</h2>
      <div className="fit" style={{ width: book.w * PX * 2 * scale, height: book.h * PX * scale }}>
        <div
          className={'spread ' + (book.paper || 'blank')}
          style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}
        >
          {book.pages.slice(sp, sp + 2).map((text, o) => (
            <textarea
              key={o}
              ref={(el) => (areas.current[o] = el)}
              className="page"
              style={pageStyle}
              value={text}
              onChange={(e) => handleChange(o, e)}
            />
          ))}
        </div>
      </div>
      <div className="flipbar">
        <button onClick={() => setSp(sp - 2)} disabled={sp === 0}>Previous</button>
        <span>Pages {sp + 1} and {sp + 2} of {book.pages.length}</span>
        <button onClick={goNext}>Next</button>
      </div>
    </div>
  )
}