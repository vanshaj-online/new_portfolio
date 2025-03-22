import { useRef, useEffect } from 'react'
import { projectDetails } from '../components/projectDetails/projects'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GoArrowUpRight } from "react-icons/go";

function projects() {

    const textref = useRef([])

    const wrapper = useRef()

    const wrapdiv = useRef([])

    const techRefs = useRef([]);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {

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

        })

        return () => ctx.revert();

    }, []);

    return (
        <div id='projects' ref={wrapper} className='w-full relative pt-20 lg:pt-0 space-y-4'>

            {projectDetails.map((project, index) => (

                <section key={index} className={`flex w-full items-center flex-col-reverse justify-center lg:flex-row px-7 gap-5 py-20 lg:h-screen ${index % 2 !== 0 && 'flex-row-reverse'}`}>

                    <div className=' flex lg:w-1/2 w-full h-3/5 justify-center items-center flex-col'>

                        <div className='lg:w-3/4 w-full flex items- justify-center flex-col'>
                            <span className='inline-flex overflow-hidden w-full items-end  space-y-3 space-x-5 mb-8'>

                                <p className='kudry text-white/50 py-1'>{`(00${index + 1})`}</p>

                                <a ref={el => textref.current[index] = el} href={project.link} target={index === 0 ? '_self' : '_blank'} className='voyage hover:text-white transition-colors duration-300 w-max flex items-center justify-center capitalize text-left lg:text-center md-font mix-blend-difference z-[5] gap-2 text-2xl text-nowrap'>{project.name}<GoArrowUpRight color='#F5F5DC' size='2rem' /></a>

                            </span>

                            <div ref={el => wrapdiv.current[index] = el} className='flex flex-wrap max-w-full lg:min-w-[50%] barlow lg:text-xl text-lg leading-[1.5]  mix-blend-difference z-[5] sm-font mb-5'>

                                <p className='w-max'>
                                    {project.about}
                                </p>

                            </div>

                            <div ref={el => techRefs.current[index] = el} className='flex w-full gap-2 bg-black flex-wrap '>
                                {
                                    project.techs.map((elem, index) => {
                                        return (
                                            <span key={elem + index} className='px-3 text-nowrap py-1 border-2 border-[#F5F5DC] barlow rounded-full hover:bg-[#F5F5DC] hover:text-black font-semibold transition-colors text-[12px] sm:text-base duration-200 text-[#F5F5DC]'>{elem}</span>
                                        );
                                    })
                                }
                            </div>
                        </div>

                    </div>

                    <div className=' flex lg:w-1/2 w-full items-center justify-center lg:px-16'>

                        <picture className='h-full w-full object-contain max-w-[500px]'  >

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

                    </div>

                </section>

            ))}

        </div>
    )
}

export default projects