import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
gsap.registerPlugin(ScrollTrigger);


function Heading({heading}) {

  const headingRef = useRef();
  

  useEffect(() => {

    const letters = headingRef.current.children; // Get all child elements (letters)

    if(window.innerWidth >= 768){

      gsap.fromTo(letters, 

        { y: '100%', opacity: 0 }, 
        
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8,
          ease: "back.out", 
          stagger: 0.03,
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 75%",
            markers : true,
          }
        }
      );

    }
    
  }, []);

  return (

    <h1 ref={headingRef} className='kudry  px-0 md:px-7 text-white leading-tight overflow-hidden'>

      {heading.split('').map((letter, index) => (

        <span key={index} className='inline-block titles'>{letter}</span>

      ))}

    </h1>
  )
}

export default Heading
