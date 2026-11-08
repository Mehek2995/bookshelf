import { useState } from 'react'
import { SIZES, COLORS, PAPERS } from '../lib/options'

const clamp = (v) => Math.min(400, Math.max(60, Number(v) || 150))

export default function NewNotebookDialog({ onCreate, onCancel }) {
  const [title, setTitle] = useState('')
  const [color, setColor] = useState(COLORS[0])
  const [size, setSize] = useState('a5')
  const [cw, setCw] = useState(150)
  const [ch, setCh] = useState(200)
  const [paper, setPaper] = useState('ruled')

  function create() {
    const dims = size === 'custom' ? { w: clamp(cw), h: clamp(ch) } : SIZES[size]
    onCreate({ title: title.trim() || 'Untitled notebook', color, paper, w: dims.w, h: dims.h })
  }

  return (
    <div className="modal" onClick={onCancel}>
      <div className="card" onClick={(e) => e.stopPropagation()}>
        <h2>New notebook</h2>
        <label>
          Title
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Operating Systems" />
        </label>
        <div className="swatches">
          {COLORS.map((c) => (
            <button
              key={c}
              className={c === color ? 'swatch on' : 'swatch'}
              style={{ background: c }}
              onClick={() => setColor(c)}
            />
          ))}
        </div>
        <label>
          Page size
          <select value={size} onChange={(e) => setSize(e.target.value)}>
            {Object.entries(SIZES).map(([key, s]) => (
              <option key={key} value={key}>{s.label} ({s.w} × {s.h} mm)</option>
            ))}
            <option value="custom">Custom size</option>
          </select>
        </label>
        {size === 'custom' && (
          <div className="two">
            <label>Width (mm)<input type="number" value={cw} onChange={(e) => setCw(e.target.value)} /></label>
            <label>Height (mm)<input type="number" value={ch} onChange={(e) => setCh(e.target.value)} /></label>
          </div>
        )}
        <label>
          Paper
          <select value={paper} onChange={(e) => setPaper(e.target.value)}>
            {PAPERS.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </label>
        <div className="actions">
          <button onClick={onCancel}>Cancel</button>
          <button onClick={create}>Create notebook</button>
        </div>
      </div>
    </div>
  )
}