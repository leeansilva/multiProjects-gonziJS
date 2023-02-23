import { Route, Routes } from 'react-router-dom'
import Home from './containers/Home/Home'
import Memotest from './components/games/Memotest/Memotest'
import WordsPerMinute from './components/games/WordsPerMinute.jsx/WordsPerMinute'
import Games from './pages/Games/Games'


function App() {

  return (
      <Routes>
        <Route element={<Home/> } path='/'/>
        <Route element={<Games/>} path='/games'/>
        <Route element={<Memotest/>} path='games/memotest'/>
        <Route element={<WordsPerMinute/>} path='games/wpm'/>
      </Routes>
  )
}

export default App
