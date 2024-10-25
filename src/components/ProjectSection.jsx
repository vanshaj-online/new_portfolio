import React from 'react'
import Heading from './Heading'

function ProjectSection() {

  const projectDetails = [
    {
      name: 'Ochi - clone',
      about: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita optio soluta reiciendis hic perferendis! Distinctio quaerat eum ullam reprehenderit ipsam, dignissimos, voluptates explicabo mollitia inventore doloribus voluptatum laboriosam! Minus, rem.'
    },
    {
      name: 'parcel - ecommerce website',
      about: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita optio soluta reiciendis hic perferendis! Distinctio quaerat eum ullam reprehenderit ipsam, dignissimos, voluptates explicabo mollitia inventore doloribus voluptatum laboriosam! Minus, rem.'
    },
    {
      name: 'gemini - clone',
      about: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita optio soluta reiciendis hic perferendis! Distinctio quaerat eum ullam reprehenderit ipsam, dignissimos, voluptates explicabo mollitia inventore doloribus voluptatum laboriosam! Minus, rem.'
    },
    {
      name: 'portfolio',
      about: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita optio soluta reiciendis hic perferendis! Distinctio quaerat eum ullam reprehenderit ipsam, dignissimos, voluptates explicabo mollitia inventore doloribus voluptatum laboriosam! Minus, rem.'
    }
  ]

  return (

    <div className='w-full flex flex-col gap-10'>

      <Heading heading={'projects'} />

      {projectDetails.map((project, index) => (


        <div className={`flex w-full px-7 gap-10 h-screen ${index % 2 !== 0 && 'flex-row-reverse'}`}>

          <div className=' flex w-1/2 h-3/5 justify-center items-center flex-col gap-8'>

            <h3 className='kudry text-6xl capitalize w-1/2 text-center'>{project.name}</h3>

            <p className='para font-thin w-1/2 text-justify leading-loose text-lg tracking-wide'>{project.about}</p>

          </div>

          <div className=' flex w-1/2 h-3/5 items-center justify-center'>

            <div className={`img-${index + 1} img h-full w-1/2`}></div>

          </div>

        </div>

      ))}

    </div>
  )
}

export default ProjectSection;