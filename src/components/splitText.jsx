import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'

function splitText({ text, className }) {
    const splitTextRef = useRef([]);
    useEffect(() => {
        const splitTextElements = splitTextRef.current;
        if (splitTextElements.length === 0) return;
        const ctx = gsap.context(() => {
    
            gsap.fromTo(splitTextElements, 
                { y: '100%', opacity: 0 }, 
                { 
                    y: '0%', 
                    opacity: 1, 
                    duration: 0.7, 
                    ease: 'power2.out', 
                    stagger: 0.025,
                    scrollTrigger: {
                        trigger: splitTextElements[0],
                        start: 'top 80%',
                        end: 'bottom 60%',
                        // markers: true,
                    }
                }
            );
    
        })
    
        return () => {
            ctx.revert();
        }
    }, [])
    const letters = text.split('');
    return (
        <div className={`${className}`}>
            {letters.map((letter, index) => (
                <span ref={(element) => splitTextRef.current[index] = element} key={index} className="inline-block">
                    {letter === ' ' ? '\u00A0' : letter}
                </span>
            ))}
        </div>
    )
}

export default splitText