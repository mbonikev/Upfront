import React, { useEffect } from 'react'
import { HashRouter, Routes, Route, useNavigate } from 'react-router-dom'
import './App.css'
import Projects from './pages/Projects'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import ProtectedRoutes from './utils/ProtectiveRoutes'

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route element={<ProtectedRoutes/>}>
            <Route path='/' element={<Projects />} />
          </Route>
          <Route path='/auth/login' element={<Login />} />
          <Route path='/auth/signup' element={<SignUp />} />
        </Routes>
      </HashRouter>
    </>
  )
}

export default App