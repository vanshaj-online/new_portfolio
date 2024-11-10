import { gsap } from 'gsap';


export const createTimeline = (torus, text) => {

        const tl = gsap.timeline();

        // tl.pause();

        if(torus && text){

            tl.fromTo(torus.current.position,

                { 
                    y: -5,
                },

                {
                    y: 0.2, duration: 2, ease: 'circ.out'
                }
            )

            .fromTo(text.current.material,

                {
                    opacity: 0
                },
                
                {
                    opacity: 1,
                    duration: 1,
                });

        }

        return tl;

    
};