import React, { useRef, useEffect, useLayoutEffect } from 'react'
import Heading from './Heading'
import {projectDetails} from './projectDetails/projects'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GoArrowUpRight } from "react-icons/go";
import ContactBtn from './ContactBtn';
gsap.registerPlugin(ScrollTrigger);


function ProjectSection() {

  const textref = useRef([])

  const wrapper = useRef()

  const wrapdiv = useRef([])

  const techRefs = useRef([]);

  const windowWidth = window.innerWidth;

  
  useLayoutEffect(() => {

    textref.current.forEach((text, index) => {

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: text,
          start: "top 70%",
          end: "top 20%"
  
        }
      })
      
      tl.fromTo(text,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "back.out",
          delay: 0.2
        }, 'a'
      )

      tl.fromTo(wrapdiv.current[index], { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          delay: 0.05 * index + 0.15,
          ease: '[0.33, 1, 0.68, 1]'
        }, 'a')


        tl.fromTo(techRefs.current[index], { opacity: 0 }, { opacity: 1 });

    });
      



  }, []);



  if (windowWidth >= 768) return (

    <div className='w-full flex flex-col items-center gap-10 my-20 md:gap-36'>

      <Heading heading={'Projects'} />

      <div id='projects' ref={wrapper} className='w-full'>

        {projectDetails.slice(0,4).map((project, index) => (

          <section key={index} className={`flex w-full items-center px-7 gap-10 h-screen ${index % 2 !== 0 && 'flex-row-reverse'}`}>

            <div className=' flex w-1/2 h-3/5 justify-center items-center  flex-col gap-8 flex-wrap'>

              <span className='inline-block min-w-1/2 max-w-max  lg:min-w-1/2 overflow-hidden'>

                <a ref={el => textref.current[index] = el} href={project.link} target={index === 0 ? '_self' : '_blank'} className='kudry flex items-center justify-center capitalize text-center md-font mix-blend-difference z-[5] gap-2'>{project.name}<GoArrowUpRight color='#F5F5DC' size='2rem' /></a>

              </span>

              <span ref={el => wrapdiv.current[index] = el} className='flex flex-wrap min-w-3/4 max-w-full lg:w-1/2 text-left barlow text-2xl leading-loose mix-blend-difference  z-[5] sm-font'>


                {project.about}

              </span>

              <div ref={el => techRefs.current[index] = el} className='flex w-full lg:w-1/2 gap-2 bg-black flex-wrap'>
                {
                  project.techs.map((elem, index) => {
                    return (
                      <span key={elem+index} className='px-3 text-nowrap py-1 border-2 border-[#F5F5DC] barlow rounded-full hover:bg-[#F5F5DC] hover:text-black hover:font-semibold transition-colors duration-200 text-[#F5F5DC]'>{elem}</span>
                    );
                  })
                }
              </div>

            </div>

            <div className=' flex w-1/2 items-center justify-center '>

              <img src={project.img} loading='lazy' className='min-w-[250px] h-[35vw] w-3/5 object-cover object-center' alt="" />

            </div>

          </section>

        ))}

        <ContactBtn link='/projects'>
          see all projects
        </ContactBtn>


      </div>

    </div>
  )

  return (

    <div id='projects' className='w-full flex flex-col gap-10 px-5'>

      <Heading heading={'Projects'} />

      <div className='flex w-full justify-evenly flex-wrap gap-20 mb-10'>

        {projectDetails.map((project, index) => (

          <a href={project.link} key={project.name} target={index === 0 ? '_self' : '_blank'} className='w-full max-w-[320px] flex-shrink h-[60vw] max-h-[300px] flex-col gap-4 flex items-center'>

            <img src={project.img} alt={`project-${index + 1} thumbnail`} className='w-full max-h-[250px] h-full object-cover object-center rounded-lg' />

            <span className='voyage capitalize'
              style={{ fontSize: 'clamp(20px, calc(7vw + 0.5rem), 60px)' }}>
              {project.name}
            </span>

          </a>

        ))}

      </div>
      
      <ContactBtn link='/projects'>
        see all projects
      </ContactBtn>

    </div>

  )
}



export default ProjectSection;
