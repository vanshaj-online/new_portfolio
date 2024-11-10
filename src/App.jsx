import { ReactLenis, useLenis } from '@studio-freight/react-lenis'
import React, { useLayoutEffect, useRef } from 'react';
import Nav from './components/Nav'
import Hero from './components/Hero'
import ProjectSection from './components/ProjectSection';
import IntroSection from './components/IntroSection';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);


function App() {

  const lenis = useLenis(({ scroll }) => ({
    lerp: 0.1
  }))

  const cursorRef = useRef(null)


  useLayoutEffect(() => {

    const cursor = cursorRef.current


    window.addEventListener('mousemove', (e) => {

      gsap.to(cursor, {
        x: e.clientX - 8,
        y: e.clientY - 8,
        ease: 'circ',
        duration: 1
      });

    })

    // Detect hover on clickable items
    const handleHover = (e) => {
      gsap.to(cursor, {
        scale: 2.5,
        border : '1px solid white',
        background : 'transparent',
        duration: 0.5,
        ease: 'power3.out'
      });
    };

    const handleMouseLeave = (e) => {
      gsap.to(cursor, {
        scale: 1,
        border : 'none',
        background : 'white',
        duration: 0.5,
        ease: 'power3.out'
      });
    };

    // Attach hover effect to clickable items
    const clickableItems = document.querySelectorAll('a, button');
    clickableItems.forEach((item) => {
      item.addEventListener('mouseenter', handleHover);
      item.addEventListener('mouseleave', handleMouseLeave);
    });


    return () => {
      window.removeEventListener('mousemove', (e) => { });
      clickableItems.forEach((item) => {
        item.removeEventListener('mouseenter', handleHover);
        item.removeEventListener('mouseleave', handleMouseLeave);
      });
    }
  }, [])



  return (
    <ReactLenis root>
      <div className='relative'>
        <span ref={cursorRef} className='md:inline-block hidden bg-white z-20 h-4 w-4 rounded-full fixed top-0 left-0 mix-blend-difference pointer-events-none'></span>
        <Nav />
        <Hero />
        <ProjectSection />
        <IntroSection />
      </div>
    </ReactLenis>
  )
}

export default App
