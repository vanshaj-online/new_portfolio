import React, { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import logo from '/assets/logo.svg'
import { IoClose } from "react-icons/io5";

gsap.registerPlugin(ScrollToPlugin);

function Nav() {

  const [isOpen, setisOpen] = useState(false)

  const [hovering, sethovering] = useState(false)

  const menuRef = useRef()

  const navRef = useRef()

  const links = useRef([])

  const social = useRef()

  const closebtn = useRef()

  const navItems = [
    { nav: 'home', link: '#home' },
    { nav: 'work', link: '#projects' },
    { nav: 'About', link: '#about' }
  ];

  const socials = [
    { nav: 'github ', link: 'https://github.com/vanshaj-online' },
    { nav: 'linkedin ', link: 'https://www.linkedin.com/in/vanshaj-singh/' },
    { nav: 'instagram', link: 'https://www.instagram.com/i_vanshaj/' },
    { nav: 'mail', link: 'mailto:singhvanshaj09@gmail.com' },
  ];



  useLayoutEffect(() => {

    const tl = gsap.timeline()

    tl.fromTo(navRef.current.children,
      { y: '-100%', opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        delay : 4.25,
        ease: 'back.out'
      }
    )

    
  }, [])

  const scrollToSection = (sectionId) => {
    // Close menu and then scroll to section
    gsap.to(menuRef.current, {
      height: 0,
      duration: 0.5,
      ease: 'power3.inOut',
      onComplete: () => {
        setisOpen(false);
        gsap.to(window, {
          scrollTo: { y: document.querySelector(sectionId), offsetY: 50 },
          duration: 1,
          ease: 'power3.inOut',
        });
      },
    });
  };


  useLayoutEffect(() => {

    function openMenu() {

      const tl = gsap.timeline()

      tl.to(menuRef.current, {
        opacity: 1,
        height: '100dvh',
        duration: 0.8,
        ease: 'circ'
      })
        .from(links.current,
          {
            opacity: 0,
            duration: 1,
            ease: 'back.inOut'
          },
          'a'
        )
        .from(closebtn.current,
          {
            opacity: 0,
            duration: 1,
            ease: 'back.inOut'
          },
          'a'
        )

        .from(social.current, {
          opacity: 0,
          duration: 1,
          ease: 'back.out'
        })

    }



    function closeMenu() {

      const closetl = gsap.timeline()

      closetl
        // .fromTo('#a', { opacity : 1 }, { opacity : 0 })


        .to(menuRef.current, {
          duration: 1,
          height: 0,
          ease: 'power4.out'
        })

    }

    

    !isOpen ? closeMenu() : openMenu();


  }, [isOpen])

  return (

    <div ref={navRef} className='w-full  h-16 md:px-7 px-5 bg-color fixed top-0 z-10 para flex items-center justify-between'>

      <div ref={menuRef} className='absolute h-0 z-30 w-full bg-gray-200 overflow-hidden top-0 left-0 flex items-center justify-center  text-white'>

        <button ref={closebtn} className='absolute top-0 right-0 h-16 px-7 cursor-pointer' onClick={() => setisOpen(false)}>

          <IoClose

            color={hovering ? '#52525b' : 'gray'}
            className='transition-colors duration-200'
            size='2rem'
            onMouseEnter={() => sethovering(true)}
            onMouseLeave={() => sethovering(false)}
          />

        </button>

        <div id='a' className='w-full h-full flex items-start justify-start py-10  '>

          <div className=' h-full w-full  items-center flex flex-col justify-around '>

            {navItems.map((item, index) => (

              <div ref={el => links.current[index] = el} key={index} className={`px-7 w-max h-min overflow-hidden `}>

                <span
                  className={`text-gray-400 hover:text-gray-500  transition-all duration-150 leading-none uppercase font-thin titles links voyage text-left flex gap-4 items-end`}>

                  <span className='inline-block para text-3xl text-zinc-600'>0{index + 1}/</span>

                  <a
                    href={item.link} 
                    className='inline-flex hover:line-through gap-4 items-center justify-center'
                    onClick={() => scrollToSection(item.link)}>

                    {item.nav}

                  </a>

                </span>

              </div>

            ))}

          </div>


          <div ref={social} className='h-max overflow-hidden w-max gap-2 flex justify-center items-center p-2 absolute bottom-0  md:left-full md:-translate-x-full left-1/2 -translate-x-1/2'>

            {socials.map((link, index) => (

              <a key={link+index} target='_blank' className='socials text-gray-400 uppercase text-center text-[0.8rem] font-medium hover:text-gray-600 transition-colors duration-300'
                href={link.link}
              >


                  {link.nav}


              </a>
            ))}

          </div>

        </div>


      </div>

      <div className='h-full'>

        <a href="" className='fg-color flex h-full w-16 '>

          <img className='h-16 object-contain w-auto' src={logo} alt="" />

        </a>

      </div>

      <div>

        <span>

          <button className='text-white tracking-tight barlow font-medium capitalize text-lg' onClick={() => setisOpen(true)}>menu</button>

        </span>

      </div>
    </div>
  )
}

export default Nav
