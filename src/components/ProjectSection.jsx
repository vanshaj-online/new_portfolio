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

    <div className='w-full flex flex-col gap-10 md:gap-36'>

      <Heading heading={'Projects'} />

      {projectDetails.map((project, index) => (


        <div key={index} className={`flex w-full px-7 gap-10 h-screen ${index % 2 !== 0 && 'flex-row-reverse'}`}>

          <div className=' flex w-1/2 h-3/5 justify-center items-center flex-col gap-8'>

            <h3 className='kudry capitalize min-w-1/2 max-w-3/4 lg:w-1/2 border text-center md-font'>{project.name}</h3>

            <p className='para font-thin min-w-3/4 max-w-full lg:w-1/2 border text-justify leading-loose text-lg tracking-wide'>{project.about}</p>

          </div>

          <div className=' flex w-1/2 h-3/5 items-center justify-center'>

            <div className={`img-${index + 1} img h-full  max-w-[350px] w-full`}></div>

          </div>

        </div>

      ))}

    </div>
  )
}

export default ProjectSection;