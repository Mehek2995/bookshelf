export const PX = 3.78 // pixels per millimetre

let meter // one hidden textarea, reused for every measurement

function getMeter() {
  if (!meter) {
    meter = document.createElement('textarea')
    meter.className = 'page meter'
    document.body.appendChild(meter)
  }
  return meter
}

export function fits(book, text) {
  const m = getMeter()
  m.style.width = book.w * PX + 'px'
  m.style.height = book.h * PX + 'px'
  m.value = text
  return m.scrollHeight <= m.clientHeight + 1
}

export function reflow(book, pages, from = 0) {
  const out = [...pages]
  for (let i = from; i < out.length; i++) {
    if (fits(book, out[i])) continue
    const parts = out[i].split(/(\s+)/) // words and the spaces between them
    const tail = []
    while (parts.length > 1 && !fits(book, parts.join(''))) {
      tail.unshift(parts.pop())
    }
    out[i] = parts.join('')
    if (i + 1 >= out.length) out.push('')
    out[i + 1] = tail.join('') + out[i + 1]
  }
  if (out.length % 2) out.push('') // keep the page count even
  return out
}