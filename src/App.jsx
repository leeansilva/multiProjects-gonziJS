import { Route, Routes } from 'react-router-dom'
import Home from './containers/Home/Home'
import Memotest from './components/games/Memotest/Memotest'
import WordsPerMinute from './components/games/WordsPerMinute.jsx/WordsPerMinute'
import Games from './pages/Games/Games'
import { DataProvider } from './context/dataContext'
import Rankings from './pages/Rankings/Rankings'
import { Modal } from 'bootstrap'
import Minesweeper from './components/games/Minesweeper/Minesweeper.jsx'
import Hangman from './components/games/Hangman/Hangman'
import Pacman from './components/games/Pacman/Pacman'
import ContactMe from './pages/Contact me/ContactMe'


function App() {

  return (
    
    <DataProvider>

      <Routes>
        <Route element={<Home/> } path='/'/>

        <Route element = {<Modal/>} path='/login' />

        <Route element={<Games/>} path='/games'/>
          <Route element={<Memotest/>} path='games/memotest'/>
          <Route element={<WordsPerMinute/>} path='games/wpm'/>
          <Route element={<Minesweeper rows={8} cols={8} bombs={10}/>} path='games/minesweeper'/>
          <Route element={<Hangman/>} path='games/hangman'/>
          <Route element={<Pacman/>} path='games/pacman'/>
        
        <Route element={<Rankings/>} path='/rankings'/>
        <Route element={<ContactMe/>} path='/contact'/>
        
      </Routes>

    </DataProvider>
  )
}

export default App
