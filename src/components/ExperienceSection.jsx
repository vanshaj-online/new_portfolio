import { useEffect, useRef } from 'react'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import splitText from './splitText';
gsap.registerPlugin(ScrollTrigger);

function ExperienceSection() {

    const iconsArr = [
        {
            name: 'Vue Js',
            path: '/assets/icons/vue.svg'
        },
        {
            name: 'JavaScript',
            path: '/assets/icons/javascript.svg'
        },
        {
            name: 'TypeScript',
            path: '/assets/icons/ts.svg'
        },
        {
            name: 'APIs',
            path: '/assets/icons/api.png'
        },
    ]

    const sectionRef = useRef(null);
    const cardRef = useRef(null);

    useEffect(() => {

        const section = sectionRef.current;
        const card = cardRef.current;
        if (!section || !card) return;
        
        const ctx = gsap.context(() => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    end: "bottom 60%",
                    toggleActions: "play none none reverse",
                    // Optimize ScrollTrigger performance
                    refreshPriority: -1,
                },
                opacity: 0,
                y: 50,
                duration: 1,
                ease: "power2.out",
            });
        }, section);
        
        return () => {
            ctx.revert();
        };
    }, []);

    return (
        <div ref={sectionRef} className='flex flex-col gap-6 px-4 mt-16 w-full h-screen sm:px-5 md:px-7 sm:gap-8 md:gap-0'>

            {/* Title Section */}
            <div className='flex flex-shrink-0 mt-10'>
                <h1 className='text-5xl font-bold tracking-tighter leading-tight barlow-bold sm:text-6xl md:text-7xl lg:text-8xl xl:text-8xl'>
                    {splitText({ text: "Experience", className: "" })}
                </h1>
            </div>

            {/* Experience Timeline */}
            <div className="flex relative my-auto md:pl-12">


                {/* Experience Card */}
                <div className="relative mb-12 w-full group h-max">

                    <div className='w-px hidden md:inline-block h-full bg-[#f5f5dc60] absolute top-0 -left-12'>
                        <div className='w-3 h-3 rounded-full bg-[#f5f5dc] ring-4 ring-black absolute top-4 -translate-x-1/2'></div>
                    </div>

                    {/* Card */}
                    <div className="w-full border border-[#f5f5dc20] bg-[#f5f5dc05] rounded-lg p-6 sm:p-8 transition-all duration-300 max-w-7xl">
                        {/* Header */}
                        <div className="flex flex-col mb-6">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                <div>
                                    <h3 className="mb-2 text-lg font-medium md:text-2xl md:font-bold">
                                        Frontend Developer Intern
                                    </h3>
                                    <div className="flex gap-2 items-center">
                                        <span className="font-medium opacity-90 sm:text-lg">Spirelia</span>
                                    </div>
                                </div>

                                {/* Date Badge */}
                                <div className="flex items-center gap-2 opacity-80 bg-white/10 py-1.5 px-2.5 md:px-4 md:py-2 rounded-lg w-fit mb-4">
                                    <span className="text-sm font-medium whitespace-nowrap">Sept 2025 - Nov 2025</span>
                                </div>
                            </div>

                            {/* Location */}
                            <div className="flex gap-2 items-center">
                                <span className='sm:text-lg'>India (Remote)</span>
                            </div>
                        </div>

                        {/* Description */}
                        <p className="my-3 max-w-2xl text-sm tracking-wide leading-relaxed opacity-90 sm:text-lg sm:my-8">
                            I worked as a Frontend Developer Intern, building responsive interfaces, optimizing components, improving design consistency, and collaborating with the team to deliver clean, user-friendly UI.
                        </p>

                        {/* Tech Stack */}
                        <div className='flex flex-wrap gap-2 mt-6'>
                            {iconsArr.map((tech, index) => (
                                <div key={index} className='opacity-80 bg-white/10 px-2 py-1.5 rounded-md flex gap-2 items-center justify-center'>
                                    <img src={tech.path} alt={`${tech} icon`} className='h-5' />
                                    <span
                                        key={index}
                                        className='inline-block text-xs tracking-wide sm:text-sm'
                                    >
                                        {tech.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ExperienceSection;