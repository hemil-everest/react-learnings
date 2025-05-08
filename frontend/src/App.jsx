import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './css/App.css'
import MovieCard from './components/MovieCard'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import Favorites from './pages/Favorites'
import Navbar from './components/Navbar'

// returns only parent one root element
// Define router here it will help us to define where we should go and what component to display based on / route we go to
// Define navbar in app because it will be used in all the pages
function App() {
  return (
    <>
    <div>
      <Navbar/>
    </div>
      <div>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </main>
      </div>
    </>
  )
}
export default App
