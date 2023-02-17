import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Memotest from './containers/Memotest/Memotest'
import Pokemon from './containers/Pokemon/Pokemon'
import WordsPerMinute from './containers/WordsPerMinute.jsx/WordsPerMinute'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route element={<Memotest/>} path='/memotest'/>
      <Route element={<Pokemon/>} path='/pokemon'/>
      <Route element={<WordsPerMinute/>} path='/wpm'/>
    </Routes>
  )
}

export default App
