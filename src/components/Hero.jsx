import React, { useEffect, useRef } from 'react'
import Model from './Model'
import { createTimeline } from './GsapTimeline';




function Hero() {

  const text = useRef()

  const tagRef = useRef()

  useEffect(() => {

    const letters = text.current.children;

    const line = tagRef.current.children
    
    const tl = createTimeline()
    
    if (window.innerWidth >= 768){

      tl.fromTo(letters, { y : '100%', opacity : 0},
        {
          y : 0,
          opacity : 1,
          duration : 1,
          stagger : 0.03,
          delay : 3.1,
          ease : 'back.out'
        }
      )
      .fromTo(line, { opacity : 0, y : 50 },
        {
          y : 0,
          opacity : 1,
          duration : 0.7,
          ease : 'back.out'
        }
      )

    }
    
    
  }, [])
  
  const tagline = 'Turning your ideas into beautiful digital products'

  const name = 'Vanshaj'
  



  return (

    <>

      <main className='md:h-screen h-min pt-16 md:pt-12 md:px-0 md:py-0  w-full  flex flex-col items-center justify-center mb-36'>

        <div className='md:w-[90%] md:h-[90%] w-full  py-16 md:py-0 flex flex-col justify-center gap-5 md:gap-20 lg:gap-11 items-center relative' >

          {window.innerWidth >= 768 && <div className='w-full h-full  absolute' id='canvasContainer'>

            <Model />

          </div>}

          <div className=' w-full flex items-center justify-center'>

            <h2 id='h2' className='fg-color uppercase barlow-bold text-5xl -z-10 md-font stroke'>developer</h2>

          </div>

          <div className=' w-full flex items-center justify-center overflow-hidden py-4'>

            <h2 ref={text} className='text-white'>

              {name.split('').map((letter, index) => (

                  <span key={index} className='tracking-tighter kudry big-font inline-block text-6xl leading-none'> {letter} </span>

              ))}

            </h2>

          </div>

        </div>

        <div className='md:w-[90%] md:h-[10%] w-full h-max flex items-center justify-center px-7 md:px-0'>

          <h1 ref={tagRef} className='text-white barlow uppercase overflow-hidden text-center text-base flex gap-2'>

            <b className='barlow-bold text-sm hidden md:flex'>frontend dev </b>

            <p  className='text-sm space-x-1 hidden md:flex'> { tagline }</p>

            <p className='text-sm md:hidden'>{'frontend dev ' + tagline}</p>

          </h1>

        </div>

      </main>

    </>
  )
}

export default Hero
