import React from 'react'
import { EmojiArray } from '../content/data'

function Emojis({ change }) {
    

    return (
        <div className='bg-transparent pt-2 absolute top-[100%] left-0 w-[350px] h-fit hidden group-hover:flex mr-3 '>
            <div className='h-full w-full max-h-[400px] overflow-auto p-2 rounded-lg bg-white shadow-xl ring-1 ring-border-line-color/70 grid grid-cols-8 custom-scrollbar'>
                {EmojiArray.map((emoji, index) => (
                    <button key={index} onClick={() => change(emoji.position)} className='w-full h-auto aspect-square rounded-md hover:bg-stone-200 text-2xl'>
                        {emoji.emoji}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default Emojis