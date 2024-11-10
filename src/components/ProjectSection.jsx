import React, { useRef, useEffect, useState, useLayoutEffect } from 'react'
import Heading from './Heading'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GoArrowUpRight } from "react-icons/go";
gsap.registerPlugin(ScrollTrigger);
import img1 from '/assets/pr1.png'
import img2 from '/assets/pr2.png'
import img3 from '/assets/pr3.png'
import img4 from '/assets/pr4.png'



function ProjectSection() {

  const textref = useRef([])

  const wrapper = useRef()

  const wrapdiv = useRef([])

  const techRef = useRef();

  const projectImg = [img1, img3, img2, img4]

  const projectDetails = [
    {
      name: 'portfolio',
      link: '#',
      about: 'A creative portfolio built with Three.js and GSAP animations, showcasing interactive 3D elements to highlight, my frontend development skills and design approach.',
      techs: ['Three js', 'React js', 'Tailwind CSS', 'GSAP']
    },
    {
      name: 'Ochi - clone',
      link: 'https://ochiclonesite.netlify.app/',
      about: 'A responsive clone of a popular design site crafted with, React and GSAP replicating advanced UI/UX, patterns and interactions for realistic practice.',
      techs: ['React js', 'Tailwind CSS', 'GSAP']
    },
    {
      name: 'gemini - clone',
      link: 'https://geminibyvanshaj.netlify.app/',
      about: 'Created a clone using React and the Gemini, API implementing dynamic responsive features to, demonstrate API integration and interactive frontend design.',
      techs: ['Javascript', 'Tailwind CSS', 'Gemini API']
    },
    {
      name: 'parcel',
      link: 'https://parcel-ecommerce.netlify.app/',
      about: 'Developed a fully responsive ecommerce frontend, using React and Tailwind CSS designed for an intuitive, user-friendly shopping experience on all devices.',
      techs: ['Javascript', 'CSS']
    },


  ]

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {

    const handleResize = () => {

      setWindowWidth(window.innerWidth);

    };

    window.addEventListener('resize', handleResize);

    return () => {

      window.removeEventListener('resize', handleResize);

    };

  }, [windowWidth]);


  useLayoutEffect(() => {

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
          delay: 0.2
        }, 'a'
      )

      tl.fromTo(wrapdiv.current[index], { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          delay: 0.05 * index + 0.15,
          ease: '[0.33, 1, 0.68, 1]'
        }, 'a')


});




  }, []);



  if (windowWidth >= 768) return (

    <div className='w-full flex flex-col items-center gap-10 my-20 md:gap-36'>

      <Heading heading={'Projects'} />

      <div id='projects' ref={wrapper} className='min-h-[400vh] max-h-max w-full'>

        {projectDetails.map((project, index) => (

          <section key={index} className={`flex w-full items-center px-7 gap-10 h-screen ${index % 2 !== 0 && 'flex-row-reverse'}`}>

            <div className=' flex w-1/2 h-3/5 justify-center items-center  flex-col gap-8'>

              <span className='inline-block min-w-1/2 max-w-max  lg:min-w-1/2 overflow-hidden'>

                <a ref={el => textref.current[index] = el} href={project.link} target={index === 0 ? '' : '_blank'} className='kudry flex items-center justify-center capitalize text-center md-font mix-blend-difference z-[5] gap-2'>{project.name}<GoArrowUpRight color='#F5F5DC' size='2rem' /></a>

              </span>

              <span ref={el => wrapdiv.current[index] = el} className='flex flex-wrap min-w-3/4 max-w-full lg:w-1/2 text-justify barlow text-2xl leading-loose mix-blend-difference  z-[5]'>

                {project.about}

              </span>

              <div ref={techRef} className='flex min-w-3/4 max-w-full lg:w-1/2 gap-2 px-4 bg-black'>
                {
                  project.techs.map((elem, index) => {
                    return (
                      <span className='px-3 text-nowrap py-1 border-2 border-[#F5F5DC] barlow rounded-full hover:bg-[#F5F5DC] hover:text-black hover:font-semibold transition-colors duration-200 text-[#F5F5DC]'>{elem}</span>
                    );
                  })
                }
              </div>

            </div>

            <div className=' flex w-1/2 items-center justify-center '>

              <img src={projectImg[index]} loading='lazy' className='min-w-[250px] h-[35vw] w-3/5 object-cover object-center' alt="" />

            </div>

          </section>

        ))}


      </div>

    </div>
  )

  return (

    <div className='w-full flex md:py-20 flex-col gap-10 md:gap-36 px-5 md:px-7'>

      <Heading heading={'Projects'} />

      <div className='flex w-full md:flex-row justify-evenly flex-wrap md:overflow-hidden md:flex-nowrap gap-10'>

        <div className='w-full  md:w-[60vw]  max-w-[320px] md:max-w-full md:flex-none flex-shrink md:h-[40vw] h-[60vw] max-h-[250px] md:max-h-full rounded-lg bg-gray-200 p-4'>Project 1</div>

        <div className='w-full  md:w-[60vw]  max-w-[320px] md:max-w-full md:flex-none flex-shrink md:h-[40vw] h-[60vw] max-h-[250px] md:max-h-full rounded-lg bg-gray-300 p-4'>Project 2</div>

        <div className='w-full  md:w-[60vw]  max-w-[320px] md:max-w-full md:flex-none flex-shrink md:h-[40vw] h-[60vw] max-h-[250px] md:max-h-full rounded-lg bg-gray-400 p-4'>Project 3</div>

        <div className='w-full  md:w-[60vw]  max-w-[320px] md:max-w-full md:flex-none flex-shrink md:h-[40vw] h-[60vw] max-h-[250px] md:max-h-full rounded-lg bg-gray-500 p-4'>Project 4</div>
      </div>

    </div>

  )
}



export default ProjectSection;
