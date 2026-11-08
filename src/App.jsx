import { useState } from 'react'
import Shelf from './components/Shelf'
import './App.css'
import BookView from './components/BookView'
import NewNotebookDialog from './components/NewNotebookDialog'

export default function App() {

  const [books, setBooks] = useState([
    { id: 'a', title: 'Operating Systems', color: '#27456b', w: 148, h: 210, pages: ['', ''], paper: 'ruled' },
    { id: 'b', title: 'Maths', color: '#3f6b4d', pages: ['', ''], paper: 'ruled' },
  ])
  const [openId, setOpenId] = useState(null)
  const openBook = books.find((b) => b.id === openId)
  const [creating, setCreating] = useState(false)

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
        <BookView book={openBook}
          onBack={() => setOpenId(null)}
          onPagesChange={(pages) => setPages(openBook.id, pages)} />
      ) : (
        <Shelf books={books} onOpen={setOpenId} />
      )}
      {creating && <NewNotebookDialog onCreate={addBook} onCancel={() => setCreating(false)} />}
    </>
  )
}