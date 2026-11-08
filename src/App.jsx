import { useState, useEffect } from 'react'
import Shelf from './components/Shelf'
import BookView from './components/BookView'
import NewNotebookDialog from './components/NewNotebookDialog'
import { loadBooks, saveBooks } from './lib/storage'
import './App.css'

const STARTER_BOOKS = [
  { id: 'a', title: 'Operating Systems', color: '#27456b', paper: 'ruled', w: 148, h: 210, pages: ['', ''] },
  { id: 'b', title: 'Maths', color: '#3f6b4d', paper: 'ruled', w: 148, h: 210, pages: ['', ''] },
]

export default function App() {
  const [books, setBooks] = useState(() => loadBooks(STARTER_BOOKS))
  const [openId, setOpenId] = useState(null)
  const [creating, setCreating] = useState(false)
  const openBook = books.find((b) => b.id === openId)

  useEffect(() => {
    saveBooks(books)
  }, [books])

  function addBook({ title, color, paper, w, h }) {
    setBooks([...books, { id: Date.now().toString(), title, color, paper, w, h, pages: ['', ''] }])
    setCreating(false)
  }

  function setPages(id, pages) {
    setBooks(books.map((b) => (b.id === id ? { ...b, pages } : b)))
  }

  return (
    <>
      <header>
        Bookshelf <button onClick={() => setCreating(true)}>New notebook</button>
      </header>
      {openBook ? (
        <BookView
          book={openBook}
          onBack={() => setOpenId(null)}
          onPagesChange={(pages) => setPages(openBook.id, pages)}
        />
      ) : (
        <Shelf books={books} onOpen={setOpenId} />
      )}
      {creating && <NewNotebookDialog onCreate={addBook} onCancel={() => setCreating(false)} />}
    </>
  )
}