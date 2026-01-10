import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function splitText({ text, className }) {
    const splitTextRef = useRef([]);
    const containerRef = useRef(null);
    
    useEffect(() => {
        const splitTextElements = splitTextRef.current;
        const container = containerRef.current;
        if (splitTextElements.length === 0 || !container) return;
        
        const ctx = gsap.context(() => {
            // Use a single ScrollTrigger for all letters instead of one per letter
            // This significantly reduces scroll event listeners
            gsap.fromTo(splitTextElements, 
                { y: '100%', opacity: 0 }, 
                { 
                    y: '0%', 
                    opacity: 1, 
                    duration: 0.7, 
                    ease: 'power2.out', 
                    stagger: 0.025,
                    scrollTrigger: {
                        trigger: container,
                        start: 'top 80%',
                        end: 'bottom 60%',
                        // Optimize ScrollTrigger performance
                        refreshPriority: -1,
                        // markers: true,
                    }
                }
            );
        }, container);
    
        return () => {
            ctx.revert();
        }
    }, [text])
    
    const letters = text.split('');
    return (
        <div ref={containerRef} className={`${className}`}>
            {letters.map((letter, index) => (
                <span 
                    ref={(element) => splitTextRef.current[index] = element} 
                    key={index} 
                    className="inline-block"
                    style={{ willChange: 'transform, opacity' }}
                >
                    {letter === ' ' ? '\u00A0' : letter}
                </span>
            ))}
        </div>
    )
}

export default splitText