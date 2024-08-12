import React, { useEffect } from 'react'
import { HashRouter, Routes, Route, useNavigate } from 'react-router-dom'
import './App.css'
import Projects from './pages/Projects'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import ProtectedRoutes from './utils/ProtectiveRoutes'
import ProtectedAuthRoutes from './utils/ProtectedAuthRoutes'

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          {/* Routes */}
          <Route element={<ProtectedRoutes />}>
            <Route path='/' element={<Projects />} />
          </Route>
          {/* Auth */}
          <Route element={<ProtectedAuthRoutes />}>
            <Route path='/auth/login' element={<Login />} />
            <Route path='/auth/signup' element={<SignUp />} />
          </Route>
        </Routes>
      </HashRouter>
    </>
  )
}

export default App