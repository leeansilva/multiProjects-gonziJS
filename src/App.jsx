import { Route, Routes } from 'react-router-dom'
import Home from './containers/Home/Home'
import Memotest from './components/games/Memotest/Memotest'
import WordsPerMinute from './components/games/WordsPerMinute.jsx/WordsPerMinute'
import Games from './pages/Games/Games'
import { DataProvider } from './context/dataContext'
import Rankings from './pages/Rankings/Rankings'
import { Modal } from 'bootstrap'


function App() {

  return (
    
    <DataProvider>

      <Routes>
        <Route element={<Home/> } path='/'/>

        <Route element = {<Modal/>} path='/login' />

        <Route element={<Games/>} path='/games'/>
        <Route element={<Memotest/>} path='games/memotest'/>
        <Route element={<WordsPerMinute/>} path='games/wpm'/>


        <Route element={<Rankings/>} path='/rankings'/>
      </Routes>

    </DataProvider>
  )
}

export default App
