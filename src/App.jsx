import React, { useEffect } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Projects from './pages/Projects'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import axios from 'axios'

function App() {

  useEffect(() => {
    const email = localStorage.getItem('upfront_user') || ''

    const verifyUser = async () => {
      // if (email !==)
      try {
        const response = await axios.get('http://localhost:5000/api/verify', { email })
      }
      catch (error) {
        console.log(error)
      }
    }

    verifyUser()
  }, [])

  return (
    <>
      <HashRouter>
        <Routes>
          <Route path='/' element={<Projects />} />
          <Route path='/auth/login' element={<Login />} />
          <Route path='/auth/signup' element={<SignUp />} />
        </Routes>
      </HashRouter>
    </>
  )
}

export default App