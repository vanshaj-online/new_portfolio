import React, { useEffect, useLayoutEffect, useRef } from 'react'
import Model from './Model'
import gsap from 'gsap'

// Key to track the 3D animation completion
const MODEL_ANIMATION_COMPLETE_KEY = 'model_animation_completed';

function Hero() {
  const text = useRef();
  const tagRef = useRef();
  const modelAnimationCompleted = useRef(false);
  const heroTimeline = useRef(null);

  // Initialize the timeline
  useLayoutEffect(() => {
    heroTimeline.current = gsap.timeline({ paused: true });

    const letters = Array.from(text.current.children);
    const line = tagRef.current.children;

    if (window.innerWidth < 768) return;

    gsap.set([letters, line], { opacity: 0 });

    // Create text animations but don't play them yet
    if (window.innerWidth >= 768 && letters) {
      heroTimeline.current.fromTo(letters,
        { y: '100%', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.03,
          ease: 'back.out'
        }
      )
        .fromTo(line,
          { opacity: 0, y: 50 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'back.out'
          }
        );
    }
  }, []);

  // Listen for the 3D model animation completion event
  useEffect(() => {
    // Function to handle the model animation completion
    const handleModelAnimationComplete = () => {
      modelAnimationCompleted.current = true;

      // Play the text animation
      if (heroTimeline.current) {
        heroTimeline.current.play();
      }
    };

    // Add event listener for custom event
    window.addEventListener('modelAnimationComplete', handleModelAnimationComplete);

    // Check if the model animation has already completed in storage
    const isModelAnimationAlreadyCompleted = sessionStorage.getItem(MODEL_ANIMATION_COMPLETE_KEY);

    if (isModelAnimationAlreadyCompleted === 'true') {
      // If model animation is already done (e.g., on navigation back), play text animation immediately
      modelAnimationCompleted.current = true;

      if (heroTimeline.current) {
        heroTimeline.current.play();
      }
    }

    return () => {
      // Clean up the event listener
      window.removeEventListener('modelAnimationComplete', handleModelAnimationComplete);
    };
  }, []);

  const tagline = 'Turning your ideas into beautiful digital products'
  const name = 'Vanshaj'

  return (
    <>
      <section className='md:h-screen h-min pt-16 md:pt-12 md:px-0 md:py-0 relative w-full flex flex-col items-center justify-center lg:mb-36 mb-20' id='home'>
        <div className='md:w-full md:h-full w-full py-16 md:py-0 flex flex-col justify-center gap-5 md:gap-20 lg:gap-11 items-center relative' >
          {
            (window.innerWidth >= 768) &&
            <div className='w-full h-full absolute' id='canvasContainer'>
              <Model />
            </div>
          }

          <div className='w-full flex items-center justify-center'>
            <h2 id='h2' className='md:hidden uppercase barlow-bold text-5xl -z-10 md-font font-bold'>developer</h2>
          </div>

          <div className='w-full flex items-center justify-center overflow-hidden py-4'>
            <h2 ref={text} className='text-white'>
              {name.split('').map((letter, index) => (
                <span key={index} className='tracking-tighter kudry big-font inline-block leading-none'> {letter} </span>
              ))}
            </h2>
          </div>
        </div>

        <div className='flex md:hidden w-full justify-center mb-10'>
          <a
            href="mailto:singhvanshaj09@gmail.com"
            className='capitalize border border-[#f5f5dc] px-3 py-2 rounded-full barlow-bold leading-none active:bg-[#f5f5dc] active:text-black'
          >
            say hi!
          </a>
        </div>

        <div className='md:w-[90%] md:h-[10%] w-full h-max flex items-center justify-center px-7 md:px-0 md:absolute md:bottom-0 md:py-7'>
          <h1 ref={tagRef} className='text-white barlow uppercase overflow-hidden text-center text-base flex gap-2'>
            <b className='barlow-bold font-semibold text-sm hidden md:flex'>frontend dev</b>
            <p className='text-sm space-x-1 hidden md:flex'>{tagline}</p>
            <p className='text-sm md:hidden'>{'frontend dev ' + tagline}</p>
          </h1>
        </div>
      </section>
    </>
  )
}

export default Hero