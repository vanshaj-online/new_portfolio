import Btn from './CTAButton'
function Hero() {

  return (
    <main className="min-h-screen w-full relative">
      <div className="noise-overlay absolute inset-0 pointer-events-none z-0"></div>
      <div className="h-screen w-full flex flex-col items-center justify-center relative z-10 text-4xl sm:text-5xl md:text-7xl lg:text-8xl px-4">
        <h1 className="barlow-bold font-bold text-center break-words w-full text-5xl sm:text-6xl md:text-7xl lg:text-8xl">I BUILD</h1>
        <h1
          className="cursiveFont text-[#debb6a] text-center w-full mt-1 text-4xl md:text-6xl lg:text-8xl"
          style={{
            letterSpacing: '-0.02em'
          }}
        >
          Fast and Modern
        </h1>
        <h1 className="barlow-bold font-bold tracking-tight mb-6 text-center w-full text-5xl md:text-7xl lg:text-8xl">WEBSITES</h1>
        <p className="barlow-bold font-medium text-sm sm:text-base md:text-lg opacity-80 mt-2 text-center">I help startups, creators, and small businesses turn ideas into high-quality websites.</p>
        <span className="mt-6">
          <Btn className="w-full sm:w-auto text-base">Let’s work together</Btn>
        </span>
      </div>
    </main>
  )
}

export default Hero;