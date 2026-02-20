import React, { useState } from "react";
import Navbar from "./components/Navbar";
import About from "./sections/About";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import Home from "./sections/Home";
import Project from "./sections/Project";
import Skill from "./sections/Skill";
import Testimonial from "./sections/Testimonial";
import Experience from "./sections/Experience";
import ParticlesBackground from "./components/ParticlesBackground";
import CustomCursor from "./components/CustomCursor";
import IntroAnimation from "./components/IntroAnimation";

export default function App() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      {!introDone && <IntroAnimation onFinish={() => setIntroDone(true)} />}
      {introDone && (
        <div className="relative bg-black text-white">
          <CustomCursor />
          <Navbar />

          <section id="home" className="relative w-full h-screen">
            <ParticlesBackground className="absolute inset-0 z-0" />
            <div className="relative z-10">
              <Home />
            </div>
          </section>

          <About />
          <Skill />
          <Project />
          <Experience />
          <Testimonial />

          <section id="contact" className="relative w-full min-h-screen">
            <ParticlesBackground className="absolute inset-0 z-0" />
            <div className="relative z-10">
              <Contact />
            </div>
          </section>

          <Footer />
        </div>
      )}
    </>
  );
}