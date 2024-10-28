
import { gsap } from 'gsap';

export const createTimeline = (torus, text) => {

        const tl = gsap.timeline();

        const startTime = performance.now();

        let delay;

        if(torus && text){

            tl.fromTo(torus.current.position,

                { 
                    y: -5, opacity : 0
                },

                {
                    y: 0.2, opacity : 1, duration: 2, ease: 'circ.out'
                }
            )

            .fromTo(text.current.material,

                {
                    opacity: 0
                },
                
                {
                    opacity: 1,
                    duration: 1,
                    // onComplete: () => {
                    //     const endTime = performance.now(); // End time
                    //     const delay = endTime - startTime;
                    //     console.log(delay / 1000)
                    //   }
                });

        }

        return tl;

    
};