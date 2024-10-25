import { ReactLenis, useLenis } from '@studio-freight/react-lenis'
import React, { useState } from 'react';
import Nav from './components/Nav'
import Hero from './components/Hero'
import Intro from './components/Intro'
import ProjectSectionMobile from './components/ProjectSectionMobile';
import ProjectSection from './components/ProjectSection';

function App() {

  const lenis = useLenis(({ scroll }) => { })

  return (

    <ReactLenis root>

      <Nav />
      <Hero />
      <ProjectSection />
      <Intro />
    </ReactLenis>
  )
}

export default App
