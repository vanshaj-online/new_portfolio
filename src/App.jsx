import { useRef, useEffect } from 'react';
import Nav from './components/Nav';
import { Routes, Route } from 'react-router';
import Home from './pages/Home';
import Notfound from './pages/notfound';

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

    // Throttle mouse updates to reduce work
    let rafId = null;
    const setMouse = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      // Only request animation frame if not already pending
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          rafId = null;
        });
      }
    };

    let animationFrame;
    function follow() {
      // Lerp for smooth movement
      pos.current.x += (mouse.current.x - pos.current.x) * 0.18;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.18;
      cursor.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      animationFrame = requestAnimationFrame(follow);
    }


    cursor.style.pointerEvents = 'none';
    cursor.style.willChange = 'transform';

    window.addEventListener('mousemove', setMouse, { passive: true });

    // Start animation
    animationFrame = requestAnimationFrame(follow);


    document.body.style.cursor = 'none';

    return () => {
      window.removeEventListener('mousemove', setMouse);
      cancelAnimationFrame(animationFrame);
      if (rafId) cancelAnimationFrame(rafId);
      document.body.style.cursor = '';
    };
  }, []);


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

function App() {
  return (
    <>
      <CustomCursor />
      <div className='relative'>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/*" element={<Notfound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
