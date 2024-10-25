import React from 'react'

function Intro() {
  return (
    
    <div className='w-full min-h-[90vh]  max-h-max px-7 flex-col flex md:mb-32'>

      <div className='w-[70%] h-full flex items-end '>

          <h1 className='text-zinc-700 font-res para leading-snug tracking-wide'>

            Hey !  <br />

            I'm&nbsp; 

            <span className='kudry text-white'>Vanshaj</span>&nbsp;,

            I'm&nbsp;twenty&nbsp;<br />

            years&nbsp;old,&nbsp;

            <sub className=''>(not your typical)</sub>

            <span className='kudry text-white'> frontend&nbsp; developer</span>&nbsp;

            &nbsp;based&nbsp;<br /> in&nbsp; 

            <span className='text-white '>Delhi</span>,&nbsp;India.

          </h1>

      </div>


    </div>
  )
}

export default Intro