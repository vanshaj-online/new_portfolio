import React from 'react'
import Hero from '../components/Hero'
import ProjectSection from '../components/ProjectSection'
import IntroSection from '../components/IntroSection'
import Bg from '../components/bg'

function Home() {
    return (

        <main>
            {window.innerWidth >= 768 && <Bg /> }
            <Hero />
            <ProjectSection />
            <IntroSection />
        </main>
    )
}

export default Home