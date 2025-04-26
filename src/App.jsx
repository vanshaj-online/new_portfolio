import React, { useLayoutEffect, useRef, lazy, Suspense, useState } from 'react';
import { ReactLenis, useLenis } from 'lenis/react';
import Nav from './components/Nav';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Routes, Route } from 'react-router';
import Home from './pages/Home';
import Notfound from './pages/notfound';
import Preloader from './components/preloader'
const preloadProjects = () => import('./pages/projects')
const Projects = lazy(preloadProjects);


// Main App component that sets up the application
function App() {

  // Initialize Lenis for smooth scrolling
  const lenis = useLenis();

  // Refs for cursor and progress bar elements
  const cursorRef = useRef(null);
  const progressBarRef = useRef(null);
  const progressContainer = useRef(null);

  // Effect to handle cursor animations and scroll progress
  useLayoutEffect(() => {
    preloadProjects()
    gsap.registerEffect(ScrollTrigger)
    const cursor = cursorRef.current;

    // GSAP context for animations
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Fade in the progress container after a delay
      tl.fromTo(progressContainer.current, { opacity: 0 }, { opacity: 1 });

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

    // Cleanup function to remove event listeners
    return () => ctx.revert()
  }, []);

  // Render the application components
  return (

    <>


      <ReactLenis root>
        <Preloader >

          <div className='relative'>

            {/* Progress container for scroll indicator */}

            <span ref={progressContainer} className='fixed hidden top-1/2 -translate-y-1/2 right-5 h-40 rounded-full overflow-hidden w-1 bg-zinc-700 md:inline-flex justify-start items-start'>

              <span ref={progressBarRef} className='h-0 w-1 top-0 inline-block rounded-full bg-white'></span>

            </span>

            {/* Navigation and main sections */}
            <Nav />

            <Suspense fallback={<div className='h-screen w-full bg-black'></div>}>
              <Routes>
                <Route path="/" index element={<Home />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/*" element={<Notfound />} />
              </Routes>
            </Suspense>

          </div>
        </Preloader>
      </ReactLenis>
    </>
  );
}

export default App;
