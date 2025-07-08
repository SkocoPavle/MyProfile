import { useState } from 'react'
import './App.css'
import { Header } from './HeaderPart'
import { Main } from './MainPart'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <Main />
    </>
  )
}

export default App
