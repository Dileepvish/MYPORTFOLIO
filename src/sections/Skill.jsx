import { SiHtml5 ,SiBootstrap, SiTailwindcss, SiCss3 , SiJavascript, SiMongodb, SiMui, SiTypescript , SiFastapi } from "react-icons/si";
import { FaReact } from "react-icons/fa";
import { DiNodejsSmall } from "react-icons/di";
import { motion, useMotionValue } from "framer-motion";
import React, { useEffect, useRef } from "react";

export default function Skill(){

  const skills = [
    { icon: <SiCss3 />, name: "Css" },
    { icon: <FaReact />, name: "React" },
    { icon: <SiBootstrap />, name: "Bootstrap" },
    { icon: <SiTypescript />, name: "TypeScript" },
    { icon: <SiTailwindcss />, name: "Tailwind CSS" },
    { icon: <SiFastapi />, name: "FastAPI" },
    { icon: <SiMui />, name: "material ui" },
    { icon: <DiNodejsSmall />, name: "Node.js" },
    { icon: <SiMongodb />, name: "MongoDB" },
    { icon: <SiHtml5 />, name: "Html" },
    { icon: <SiJavascript />, name: "JavaScript"}
  ];

  const repeated = [...skills, ...skills];

  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  const x = useMotionValue(0);

  const dirRef = useRef(1);          // ✅ direction
  const lastScrollY = useRef(0);     // ✅ previous scroll

  /* ===== SCROLL DIRECTION (FIXED) ===== */
  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const onScroll = () => {
      const current = window.scrollY;

      if (current > lastScrollY.current) {
        dirRef.current = 1;    // scroll down → right
      } else if (current < lastScrollY.current) {
        dirRef.current = -1;   // scroll up → left
      }

      lastScrollY.current = current;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ===== INFINITE ANIMATION ===== */
  useEffect(() => {
    let raf;
    let last = performance.now();
    const SPEED = 80;

    const animate = (now) => {
      const dt = (now - last) / 1000;
      last = now;

      let next = x.get() + SPEED * dirRef.current * dt;
      const loop = trackRef.current?.scrollWidth / 2 || 0;

      if (loop) {
        if (next <= -loop) next += loop;
        if (next >= 0) next -= loop;
      }

      x.set(next);
      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [x]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="h-1/2 w-full pb-8 flex flex-col items-center justify-center relative bg-black text-white overflow-hidden"
    >
      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-72 h-72 rounded-full bg-linear-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-20 blur-[120px] animate-pulse"/>
        <div className="absolute bottom-1/4 right-0 w-72 h-72 rounded-full bg-linear-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-20 blur-[120px] animate-pulse delay-500"/>
      </div>

      <motion.h2
        className="text-4xl mt-5 sm:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-r to-[#1cd8d2] via-[#00bf8f] from-[#302b63] z-10"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        My Skills
      </motion.h2>

      <motion.p className="mt-2 mb-8 text-white/90 text-base sm:text-lg z-10">
        Modern Applications | Modern Technologies
      </motion.p>

      <div className="relative w-full overflow-hidden">
        <motion.div
          ref={trackRef}
          className="flex gap-10 text-6xl text-[#1cd8d2]"
          style={{ x, whiteSpace: "nowrap", willChange: "transform" }}
        >
          {repeated.map((s, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-2 min-w-26"
              aria-label={s.name}
              title={s.name}
            >
              <span className="hover:scale-125 transition-transform duration-300">
                {s.icon}
              </span>
              <p className="text-sm">{s.name}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
