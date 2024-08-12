import React, { useEffect, useState } from 'react'
import logo from '../assets/logo-60x60.png'
import { FcGoogle } from 'react-icons/fc'
import { Link, useNavigate } from 'react-router-dom'
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5'
import { MdArrowOutward } from 'react-icons/md'
import axios from 'axios';
import { RiLoader5Fill } from 'react-icons/ri'

function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [securityQ, setSecurityQ] = useState('2');
  const [securityQAnswer, setSecurityQAnswer] = useState('');
  const [errorEmail, setErrorEmail] = useState('')
  const [errorPassword, setErrorPassword] = useState('')
  const [authing, setAuthing] = useState(false)
  const navigate = useNavigate()

  const handleShowPassword = (e) => {
    e.preventDefault()
    setShowPassword(!showPassword)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthing(true)
    if (password === password2) {
      setErrorPassword('')
      try {
        const response = await axios.post('http://localhost:5000/api/signup', { userName, email, password, securityQ, securityQAnswer });
        if (response.status === 200) {
          setErrorEmail('')
          localStorage.setItem('upfront_user', email)
          navigate('/')
        }

      } catch (error) {
        setAuthing(false)
        if (error.response.status === 401) {
          setErrorEmail(error.response.data.msg)
        }
      }
    }
    else {
      setAuthing(false)
      setErrorPassword("Password doesn't match")
    }

  };

  return (
    <>
      <div className='w-full h-fit min-h-svh flex flex-col text-sm text-text-color'>
        {/* topbar */}
        <div className='w-full py-4 px-10 max-md:px-4 '>
          <Link to={'/'} className='flex items-center gap-1'>
            <div className='min-w-8'>
              <img src={logo} className="h-8" loading='lazy' />
            </div>
            <h1 className='font-semibold text-xl font-l text-main-color tracking-tight'>Upfront.</h1>
          </Link>
        </div>
        {/* form */}
        <div className="w-full max-w-[400px] p-5 mx-auto h-full flex-1 flex flex-col items-start justify-center gap-2">
          <div className='w-full'>
            <h1 className='text-2xl font-semibold'>Sign Up</h1>
            <p className='font-medium text-text-color/70 pb-4 text-xs'>Hi there, Excited to have you</p>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col items-start justify-start gap-2 w-full h-fit ">
            <label className='w-full'>
              <h1 className='mb-2 font-semibold'>Username</h1>
              <input required onChange={(e) => setUserName(e.target.value)} type="text" name='name' placeholder='E.g. johndoe' className="w-full h-[40px] ring-1 ring-border-line-color p-4 focus:ring-2 bg-white focus:ring-main-color rounded-md placeholder:text-text-color/40 " id="" />
            </label>
            <label className='w-full'>
              <h1 className='mb-2 font-semibold'>Email</h1>
              <input required onChange={(e) => setEmail(e.target.value)} type="email" name='email' placeholder='E.g. johndoe@gmail.com' className="w-full h-[40px] ring-1 ring-border-line-color p-4 focus:ring-2 bg-white focus:ring-main-color rounded-md placeholder:text-text-color/40 " id="" />
            </label>
            {errorEmail !== '' && <p className='text-xs text-red-600'>{errorEmail}</p>}
            <label className='w-full'>
              <h1 className='mb-2 font-semibold'>Password</h1>
              <div className="w-full h-fit relative">
                <input required onChange={(e) => setPassword(e.target.value)} type={showPassword ? 'text' : 'password'} name='password' placeholder='Enter your password' className="w-full h-[40px] ring-1 ring-border-line-color p-4 pr-12 focus:ring-2 bg-white focus:ring-main-color rounded-md placeholder:text-text-color/40 " id="" />
                <div onClick={handleShowPassword} className=' absolute top-0 bottom-0 right-3 m-auto text-xl w-fit h-fit p-1 text-text-color/70 cursor-pointer select-none'>
                  {showPassword ?
                    <IoEyeOutline />
                    :
                    <IoEyeOffOutline />
                  }
                </div>
              </div>
            </label>
            {errorPassword !== '' && <p className='text-xs text-red-600'>{errorPassword}</p>}
            <label className='w-full'>
              <h1 className='mb-2 font-semibold'>Comfirm Password</h1>
              <div className="w-full h-fit relative">
                <input required onChange={(e) => setPassword2(e.target.value)} type={showPassword ? 'text' : 'password'} name='password' placeholder='Enter your password' className="w-full h-[40px] ring-1 ring-border-line-color p-4 pr-12 focus:ring-2 bg-white focus:ring-main-color rounded-md placeholder:text-text-color/40 " id="" />
              </div>
            </label>
            {errorPassword !== '' && <p className='text-xs text-red-600'>{errorPassword}</p>}
            <label className='w-full'>
              <h1 className='mb-2 font-semibold'>Security Question</h1>
              <div className="w-full h-fit relative">
                <select required onChange={(e) => setSecurityQ(e.target.value)} type={showPassword ? 'text' : 'password'} name='password' placeholder='Enter your password' className="w-full h-[40px] ring-1 ring-border-line-color px-4 pr-9 focus:ring-2 bg-white focus:ring-main-color rounded-md placeholder:text-text-color/40 " id="" >
                  <option value="" disabled hidden selected>Select a security question</option>
                  <option value="What is the name of your first pet?">What is the name of your first pet?</option>
                  <option value="What was the name of the street you grew up on?">What was the name of the street you grew up on?</option>
                  <option value="What was your childhood nickname?">What was your childhood nickname?</option>
                  <option value="What is your mother's maiden name?">What is your mother's maiden name?</option>
                </select>
              </div>
            </label>
            <label className='w-full'>
              <h1 className='mb-2 font-semibold'>Answer</h1>
              <input required onChange={(e) => setSecurityQAnswer(e.target.value)} type="text" autoComplete='off' name='answer' placeholder='E.g. jexy' className="w-full h-[40px] ring-1 ring-border-line-color p-4 focus:ring-2 bg-white focus:ring-main-color rounded-md placeholder:text-text-color/40 " id="" />
            </label>
            <label className='w-full mt-5'>
              <button type='submit' title='Login' className={`w-full h-[40px] bg-main-color hover:bg-main-color-hover text-white rounded-md font-semibold flex items-center justify-center gap-1 transition select-none ${authing ? 'pointer-events-none opacity-75' : ''}`}>
                {authing ? (
                  <div className='flex items-center gap-1'>
                    <RiLoader5Fill className='text-2xl animate-spinLoader' />
                  </div>
                ) : (
                  <div className='flex items-center gap-1'>
                    <p>Sign Up</p>
                  </div>
                )}
              </button>
            </label>
            <div className='flex items-center justify-center w-full py-4 gap-1 max-sm:flex-col'>
              <h1>Allready registered? </h1>
              <Link to="/auth/login" className='text-main-color font-medium w-fit flex items-center gap-1 '>Login <MdArrowOutward /></Link>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default SignUp