import React, { useRef, useEffect, useLayoutEffect, useState } from 'react'
import { projectDetails } from './projectDetails/projects'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Btn from './btn';
import Button from './button2'


function ProjectSection() {

  const textref = useRef([])

  const wrapper = useRef(null)

  const detsWrapperRef = useRef(null)

  const imgScrollerRef = useRef(null)

  const wrapdiv = useRef([])

  const techRefs = useRef([]);

  const textanim = useRef(null)

  const imgref = useRef([]);

  const animationRef = useRef(null);

  const [progress, setProgress] = useState(0);

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
          delay: 1.5 * index + 0.15,
          ease: '[0.33, 1, 0.68, 1]'
        }, 'a')


      tl.fromTo(techRefs.current[index], { opacity: 0 }, { opacity: 1 });

    });




  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    if (!imgref.current || !wrapper.current || !imgScrollerRef.current || !detsWrapperRef.current) return

    const imgscroller = imgScrollerRef.current

    const detsWrapper = detsWrapperRef.current

    const ctx = gsap.context(() => {

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper.current,
          start: 'top top',
          end: `+=${imgscroller.scrollHeight * 3}px`,
          // markers: true, 
          scrub: 1.5,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          snap: { snapTo: 1 / 4, duration: 0.1 }
        }
      })

      const arr = Array.from(imgref.current)

      const detsArr = Array.from(detsWrapper.children)

      arr.forEach((image, i) => {

        // gsap.fromTo(image, {
        //   y: 50,
        //   opacity: 0,
        // },
        //   {
        //     y: 0,
        //     opacity: 1,
        //     duration: 1,
        //     ease: 'expo.inOut',
        //     scrollTrigger: {
        //       trigger: image,
        //       start: 'top 80%',
        //       end: 'top 30%',
        //       markers: true,
        //       scrub: true
        //     }
        //   }, 0)

        // tl.fromTo(detsArr[i],
        //   {
        //     y: 50, opacity: 0, zIndex: 0
        //   },
        //   {
        //     y: 0, opacity: 1, zIndex: 10,
        //     duration: 1.8,
        //     ease: 'power2.inOut',
        //   },
        // ).to(detsArr[i], {
        //   y: -50,
        //   opacity: 0,
        //   zIndex: 0,
        //   filter: "blur(4px)",
        //   duration: 1.5,
        // });



        tl.fromTo(image,
          {
            clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)'
          },
          {
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            duration: 1.5,
            ease: 'power2.inOut',
          }, i * 1.5
        )

        tl.fromTo(detsArr[i],
          {
            y: 50, opacity: 0, zIndex: 0
          },
          {
            y: 0, opacity: 1, zIndex: 10,
            duration: 1.8,
            ease: 'power2.inOut',
          }, i * 1.5
        )


        if (i !== detsArr.length - 1) {
          tl.to(detsArr[i], {
            y: -50,
            opacity: 0,
            zIndex: 0,
            filter: "blur(4px)",
            duration: 1.5,
          });
        }




      })

    })

    return () => {
      ctx.revert()
    }
  }, [])

  if (windowWidth >= 1024) return (

    <div className='w-full flex flex-col items-center gap-10 my-20 md:gap-36'>


      <div id='projects' ref={wrapper} className='w-full flex h-screen relative'>

        <Button link='/projects' className='absolute bottom-5 left-1/2 -translate-x-1/2 h-max z-10 text-nowrap'>
          see all work
        </Button>

        <div className='w-1/2 relative h-full' ref={imgScrollerRef}>

          {
            projectDetails.slice(0, 4).map((img, i) => {

              return (
                <div key={i} className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  w-full max-w-[500px]' ref={el => imgref.current[i] = el}>

                  <picture className='h-full w-full object-contain' >

                    <source
                      className='h-full w-full object-contain'
                      srcSet={`/assets/webpImgs/${img.imgname}-480w.webp 480w, 
            /assets/webpImgs/${img.imgname}-768w.webp 768w, 
            /assets/webpImgs/${img.imgname}.webp 1200w`}
                      type="image/webp"
                      sizes="(max-width: 480px) 480w, 
            (max-width: 768px) 768w, 
            1200w"
                    />

                    <source
                      className='h-full w-full object-contain'
                      srcSet={`/assets/jpgImgs/${img.imgname}-480w.jpg 480w, 
            /assets/jpgImgs/${img.imgname}-768w.jpg 768w, 
            /assets/jpgImgs/${img.imgname}.jpg 1200w`}
                      type="image/jpeg"
                      sizes="(max-width: 480px) 480w, 
            (max-width: 768px) 768w, 
            1200w"
                    />

                    <img
                      src={`/assets/jpgImgs/${img.imgname}.jpg`}
                      alt={'project thumbnail'}
                      loading="lazy"
                      width="1200"
                      height="auto"
                    />

                  </picture>


                </div>
              )
            })
          }

        </div>

        <div className='w-1/2 h-full relative' ref={detsWrapperRef}>

          {
            projectDetails.slice(0, 4).map((dets, i) => {
              return (
                <div key={i} className='w-full max-w-[450px] space-y-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-'>

                  <a href={dets.link} className='capitalize text-4xl voyage'>{dets.name}</a>

                  <p className='barlow text-lg'>{dets.about}</p>

                  <div className='flex flex-wrap gap-3.5'>
                    {dets.techs.map((techs, index) => (
                      <span key={index} className='py-1 px-2.5 border-2 text-sm tracking-wide capitalize rounded-full border-[#f5f5dc] hover:bg-[#f5f5dc] hover:text-black transition-colors duration-200'>{techs}</span>
                    ))}
                  </div>

                </div>
              )
            })
          }

        </div>




      </div>

    </div>
  )

  return (

    <div id='projects' className='w-full flex flex-col gap-10 px-5'>

      <h1 className='kudry text-3xl'>Projects</h1>

      <div className='flex w-full justify-evenly flex-wrap gap-20 mb-10'>

        {projectDetails.slice(0, 4).map((project, index) => (

          <a href={project.link} key={project.name} target={index === 0 ? '_self' : '_blank'} className='w-full flex-shrink flex-col gap-4 flex items-center'>

            <picture className='max-h-[500px] h-full object-cover object-center w-full overflow-hidden' >

              <source
                className='h-full w-full object-contain'
                srcSet={`/assets/webpImgs/${project.imgname}-480w.webp 480w, 
                      /assets/webpImgs/${project.imgname}-768w.webp 768w, 
                      /assets/webpImgs/${project.imgname}.webp 1200w`}
                type="image/webp"
                sizes="(max-width: 480px) 480w, 
                      (max-width: 768px) 768w, 
                      1200w"
              />

              <source
                className='h-full w-full object-contain'
                srcSet={`/assets/jpgImgs/${project.imgname}-480w.jpg 480w, 
                      /assets/jpgImgs/${project.imgname}-768w.jpg 768w, 
                      /assets/jpgImgs/${project.imgname}.jpg 1200w`}
                type="image/jpeg"
                sizes="(max-width: 480px) 480w, 
                      (max-width: 768px) 768w, 
                      1200w"
              />

              <img
                src={`/assets/jpgImgs/${project.imgname}.jpg`}
                alt={'project thumbnail'}
                loading="lazy"
                width="1200"
                className='object-center w-full h-full object-cover'
                height="auto"
              />

            </picture>

            <span className='voyage capitalize'
              style={{ fontSize: 'clamp(20px, calc(7vw + 0.5rem), 60px)' }}>
              {project.name}
            </span>

          </a>

        ))}

      </div>

      <Btn link='/projects'>
        see all projects
      </Btn>

    </div>

  )
}



export default ProjectSection;
