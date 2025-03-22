import { Suspense, lazy } from 'react';
import { MdEmail } from "react-icons/md";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { GrLinkedinOption, GrGithub, GrDocumentDownload } from "react-icons/gr";
import myPhoto from '/assets/myPhoto.webp';
import Dock from './socialDock';
import ShinyText from './shinyTxt';

const Shaderimg = lazy(() => import('./shaderimg'));

function IntroSection() {

    const icons = ['tailwind', 'react', 'javascript', 'gsap', 'git', 'vscode', 'motion', 'github', 'bolt', 'threejs']

    const socials = [
        {
            label: 'github ', link: 'https://github.com/vanshaj-online',
            icon: <GrGithub className='text-[#f5f5dc] md:text-[2rem]' />,
        },
        {
            label: 'linkedin ', link: 'https://www.linkedin.com/in/vanshaj-singh/',
            icon: <GrLinkedinOption className='text-[#f5f5dc] md:text-[2rem]' />
        },
        {
            label: 'instagram', link: 'https://www.instagram.com/vanshmakesweb/',
            icon: <BiLogoInstagramAlt className='text-[#f5f5dc] md:text-[2rem]' />
        },
        {
            label: 'mail', link: 'mailto:singhvanshaj09@gmail.com',
            icon: <MdEmail className='text-[#f5f5dc] md:text-[2rem]' />
        },
        {
            label: 'resume', link: '/vanshaj_resume.docx',
            icon: <GrDocumentDownload className='text-[#f5f5dc] md:text-[1.5rem]' />
        },
    ];

    return (

        <div className='w-full px-5 mt-20 lg:my-0'>

            <div className='w-full grid grid-cols-1 gap-y-5 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 lg:gap-2.5 lg:grid-rows-5 md:gap-5 xl:gap-5 xl:p-10 grid-container lg:h-screen'>

                <div className='col-span-1 md:col-span-4 lg:col-span-3 lg:row-span-3 xl:col-span-4 row-span-3 border border-white/10 flex items-center justify-center p-3 md:p-6 lg:p-5 h-full w-full voyage text-3xl md:text-5xl xl:text-6xl bg-white/5'>
                    <p className='leading-[1.4] w-full text-center'>Hey, I&apos;m Vanshaj, a twenty year old. Passionate about building beautiful web experiences. based in Delhi, India</p>
                </div>

                <div className='col-span-2 row-span-2 lg:col-span-2 lg:row-span-3 xl:row-span-5 aspect-[3/4] md:aspect-auto h-full overflow-hidden'>

                    <div className='h-full w-full rounded-xl md:rounded-none'>

                        {window.innerWidth >= 1024 ?

                            <div className='relative w-full h-full'>

                                <Suspense fallback={<img src={myPhoto} alt="myPhoto" className='w-full h-full object-cover object-center absolute inset-0 z-[1] pointer-events-none' />}>

                                    <Shaderimg
                                        imageSrc={myPhoto}
                                        grid={10}
                                        mouse={0.1}
                                        strength={0.05}
                                        relaxation={0.9}
                                        className="z-[2]"
                                    />

                                </Suspense>


                            </div> :

                            <img src={myPhoto} className='w-full h-full object-cover' alt="" />

                        }

                    </div>

                </div>

                <div className='col-span-1 md:col-span-2 row-span-2 bg-white/5 border border-white/10 voyage p-6 text-center flex flex-col text-2xl justify-center gap-6'>

                    <p className='mb-3'>Techs i use</p>

                    <div className='h-max w-full flex flex-wrap gap-3 justify-center'>

                        {
                            icons.map((icon, i) => (

                                <span key={i} className=' bg-white/5 w-max rounded-xl p-2.5 grayscale hover:grayscale-0 transition-all duration-300 flex items-center justify-center'>

                                    <img src={`/assets/icons/${icon}.svg`} className={`h-auto w-12 aspect-square ${(icon === 'bolt' || icon === 'threejs' || icon === 'motion') && 'invert'} ${icon === 'javascript' && 'w-10'}`} alt="" />

                                </span>

                            ))

                        }

                    </div>

                </div>

                <div className='col-span-2 md:col-span-4 row-span-2 lg:col-span-3 xl:col-span-2 bg-white/5 border border-white/10 voyage text-2xl text-[#f5f5dc] py-5 md:py-7 space-y-5 md:space-y-8 flex flex-col items-center justify-center'>

                    <div className=' flex flex-col justify-between items-center voyage lg:px-10 text-2xl w-full'>

                        <div className='text-[#f5f5dc]'>socials</div>

                        <Dock items={socials} />

                    </div>

                    <div className='flex items-center justify-center flex-col gap-5 md:gap-7'>

                        <h1 className='md:text-4xl'>Have a project in mind?</h1>

                        <a href="mailto:singhvanshaj09@gmail.com" className='flex items-center justify-center gap-1 px-3.5 py-2 bg-[#111111] border border-white/10 rounded-xl w-max barlow-bold capitalize hover:border-white/40 transition-colors duration-200'>

                            <ShinyText text="Let's talk" disabled={false} speed={1} className='text-base' />

                        </a>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default IntroSection;