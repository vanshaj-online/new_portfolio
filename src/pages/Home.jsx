import React from 'react'
import Hero from '../components/Hero'
import ProjectSection from '../components/ProjectSection'
import IntroSection from '../components/IntroSection'
// import ExperienceSection from '../components/ExperienceSection'

function Home() {
    return (

        <main>
            <Hero />
            {/* <ExperienceSection /> */}
            <ProjectSection />
            <IntroSection />
        </main>
    )
}

export default Home