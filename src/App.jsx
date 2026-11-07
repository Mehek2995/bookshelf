import { useState } from 'react'
import Shelf from './components/Shelf'
import './App.css'
import BookView from './components/BookView'

export default function App() {

  const [books, setBooks] = useState([
    { id: 'a', title: 'Operating Systems', color: '#27456b', w: 148, h: 210, pages: ['', ''] },
    { id: 'b', title: 'Maths', color: '#3f6b4d', pages: ['', ''] },
  ])
  const [openId, setOpenId] = useState(null)
  const openBook = books.find((b) => b.id === openId)

  function addBook() {
    const title = prompt('Notebook title?')
    if (!title) return
    setBooks([...books, { id: Date.now().toString(), title, color: '#6a3b5e' }])
  }
  function updatePage(id, pageIndex, text) {
    setBooks(
      books.map((b) => {
        if (b.id !== id) return b
        const pages = b.pages.map((p, i) => (i === pageIndex ? text : p))
        return { ...b, pages }
      })
    )
  }

  return (
    <>
      <header>
        Bookshelf <button onClick={addBook}>New notebook</button>
      </header>
      {openBook ? (
        <BookView book={openBook}
          onBack={() => setOpenId(null)}
          onPageChange={(i, text) => updatePage(openBook.id, i, text)} />
      ) : (
        <Shelf books={books} onOpen={setOpenId} />
      )}
    </>
  )
}