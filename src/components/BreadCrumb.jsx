import React from 'react'
import { Link } from 'react-router-dom'
function BreadCrumb({name ,link ,status}) {
  return (
    <>
        {status === 'on' ? (
            <Link className='py-1 px-[6px] text-xs font-medium hover:bg-stone-100 dark:text-[#b8b8b8]/70 dark:hover:text-[#b8b8b8] dark:hover:bg-[#2c2c2c] rounded-md text-text-color/70 cursor-pointer whitespace-nowrap max-w-[140px] truncate' to={link}>{name}</Link>
        ) : (
            <button className='py-1 px-[6px] text-xs font-medium text-text-color/70 cursor-default whitespace-nowrap dark:text-[#b8b8b8]/70 max-w-[140px] truncate'>{name}</button>
        )}
    </>
  )
}
export default BreadCrumb