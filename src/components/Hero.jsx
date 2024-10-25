import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Robo from './Robo'

function Hero() {

  const textref = useRef()


  // let tl = gsap.timeline()



  return (

    <>
    
      <main className='md:h-screen h-min pt-16 md:pt-12 md:px-0 py-20 md:py-0  w-full  flex flex-col items-center justify-center mb-36'>

        <div className='md:w-[90%] md:h-[90%] w-full  py-16 md:py-0 flex flex-col justify-center gap-5 md:gap-20 lg:gap-11 items-center relative' >

          <div className='w-full h-full  absolute' id='canvasContainer'>

          {/* <Robo /> */}

          </div>

          <div className=' w-full flex items-center justify-center'>

            <h2 id='h2' className='fg-color uppercase barlow-bold text-5xl md-font stroke'>developer</h2>

          </div>

          <div className=' w-full flex items-center justify-center'>

            <h2 className='text-white capitalize kudry text-6xl big-font'>vanshaj</h2>
            
          </div>

        </div>

        <div className='md:w-[90%] md:h-[10%] w-full h-max flex items-center justify-center px-7 md:px-0'>

          <p className='text-white barlow uppercase text-center text-base '>
            
            <b className='barlow-bold text-sm'>frontend dev </b> 
            
            <span className='text-sm '>Turning your ideas into beautiful digital products</span>
            
          </p>

        </div>
      
      </main>
    
    </>
  )
}

export default Hero
