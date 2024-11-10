import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Heading from './Heading';
import myPhoto from '/assets/myPhoto.jpg';


gsap.registerPlugin(ScrollTrigger);



function IntroSection() {

    const textRef = useRef([])
    const textContainer = useRef()
    const imgref = useRef()

    const text = ["Hey, I'm Vanshaj, a",
        "twenty year old. ",
        "Passionate about building",
        " beautiful frontends. based",
        "in Delhi, India"]

    useLayoutEffect(() => {

        const ctx = gsap.context(() => {

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: textContainer.current,
                    start: 'top 10%',
                    // scrub: true,
                    onEnter: () => tl.play(),
                }
            });

            textRef.current.forEach((elem, index) => {
                tl.from(elem, {
                    opacity: 0,
                    y: '100%',
                    ease: [0.33, 1, 0.68, 1],
                    delay: 0.035 * index + 0.25
                }, 'a')
                tl.to(imgref.current, {
                    opacity : 1,
                    duration: 1,
                    ease: 'power4.inOut',
                    delay : 0.2
                })

            });
        })

        return () => {
            ctx.revert()
        };
    }, [])


    return (
        <div  className='flex justify-center w-full flex-col items-center px-7 my-20 md:my-0 gap-12 md:gap-0'>

            <Heading heading={'About Me?'} />

            <div id='about' ref={textContainer} className='w-full flex flex-col md:flex-row items-center justify-center md:justify-evenly relative gap-12 md:gap-0'>

                <div className='md:h-screen w-max  items-center justify-center flex flex-col'>

                    {text.map((elem, index) => (

                        <div key={index} className='overflow-hidden'>

                            <p ref={el => textRef.current[index] = el} className='voyage links leading-relaxed'
                            style={{fontSize: 'clamp(20px, calc(7vw + 0.5rem), 60px)'}}    >{elem}</p>

                        </div>

                    ))}

                </div>

                <div className='md:h-screen md:w-2/5 w-full  flex items-center justify-center'>

                    <div  className='h-auto w-max flex items-start justify-center overflow-hidden rounded-xl md:rounded-none'>

                        <img loading='lazy' src={myPhoto} ref={imgref} className='md:h-[35vw] h-auto w-full md:w-auto opacity-0 object-cover object-bottom'  alt="" />

                    </div>

                </div>

            </div>


        </div>
    );
}

export default IntroSection;