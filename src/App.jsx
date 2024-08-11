import React from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Projects from './assets/pages/Projects'
import Login from './assets/pages/Login'

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path='/' element={<Projects />}/>
          <Route path='/auth/login' element={<Login />}/>
        </Routes>
      </HashRouter>
    </>
  )
}

export default App