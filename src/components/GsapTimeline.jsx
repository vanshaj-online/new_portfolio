import gsap from 'gsap';

// Key to track the 3D animation completion
const MODEL_ANIMATION_COMPLETE_KEY = 'model_animation_completed';

export const createTimeline = (torus, text, shouldAnimate) => {
    const tl = gsap.timeline({
        paused: false,
        onComplete: () => {
            // Dispatch event when 3D animation completes
            if (shouldAnimate && torus && text) {
              
                // Store completion status in sessionStorage
                sessionStorage.setItem(MODEL_ANIMATION_COMPLETE_KEY, 'true');
                // Dispatch custom event for Hero component to listen to
                window.dispatchEvent(new Event('modelAnimationComplete'));
            }
        },
        force3D: true
    });
    
    if (shouldAnimate && torus.current && text.current) {
        // Animate the torus from below to its final position
        tl.fromTo(
            torus.current.position,
            { y: -5 },
            { 
                y: 0.2, 
                duration: 2, 
                ease: 'circ.out',
                overwrite: 'auto' 
            }
        )
        // Then fade in the text
        .fromTo(
            text.current.material,
            { opacity: 0 },
            { 
                opacity: 1, 
                duration: 1,
                overwrite: 'auto' 
            }
        );

        return tl;
    }
    
    return tl;
};