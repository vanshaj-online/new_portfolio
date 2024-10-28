import { ReactLenis, useLenis } from '@studio-freight/react-lenis'
import React, { useEffect, useState } from 'react';
import Nav from './components/Nav'
import Hero from './components/Hero'
import Intro from './components/Intro'
import ProjectSectionMobile from './components/ProjectSectionMobile';
import ProjectSection from './components/ProjectSection';

function App() {

  const [isScreenSmall, setisScreenSmall] = useState()

  useEffect(() => {

    function HandleResize(){
      window.innerWidth < 768 ? setisScreenSmall(true) : setisScreenSmall(false)
    }
    
      window.addEventListener('resize',HandleResize)

  }, [])
  

  const lenis = useLenis(({ scroll }) => { })

  return (

    <ReactLenis root>

      <Nav />
      <Hero />
      {isScreenSmall ? <ProjectSectionMobile /> : <ProjectSection />}
      <Intro />
    </ReactLenis>
  )
}

export default App
