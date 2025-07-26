"use client";
import acmeLogo from "../assets/images/acme.png";
import quantumLogo from "../assets/images/quantum.png";
import echoLogo from "../assets/images/echo.png";
import celestialLogo from "../assets/images/celestial.png";
import pulseLogo from "../assets/images/pulse.png";
import apexLogo from "../assets/images/apex.png";
import Image from "next/image";
import { motion } from "framer-motion";

const images = [
  { src: acmeLogo, alt: "Acme Logo" },
  { src: quantumLogo, alt: "Quantum Logo" },
  { src: echoLogo, alt: "Echo Logo" },
  { src: celestialLogo, alt: "Celestial Logo" },
  { src: pulseLogo, alt: "Pulse Logo" },
  { src: apexLogo, alt: "Apex Logo" },
];

export const LogoTicker = () => {
  return (
    <div className="sm:bg-[#865AB3] bg-black text-white py-[72px] relative overflow-clip">
      <div className="hidden sm:inline-flex absolute h-[375px] w-[750px] sm:w-[1536px] sm:h-[768px] lg:w-[2400px] lg:h-[1200px] rounded-[100%] bg-black left-1/2 -translate-x-1/2 border-[#B48CDE] radial-gradient-bg top-[calc(-96px)] sm:top-[calc(-120px)]"></div>
      <div className="container">
        <h2 className="text-xl text-center opacity-30">
          Trusted by the world&apos;s most innovative teams
        </h2>
        <div className="flex max-w-[1280px] mx-auto  relative mt-9 overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-5 bg-gradient-to-r from-black to-transparent pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-5 bg-gradient-to-r from-transparent to-black pointer-events-none"></div>
          <motion.div 
          initial={{translateX:0}}
          animate={{translateX:"-50%"}}
          transition={{repeat:Infinity, duration:15, ease:"linear"}}

           className="flex gap-16 pr-16  flex-none items-center justify-center overflow-x-auto">
            {images.map(({ src, alt }, index) => (
              <Image
                key={index}
                src={src}
                alt={alt}
                className="flex-none h-8 w-auto"
              />
            ))}
            {images.map(({ src, alt }, index) => (
              <Image
                key={index}
                src={src}
                alt={alt}
                className="flex-none h-8 w-auto"
              />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
