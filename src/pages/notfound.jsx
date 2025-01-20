import React from 'react'

function notfound() {
    return (
        <div className='flex items-center justify-center w-full h-screen'>
            <div className='text-white flex flex-col voyage items-center justify-center animate-pulse'>
                <span className='text-9xl kudry '>404</span>
                <span className='text-5xl uppercase'>not found</span>
            </div>
        </div>
    )
}

export default notfound