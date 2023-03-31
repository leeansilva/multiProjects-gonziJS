import { Route, Routes } from 'react-router-dom'
import Home from './containers/Home/Home'
import Memotest from './components/games/Memotest/Memotest'
import WordsPerMinute from './components/games/WordsPerMinute.jsx/WordsPerMinute'
import Games from './pages/Games/Games'
import {  PrivateRoutes } from './context/dataContext'
import Rankings from './pages/Rankings/Rankings'
import Minesweeper from './components/games/Minesweeper/Minesweeper.jsx'
import Hangman from './components/games/Hangman/Hangman'
import Pacman from './components/games/Pacman/Pacman'
import ContactMe from './pages/Contact me/ContactMe'
import PongGame from './components/games/Pong/PongGame'
import Profile from './pages/Profile/Profile'
import NotFound from './components/NotFound/NotFound'


function App() {

  return (
    


      <Routes>
        <Route element={<Home/> } path='/'/>

        <Route element={<Games/>} path='/games'/>
          <Route element={<Memotest/>} path='games/memotest'/>
          <Route element={<WordsPerMinute/>} path='games/wpm'/>
          <Route element={<Minesweeper rows={8} cols={8} bombs={10}/>} path='games/minesweeper'/>
          <Route element={<Hangman/>} path='games/hangman'/>
          <Route element={<Pacman/>} path='games/pacman'/>
          <Route element={<PongGame/>} path='games/pong'/>
        
        <Route element={<Rankings/>} path='/rankings'/>
        <Route element={<ContactMe/>} path='/contact'/>
      
        <Route element={
            <PrivateRoutes>
              <Profile/>
            </PrivateRoutes>
        } path='/profile'/>

        <Route element={ <NotFound/> } path='*'/>

        
      </Routes>

   
  )
}

export default App
