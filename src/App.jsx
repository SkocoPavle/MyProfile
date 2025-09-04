import { useState } from 'react'
import './App.css'
import { Header } from './HeaderPart'
import { Main } from './MainPart'
import { Contact } from './Contact'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <Main />
      <Contact />
    </>
  )
}

export default App
