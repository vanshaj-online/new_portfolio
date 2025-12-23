import React, { lazy, Suspense, useRef, useEffect } from 'react';
import { ReactLenis, useLenis } from 'lenis/react';
import Nav from './components/Nav';
import { Routes, Route } from 'react-router';
import Home from './pages/Home';
import Notfound from './pages/notfound';
import Preloader from './components/preloader';
const preloadProjects = () => import('./pages/projects');
const Projects = lazy(preloadProjects);

// Optimized round cursor component
function CustomCursor() {
  const cursorRef = useRef(null);
  // store mouse and cursor positions for lerp
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Hide the cursor on touch devices
    const isTouch = "ontouchstart" in window;
    if (isTouch) {
      cursor.style.display = 'none';
      return;
    }

    const setMouse = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    let animationFrame;
    function follow() {
      // Lerp for smooth movement
      pos.current.x += (mouse.current.x - pos.current.x) * 0.18;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.18;
      cursor.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      animationFrame = requestAnimationFrame(follow);
    }

    // Make cursor always above everything else
    cursor.style.pointerEvents = 'none';

    window.addEventListener('mousemove', setMouse);

    // Start animation
    animationFrame = requestAnimationFrame(follow);

    // Hide default
    document.body.style.cursor = 'none';

    return () => {
      window.removeEventListener('mousemove', setMouse);
      cancelAnimationFrame(animationFrame);
      document.body.style.cursor = '';
    };
  }, []);

  // Simple round div as cursor
  return (
    <div
      ref={cursorRef}
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: 16,
        height: 16,
        borderRadius: '50%',
        background: '#f5f5dc',
        pointerEvents: 'none',
        zIndex: 99999,
        transform: 'translate(-50%, -50%)',
        transition: 'background ,border',
        mixBlendMode: 'exclusion'
      }}
      aria-hidden="true"
    />
  );
}

// Main App component that sets up the application
function App() {
  // Initialize Lenis for smooth scrolling
  const lenis = useLenis();

  // Render the application components
  return (
    <>
      <CustomCursor />
      <ReactLenis root>
        <Preloader>
          <div className='relative'>
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
