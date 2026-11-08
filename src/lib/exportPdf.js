import { PX } from './pagination'

export function exportPdf(book) {
    // skip empty pages at the end, but always keep at least one
    let last = book.pages.length - 1
    while (last > 0 && !book.pages[last].trim()) last--
    const pages = book.pages.slice(0, last + 1)

    // tell the printer the page size is the notebook's size
    const style = document.createElement('style')
    style.textContent = `@page { size: ${book.w * PX}px ${book.h * PX}px; margin: 0 }`

    // build one sheet per page inside a temporary container
    const root = document.createElement('div')
    root.id = 'print'
    root.className = book.paper || 'blank'
    pages.forEach((text) => {
        const sheet = document.createElement('div')
        sheet.className = 'page sheet'
        sheet.style.width = book.w * PX + 'px'
        sheet.style.height = book.h * PX - 1 + 'px'
        sheet.textContent = text
        root.appendChild(sheet)
    })

    document.head.appendChild(style)
    document.body.appendChild(root)

    function cleanup() {
        document.title = oldTitle
        style.remove()
        root.remove()
        window.removeEventListener('afterprint', cleanup)
    }
    const oldTitle = document.title
    document.title = book.title
    window.addEventListener('afterprint', cleanup)
    window.print()
}