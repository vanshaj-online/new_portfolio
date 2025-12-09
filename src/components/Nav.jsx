import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import logo from '/assets/logo.svg'
import { Link, useLocation } from 'react-router';


function Nav() {

  const location = useLocation().pathname

  const navRef = useRef(null)

  return (

    <div ref={navRef} className='w-full  h-16 md:px-7 px-5 bg-color fixed top-0 z-10 para flex items-center justify-between'>

      <div className='h-full'>

        <a href='' className='fg-color flex h-full w-16 '>

          <img className='h-16 object-contain w-auto' src={logo} alt="" />

        </a>

      </div>

      <div className=''>

        {
          location === '/projects' ?

          <Link to='/' className='capitalize font-["Oooh_baby"] text-lg'>
            home
          </Link>
          :
          <code>
          <span className='opacity-45 tracking-tighter'>{new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })}</span>
          </code>

        }

      </div>

    </div>
  )
}

export default Nav
