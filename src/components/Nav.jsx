import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import logo from '/assets/logo.svg'

function Nav() {

  const [isOpen, setisOpen] = useState(false)

  const menuRef = useRef()

  const navRef = useRef()



  useEffect(() => {

    const tl = gsap.timeline()

    tl.fromTo(navRef.current.children,
      { y : '-100%', opacity : 0 },
      {
        y : 0,
        opacity : 1,
        duration : 0.7,
        delay : 4.25,
        ease : 'back.out'
      }
    )
    
  }, [])
  

  useEffect(() => {

    function openMenu() {
      gsap.to(menuRef.current, {
        height: '100vh',
        duration: 1.2,
        ease: 'circ'
      });
    }

    function closeMenu() {
      gsap.to(menuRef.current, {
        height: 0,
        duration: 0.5,
        ease: 'circ'
      });
    }

    !isOpen ? closeMenu() : openMenu(); 



  }, [isOpen]) 
  


  return (

    <div ref={navRef} className='w-full  h-16 md:px-7 px-5 bg-color fixed top-0 z-10 para flex items-center justify-between'>

      <div ref={menuRef} className='absolute h-0 z-20 w-full top-16 left-0 flex items-center justify-center bg-black text-white'>

      </div>

        <div className='h-full'>

            <a href="" className='fg-color flex h-full w-16 '>

              <img className='h-16 object-contain w-auto' src={logo} alt="" />  

            </a>

        </div>

        <div>

            <span> 

                <a className='text-white tracking-wider font-medium' href="#" onClick={() => setisOpen(!isOpen)}>{isOpen ? 'Close' : 'Menu'}</a>

            </span>

        </div>
    </div>
  )
}

export default Nav
