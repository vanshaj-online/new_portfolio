import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import logo from '/assets/logo.svg'
import ContactBtn from './ContactBtn';
import { Link, useLocation } from 'react-router';

gsap.registerPlugin(ScrollToPlugin);

function Nav() {

  const location = useLocation()

  const midScreen = 768


  const [isMobile, setisMobile] = useState(window.innerWidth < midScreen);

  const menuRef = useRef(null)

  const navRef = useRef(null)

  const links = useRef([])

  const social = useRef(null)

  const close = useRef(null)
  const menu = useRef(null)
  const btn = useRef(null)

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

  // useLayoutEffect(() => {

  //   const handleResize = () => {
  //     setisMobile(window.innerWidth < midScreen);
  //   };


  //   window.addEventListener('resize', handleResize);


  //   const ctx = gsap.context(() => {
  //     if (window.innerWidth >= midScreen) {

  //       const tl = gsap.timeline()

  //       tl.fromTo(navRef.current,
  //         { y: '-100%', opacity: 0 },
  //         {
  //           y: 0,
  //           opacity: 1,
  //           duration: 0.7,
  //           delay: 4.25,
  //           ease: 'back.out'
  //         }
  //       )

  //     }
  //   })

  //   return () => {
  //     ctx.revert()
  //     window.removeEventListener('resize', handleResize);
  //   };


  // }, [])

  const tl = useRef(gsap.timeline({ paused: true }))

  const scrollToSection = (sectionId) => {
    gsap.to(window, {
      scrollTo: { y: document.querySelector(sectionId), offsetY: 50 },
      duration: 1,
      ease: 'power3.inOut',
      onStart: () => {
        tl.current.timeScale(2).reverse()
      }
    })
  };


  useEffect(() => {

    const ctx = gsap.context(() => {

      gsap.set(menuRef.current, { clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' })

      tl.current.fromTo(menu.current, { y: '0%' }, { y: '100%' }, 0)

      tl.current.fromTo(close.current, { y: '0%' }, { y: '100%' }, 0)

      tl.current.fromTo(menuRef.current, { clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' }, { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' })

      tl.current.fromTo(links.current, { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          ease: 'back.inOut'
        },
        'a'
      )

      tl.current.fromTo(social.current, { opacity: 0 }, {
        opacity: 1,
        duration: 1,
        ease: 'back.out'
      })

    })

    return () => {
      ctx.revert()
    }


  }, [])


  return (

    <div ref={navRef} className='w-full  h-16 md:px-7 px-5 bg-color fixed top-0 z-10 para flex items-center justify-between'>

      <div ref={menuRef} className='absolute h-screen z-30 w-full bg-gray-200 overflow-hidden top-0 left-0 flex items-center justify-center  text-white'>

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

              <a key={link + index} target='_blank' className='socials text-gray-400 uppercase text-center md:text-[0.8rem] text-[0.65rem] font-medium hover:text-gray-600 transition-colors duration-300'
                href={link.link}
              >


                {link.nav}


              </a>
            ))}

          </div>

        </div>


      </div>

      <div className='h-full'>

        <Link to='/' className='fg-color flex h-full w-16 '>

          <img className='h-16 object-contain w-auto' src={logo} alt="" />

        </Link>

      </div>

      <div className='w-auto flex gap-10 items-center'>

        {
          location.pathname === '/projects' &&
          <div className=''>

            <ContactBtn >
              contact me
            </ContactBtn>

          </div>}

        {
          location.pathname !== '/projects' &&
          <button className='text-white z-[99] ' ref={btn}>

            <div className='flex uppercase flex-col overflow-hidden relative items-center justify-center border-red-400'>

              <span className='absolute inline-block top-0 left-0 font-medium barlow z-[99]' ref={menu} onClick={() => {
                tl.current.play()

              }}>menu</span>

              <span className='absolute inline-block -top-full left-0 font-medium text-black barlow z-[99]
            ' ref={close} onClick={() => {
                  tl.current.timeScale(1.2).reverse()
                }}>close</span>

              <span className=' invisible'>close</span>

            </div>

          </button>
        }

      </div>

    </div>
  )
}

export default Nav
