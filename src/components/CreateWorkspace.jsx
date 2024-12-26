import React from 'react'
import { LuX } from 'react-icons/lu'

function CreateWorkspace() {
  return (
    <div className='w-[300px]'>
      <div className='w-full flex items-center justify-between gap-1 p-2 border-b border-stone-200 dark:border-[#474747] text-sm'>
        <h1 className='font-semibold'>Create Workspace</h1>
        <button className='h-[50px] w-[50px] aspect-square flex items-center justify-center'>
          <LuX />
        </button>
      </div>
    </div>
  )
}

export default CreateWorkspace