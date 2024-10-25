import React from 'react'
import gsap from "gsap";

function Nav() {
  return (
    <div className='w-full  h-16 md:px-7 px-5 bg-color fixed top-0 z-10 para flex items-center justify-between'>

        <div>

            <a href="" className='text-2xl font-bold fg-color'>logo</a>

        </div>

        <div>

            <span> 

                <a className='text-white tracking-wider font-medium' href="#">Menu</a>

            </span>

        </div>
    </div>
  )
}

export default Nav