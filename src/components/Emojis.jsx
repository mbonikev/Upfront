import React from 'react'

function Emojis() {
    const emojis = [
        '💼', '📈', '📉', '🗂️', '📝',
        '📅', '📊', '💻', '🖥️', '📞',
        '⏰', '🗂️', '🔧', '🔨', '🗃️',
        '🗄️', '📎', '📐', '📌', '📍',
        '🔍', '🧩', '📝', '🗒️', '💡',
        '🏋️', '🤸', '🏃', '🚴', '🥇',
        '🏊', '🚣', '🤼', '🤽', '🧘',
        '🧗', '🏅', '🎯', '💪', '🧗‍♂️',
        '🍎', '🍔', '🍕', '🍣', '🥗',
        '🍰', '🍹', '🍷', '🍺', '🍸',
        '🍜', '🍱', '🌮', '🌯', '🥪',
        '🍳', '🥩', '🍗', '🍖', '🍽️',
        '🎉', '🎊', '🥳', '🎁', '🎂',
        '🍾', '🥂', '🕺', '💃', '🎶',
        '🎤', '🎵', '🎼', '🎧', '🎷',
        '🎺', '🎸', '🎻', '🥁', '🪕',
        '🎺', '🎼', '🎧', '🎤', '🎹',
        '🎻', '🎷', '🎺', '🎸', '🥁',
        '🎉', '🎊', '🎆', '🎇', '🧨'
    ];

    return (
        <div className='absolute top-[110%] left-0 h-fit w-[350px] max-h-[302px] overflow-auto p-2 rounded-lg bg-white shadow-xl ring-1 ring-border-line-color/70 mr-3 grid grid-cols-7'>
            {emojis.map((emoji, index) => (
            <button key={index} className='w-full h-auto aspect-square rounded-md hover:bg-stone-200 text-2xl'>
                {emoji}
            </button>
            ))}
        </div>
    )
}

export default Emojis