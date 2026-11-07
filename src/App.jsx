import { useState } from 'react'
import Shelf from './components/Shelf'
import './App.css'

export default function App() {
  const [books, setBooks] = useState([
    { id: 'a', title: 'Operating Systems', color: '#27456b' },
    { id: 'b', title: 'Maths', color: '#3f6b4d' },
  ])

  return (
    <>
      <header>Bookshelf</header>
      <Shelf books={books} />
    </>
  )
}