import React from 'react'
import { Link } from 'react-router-dom'
function BreadCrumb({name ,link ,status}) {
  return (
    <>
        {status === 'on' ? (
            <Link className='py-1 px-[6px] text-xs font-medium hover:bg-stone-100 rounded-md text-text-color/70 cursor-pointer whitespace-nowrap' to={link}>{name}</Link>
        ) : (
            <button className='py-1 px-[6px] text-xs font-medium text-text-color/70 cursor-default whitespace-nowrap'>{name}</button>
        )}
    </>
  )
}
export default BreadCrumb