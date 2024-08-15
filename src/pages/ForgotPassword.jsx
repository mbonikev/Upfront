import React, { useEffect, useState } from 'react'
import logo from '../assets/logo-60x60.png'
import { FcGoogle } from 'react-icons/fc'
import { Link, useNavigate } from 'react-router-dom'
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5'
import { MdArrowOutward } from 'react-icons/md'
import axios from 'axios';
import { RiLoader5Fill } from 'react-icons/ri'



function ForgotPassword() {
    const apiUrl = (import.meta.env.VITE_REACT_APP_BACKEND_API);
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState('');
    const [errorEmail, setErrorEmail] = useState('')
    const [authing, setAuthing] = useState(false)
    const navigate = useNavigate()


    const handleShowPassword = (e) => {
        e.preventDefault()
        setShowPassword(!showPassword)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setAuthing(true)
        try {
            const response = await axios.post(`${apiUrl}/api/verifyEmail`, { email });
            if (response.status === 200) {
                setErrorEmail('')
                const code = Math.random().toString().slice(2, 22).padEnd(20, '0');
                localStorage.setItem('fpq-key-code-random', code)
                navigate(`/fpq`, { state: { email, question: response.data.question } })
            }

        } catch (error) {
            setAuthing(false)
            console.log(error)
            if (error.response.status === 400) {
                setErrorEmail(error.response.data.msg)
            }
        }
    };

    useEffect(() => {
        document.title = "Forgot Password - Upfront";
    }, [])


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
                        <h1 className='text-2xl font-semibold'>Forgot Password?</h1>
                        <p className='font-medium text-text-color/70 pb-4 text-xs'>No worries, just provide you account email</p>
                    </div>
                    <form onSubmit={handleSubmit} className="flex flex-col items-start justify-start gap-2 w-full h-fit ">
                        <label className='w-full'>
                            <h1 className='mb-2 font-semibold'>Email</h1>
                            <input required onChange={(e) => setEmail(e.target.value)} type="email" name='email' placeholder='E.g. johndoe@gmail.com' className="w-full h-[40px] ring-1 ring-border-line-color p-4 focus:ring-2 focus:ring-main-color rounded-md placeholder:text-text-color/40 " id="" />
                        </label>
                        {errorEmail !== '' && <p className='text-xs text-red-600'>{errorEmail}</p>}


                        <label className='w-full mt-3'>
                            <button type='submit' title='Login' className={`w-full h-[40px] bg-main-color hover:bg-main-color-hover text-white rounded-md font-semibold flex items-center justify-center gap-1 transition select-none ${authing ? 'pointer-events-none opacity-75' : ''}`}>
                                {authing ? (
                                    <div className='flex items-center gap-1'>
                                        <RiLoader5Fill className='text-2xl animate-spinLoader' />
                                    </div>
                                ) : (
                                    <div className='flex items-center gap-1'>
                                        <p>Find Account</p>
                                    </div>
                                )}
                            </button>
                        </label>
                        <div className='flex items-center justify-center w-full py-4 gap-1 max-sm:flex-col'>
                            <h1>Remembered your password? </h1>
                            <Link to="/auth/login" className='text-main-color font-medium w-fit flex items-center gap-1 '>Login <MdArrowOutward /></Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword