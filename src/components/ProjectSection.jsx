import React, { useRef, useEffect } from 'react'
import Heading from './Heading'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);


function ProjectSection() {

  const textref = useRef([])

  const wrapper = useRef()

  const wrapdiv = useRef([])

  const projectDetails = [ 
    {
      name: 'Ochi - clone',
      about: 'Lorem ipsum dolor sit amet, consectetur adipisicing, it in aut necessitatibus magni vero, minima facilis culpa impedit repudiandae, expedita quia! Sed aliquid id, quaerat molestias harum distinctio?'
    },
    {
      name: 'parcel',
      about: 'Lorem ipsum dolor sit amet, consectetur adipisicing, it in aut necessitatibus magni vero, minima facilis culpa impedit repudiandae exercitationem, expedita quia! Sed aliquid id, quaerat molestias harum distinctio?'
    },
    {
      name: 'gemini - clone',
      about: 'Lorem ipsum dolor sit amet, consectetur adipisicing, it in aut necessitatibus magni vero, minima facilis culpa impedit repudiandae exercitationem, expedita quia! Sed aliquid id, quaerat molestias harum distinctio?'
    },
    {
      name: 'portfolio',
      about: 'Lorem ipsum dolor sit amet, consectetur adipisicing, it in aut necessitatibus magni vero, minima facilis culpa impedit repudiandae exercitationem, expedita quia! Sed aliquid id, quaerat molestias harum distinctio?'
    }
  ]

  useEffect(() => {

    
    textref.current.forEach((text, index) => {

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: text,
          start: "top 80%",
          end: "top 20%",
        }
      })

      tl.fromTo(text,
        { y: '100%', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "back.out",
        }, 'a'
      )

      const divs = Array.from(wrapdiv.current[index].children);

      divs.forEach((div, index) => {
        
        tl.fromTo(div.children[0], { y : 100 }, 
          {
          y : 0,
          duration : 0.75,
          // stagger : 0.05,
          delay : 0.05 * index,
          ease : '[0.33, 1, 0.68, 1]'
          // ease : 'power4.out'
        },'a')

      });
    });


    

  }, []);

  return (

    <div className='w-full flex flex-col gap-10 md:gap-36'>

      <Heading heading={'Projects'} />

      <div ref={wrapper} className='h-[400vh] max-h-max w-full'>

        {projectDetails.map((project, index) => (

          <div key={index} className={`flex w-full px-7 gap-10 h-screen ${index % 2 !== 0 && 'flex-row-reverse'}`}>

            <div className=' flex w-1/2 h-3/5 justify-center items-center flex-col gap-8'>

              <span className='inline-block min-w-1/2 max-w-3/4 lg:w-1/2 overflow-hidden'>

                <h3 ref={el => textref.current[index] = el} className='kudry capitalize text-center md-font'>{project.name}</h3>

              </span>

              <span ref={el => wrapdiv.current[index] = el} className='flex flex-wrap min-w-3/4 max-w-full lg:w-1/2'>

                {project.about.split(',').map((lines, index) => (

                  <div key={index} className='overflow-hidden'>

                    <p className='para w-full max-w-full text-justify leading-loose text-lg tracking-wide'>{lines}</p>

                  </div>

                ))}

              </span>

            </div>

            <div className=' flex w-1/2 h-3/5 items-center justify-center'>

              <div className={`img-${index + 1} img h-full  max-w-[350px] w-full`}></div>

            </div>

          </div>

        ))}


      </div>

    </div>
  )
}

export default ProjectSection;
