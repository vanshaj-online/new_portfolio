import { useRef, useEffect, useState } from 'react'
import { projectDetails } from './projectDetails/projects'
import gsap from 'gsap'
import { MdArrowOutward } from "react-icons/md";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

function ProjectSection() {
  const projectRef = useRef([])
  const containerRef = useRef(null)
  const pointerRef = useRef(null)
  const animationRef = useRef(null)
  const [projectName, setprojectName] = useState('')
  useEffect(() => {
    const elements = projectRef.current.filter(Boolean)
    const container = containerRef.current
    const pointer = pointerRef.current
    if (!elements || !container || !pointer) return

    gsap.set(pointer, { opacity: 0, x: 0, y: 0, xPercent: -50, yPercent: -50, scale: 0 })

    

    const handleMouseMove = (e) => {
      const mouseX = e.clientX
      const mouseY = e.clientY
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }

      animationRef.current = requestAnimationFrame(() => {
        gsap.to(pointer, {
          x: mouseX,
          y: mouseY,
          duration: 0.3,
          ease: 'power2.out',
          overwrite: 'auto'
        })
      })
    }

    const handleMouseEnter = (e) => {
      const name = e.currentTarget.dataset.name
      setprojectName(name)

      gsap.to(pointer, { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' })
    }

    const handleMouseLeave = () => {
      gsap.to(pointer, { opacity: 0, scale: 0, duration: 0.3 })
    }

    container.addEventListener('mousemove', handleMouseMove)

    elements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      container.removeEventListener('mousemove', handleMouseMove)
      elements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
      gsap.killTweensOf(pointer)
    }
  }, [])


  return (
    <div ref={containerRef} className='w-full relative lg:h-screen flex flex-wrap lg:flex-nowrap lg:gap-2 items-end gap-2 md:justify-evenly'>
      <span
        className='px-4 py-2 h-max w-max bg-black rounded-full fixed inset-0 z-[9999] pointer-events-none font-semibold flex items-center justify-center capitalize gap-1'
        ref={pointerRef}
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        {projectName}
        <MdArrowOutward />
      </span>
      {projectDetails.slice(0, 4).map((project, index) => (
        <a
          ref={el => projectRef.current[index] = el}
          href={project.link}
          target='_blank'
          data-index={index}
          data-name={project.name}
          className='md:h-3/5 will-change-auto w-full aspect-square md:aspect-auto md:w-[45%]  lg:w-1/4 lg:hover:w-2/5 overflow-hidden flex items-center justify-end transition-all duration-500 '
          key={project.name}
        >
          <picture className='overflow-hidden h-full w-full'>
            <img
              className='h-full w-full object-cover'
              src={`/assets/webpImgs/${project.imgname}.webp`}
              alt={project.name}
            />
          </picture>
        </a>
      ))}
    </div>
  )
}

export default ProjectSection