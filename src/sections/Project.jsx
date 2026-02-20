import { useEffect, useMemo, useState, useRef } from "react";
import img1 from "../assets/img1.JPG";
import img2 from "../assets/img2.JPG";
import img3 from "../assets/img3.JPG";
import photo1 from "../assets/photo1.JPG";
import photo2 from "../assets/photo2.JPG";
import photo3 from "../assets/photo3.JPG";
import {
  motion,
  AnimatePresence,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";

const useIsMobile = (query = "(max-width: 639px)") => {
  const getMatches = () => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  };

  const [isMobile, setIsMobile] = useState(getMatches);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mql = window.matchMedia(query);
    const handler = (e) => setIsMobile(e.matches);

    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [query]);

  return isMobile;
};

export default function Projects() {
  const isMobile = useIsMobile();
  const sceneRef = useRef(null);

  const projects = useMemo(
    () => [
      {
        title: "Helth-chek",
        link: "https://helth-chek.onrender.com",
        bgColor: "#0d4d3d",
        image: isMobile ? img1 : photo1,
      },
      {
        title: "Fusionshops",
        link: "https://fusionshops.onrender.com",
        bgColor: "#3884d3",
        image: isMobile ? img2 : photo2,
      },
      {
        title: "Request-response-template",
        link: "https://request-response-template.onrender.com",
        bgColor: "#dc9317",
        image: isMobile ? img3 : photo3,
      },
    ],
    [isMobile]
  );

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });

  const thresholds = projects.map((_, i) => (i + 1) / projects.length);
  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = thresholds.findIndex((t) => v <= t);
    setActiveIndex(idx === -1 ? thresholds.length - 1 : idx);
  });

  const activeProject = projects[activeIndex];

  return (
    <section
      id="projects"
      ref={sceneRef}
      className="relative text-white"
      style={{
        height: `${100 * projects.length}vh`,
        backgroundColor: activeProject.bgColor,
        transition: "background-color 400ms ease",
      }}
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center">
        <h2
          className={`text-3xl font-semibold z-10 text-center ${
            isMobile ? "mt-4" : "mt-8"
          }`}
        >
          My Work
        </h2>

        <div
          className={`relative w-full flex-1 flex items-center justify-center ${
            isMobile ? "-mt-4" : ""
          }`}
        >
          {projects.map((project, idx) => (
            <div
              key={project.title}
              className={`absolute top-1/2 left-1/2 
              -translate-x-1/2 -translate-y-1/2
              transition-all duration-500 ${
                activeIndex === idx
                  ? "opacity-100 z-20"
                  : "opacity-0 z-0 sm:z-10"
              }`}
              style={{ width: "85%", maxWidth: "1200px" }}
            >
              <AnimatePresence mode="wait">
                {activeIndex === idx && (
                  <motion.h3
                    key={project.title}
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className={`block text-center text-[clamp(2rem,6vw,5rem)] 
                    text-white/95 sm:absolute sm:-top-20 sm:left-[35%] lg:left-[-5%] sm:mb-0 italic font-semibold ${
                      isMobile ? "-mt-24" : ""
                    }`}
                    style={{
                      zIndex: 5,
                      textAlign: isMobile ? "center" : "left",
                    }}
                  >
                    {project.title}
                  </motion.h3>
                )}
              </AnimatePresence>

              <div
                className={`relative w-full bg-black/20 rounded-xl ${
                  isMobile ? "mb-6 rounded-lg" : "mb-10 sm:mb-12 rounded-xl"
                } h-[55vh] sm:h-[65vh] lg:h-[70vh]`}
                style={{
                  zIndex: 10,
                  boxShadow: "0 30px 70px rgba(0,0,0,0.55)",
                  transition: "box-shadow 250ms ease",
                }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover drop-shadow-xl rounded-2xl"
                  
                   style={{
                     imageRendering: "auto",
                    }}
                    loading="lazy"
                />
                <div className="pointer-events-none absolute inset-0"
                style={{
                  zIndex: 11,
                  background: "liner-gradient(180deg , rgba(0,0,0,0.12)) 0% , rgba(0,0,0,0) 40%"
                }}
                >

                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={`absolute w-full flex justify-center ${
          isMobile ? "bottom-20" : "bottom-10"
          }`} 
          style={{ zIndex: 30 }}>
            <a
            href={activeProject?.link}
            target="_blank"
            className="px-6 py-2 bg-white/20 hover:bg-white/40 rounded-md transition-colors text-white"
            aria-label={`View ${activeProject?.title}`}
            >
              View Project
              </a></div>


      </div>
    </section>
  );
}
