import { ReactLenis, useLenis } from '@studio-freight/react-lenis';
import React, { useLayoutEffect, useRef } from 'react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import ProjectSection from './components/ProjectSection';
import IntroSection from './components/IntroSection';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Main App component that sets up the application
function App() {
  // Initialize Lenis for smooth scrolling
  const lenis = useLenis(({ scroll }) => ({
    lerp: 0.1, // Linear interpolation for smooth scrolling
  }));

  // Refs for cursor and progress bar elements
  const cursorRef = useRef(null);
  const progressBarRef = useRef(null);
  const progressContainer = useRef(null);

  // Effect to handle cursor animations and scroll progress
  useLayoutEffect(() => {
    const cursor = cursorRef.current;

    // GSAP context for animations
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Fade in the progress container after a delay
      tl.fromTo(progressContainer.current, { opacity: 0 }, { opacity: 1, delay: 4.2 });

      // Function to handle scroll events
      const handleScroll = () => {
        const totalScrollLength = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPosition = window.scrollY || document.documentElement.scrollTop;
        const scrollPercent = (scrollPosition / totalScrollLength) * 100;

        // Update the height of the progress bar based on scroll position
        gsap.to(progressBarRef.current, { height: `${scrollPercent}%`, duration: 0.3, ease: 'power1.out' });
      };

      // Add scroll event listener
      window.addEventListener('scroll', handleScroll);

      // Cleanup function to remove the scroll event listener
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    });

    // Function to handle mouse movement for cursor animation
    const handleMouseMove = (e) => {
      gsap.to(cursor, {
        x: e.clientX - 8, // Adjust cursor position
        y: e.clientY - 8,
        ease: 'circ',
        duration: 1,
      });
    };

    // Function to handle hover effects on cursor
    const handleHover = () => {
      gsap.to(cursor, {
        scale: 2.5, // Scale up cursor on hover
        border: '1px solid white',
        background: 'transparent',
        duration: 0.5,
        ease: 'power3.out',
      });
    };

    // Function to reset cursor on mouse leave
    const handleMouseLeave = () => {
      gsap.to(cursor, {
        scale: 1, // Reset cursor scale
        border: 'none',
        background: 'white',
        duration: 0.5,
        ease: 'power3.out',
      });
    };

    // Add mouse move event listener
    window.addEventListener('mousemove', handleMouseMove);

    // Select all clickable items for hover effects
    const clickableItems = document.querySelectorAll('a, button');
    clickableItems.forEach((item) => {
      item.addEventListener('mouseenter', handleHover);
      item.addEventListener('mouseleave', handleMouseLeave);
    });

    // Cleanup function to remove event listeners
    return () => {
      ctx.revert(); // Revert GSAP context
      window.removeEventListener('mousemove', handleMouseMove);
      clickableItems.forEach((item) => {
        item.removeEventListener('mouseenter', handleHover);
        item.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  // Render the application components
  return (

    <ReactLenis root>

      <div className='relative'>

        {/* Progress container for scroll indicator */}

        <span ref={progressContainer} className='fixed hidden top-1/2 -translate-y-1/2 right-5 h-40 rounded-full overflow-hidden w-1 bg-zinc-700 md:inline-flex justify-start items-start'>

          <span ref={progressBarRef} className='h-0 w-1 top-0 inline-block rounded-full bg-white'></span>

        </span>
        
        {/* Custom cursor element */}
        <span ref={cursorRef} className='md:inline-block hidden bg-white z-20 h-4 w-4 rounded-full fixed top-0 left-0 mix-blend-difference pointer-events-none'></span>
        
        {/* Navigation and main sections */}
        <Nav />

        <Hero />

        <ProjectSection />

        <IntroSection />

      <footer className='absolute bottom-0 left-0 w-full bg-[#131313] text-center'>

        <code className='text-sm pb-1'>
          made with ♥︎  by Vanshaj
        </code>

      </footer>

      </div>


    </ReactLenis>
  );
}

export default App;
