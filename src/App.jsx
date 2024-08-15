import React, { useEffect } from 'react'
import { HashRouter, Routes, Route, useNavigate } from 'react-router-dom'
import './App.css'
import Projects from './pages/Projects'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import ProtectedRoutes from './utils/ProtectiveRoutes'
import ProtectedAuthRoutes from './utils/ProtectedAuthRoutes'
import ForgotPassword from './pages/ForgotPassword'
import FPQ from './pages/FPQ'
import CreateNewPassword from './pages/CreateNewPassword'
import PasswordChangedSuccessfully from './pages/PasswordChangedSuccessfully'
import ProtectedFP from './utils/ProtectedFP'
import Project from './pages/Project'

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          {/* Routes */}
          <Route element={<ProtectedRoutes />}>
            <Route path='/' element={<Projects />} />
            <Route path='/project/:id' element={<Project />} />
          </Route>
          {/* Auth */}
          <Route element={<ProtectedAuthRoutes />}>
            <Route path='/auth/login' element={<Login />} />
            <Route path='/auth/signup' element={<SignUp />} />
            <Route path='/forgotPassword' element={<ForgotPassword />} />
            <Route path='/success' element={<PasswordChangedSuccessfully />} />
          </Route>
          {/* Forgot Password */}
          <Route element={<ProtectedFP />}>
            <Route path='/fpq' element={<FPQ />} />
            <Route path='/newPassword' element={<CreateNewPassword />} />
          </Route>
        </Routes>
      </HashRouter>
    </>
  )
}

export default App