import React from 'react'
import RedirectIfNeeded from '../contexts/RedirectIfNeeded'

function Projects() {
  const handleLogout = () => {
    localStorage.removeItem('upfront_user')
    window.location.reload()
  }
  return (
    <div>
        <RedirectIfNeeded />
        projects
        <button onClick={handleLogout} title='Login with Google' className='w-[200px] h-[40px] ring-1 ring-border-line-color rounded-md font-semibold flex items-center justify-center gap-1 transition hover:opacity-80'>
            Logout
          </button>
    </div>
  )
}

export default Projects