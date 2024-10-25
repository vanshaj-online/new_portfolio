import React from 'react'
import Heading from './Heading'

function ProjectSection() {

  return (

    <div className='w-full flex md:py-20 flex-col gap-10 md:gap-36 px-5 md:px-7'>

      <Heading heading={'Projects'}/>

      <div className='flex w-full md:flex-row justify-evenly flex-wrap md:overflow-hidden md:flex-nowrap gap-10'>

        <div className='w-full  md:w-[60vw]  max-w-[320px] md:max-w-full md:flex-none flex-shrink md:h-[40vw] h-[60vw] max-h-[250px] md:max-h-full rounded-lg bg-gray-200 p-4'>Project 1</div>

        <div className='w-full  md:w-[60vw]  max-w-[320px] md:max-w-full md:flex-none flex-shrink md:h-[40vw] h-[60vw] max-h-[250px] md:max-h-full rounded-lg bg-gray-300 p-4'>Project 2</div>

        <div className='w-full  md:w-[60vw]  max-w-[320px] md:max-w-full md:flex-none flex-shrink md:h-[40vw] h-[60vw] max-h-[250px] md:max-h-full rounded-lg bg-gray-400 p-4'>Project 3</div>

        <div className='w-full  md:w-[60vw]  max-w-[320px] md:max-w-full md:flex-none flex-shrink md:h-[40vw] h-[60vw] max-h-[250px] md:max-h-full rounded-lg bg-gray-500 p-4'>Project 4</div>
      </div>

    </div>

  )
}

export default ProjectSection