import React, { useRef } from 'react'

function Intro() {



  return (
    
    <div className='w-full min-h-[90vh]  max-h-max px-7 flex-col flex my-16 md:mb-32'>

      <div className='md:w-[70%] w-full h-full flex items-end '>

          <h1 className='text-zinc-700 leading-loose para md:leading-snug tracking-wide' id='intro'>

            Hey !  <br />

            I'm&nbsp; 

            <span className='kudry text-white'>Vanshaj</span>&nbsp;,

            I'm&nbsp;twenty&nbsp;<br />

            years&nbsp;old,&nbsp;

            <sub className='text-base md:text-2xl'>(not an ordinary)</sub>

            <span className='kudry text-white'> frontend&nbsp; developer</span>&nbsp;

            &nbsp;based&nbsp;<br /> in&nbsp; 

            <span className='text-white '>Delhi</span>,&nbsp;India.

          </h1>

      </div>


    </div>
  )
}

export default Intro