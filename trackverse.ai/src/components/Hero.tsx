"use client"
import Image from "next/image";
import ArrowIcon from "../assets/icons/arrow-w.svg";
import Meteors from "./magicui/meteors";
import TypingAnimation from "./magicui/typewritter";
import { useEffect, useState } from "react";
import Particles from "./magicui/particles";

export const Hero = () => {
  const  theme  = "dark";
  const [color, setColor] = useState("#ffffff");
 
  useEffect(() => {
    setColor(theme === "dark" ? "#ffffff" : "#000000");
  }, [theme]);
  return (
    <>
      <div className="bg-black custom-gradient text-white py-[72px] sm:py-24 relative overflow-clip">
        <Meteors number={10} />
        <Particles
        className="absolute inset-0"
        quantity={100}
        ease={80}
        color={color}
        refresh
      />
        <div className="absolute h-[375px] w-[750px] sm:w-[1536px] sm:h-[768px] lg:w-[2400px] lg:h-[1200px] rounded-[100%] bg-black left-1/2 -translate-x-1/2 border-[#B48CDE] radial-gradient-bg top-[calc(100%-96px)] sm:top-[calc(100%-120px)]"></div>
        <div className="container mx-auto py-16 relative">
          <div className="flex items-center justify-center">
            <a
              href="#"
              className="inline-flex gap-3 border border-white/30 py-1 px-2 rounded-full"
            >
              <span className=" bg-gradient-to-r from-red-500 to-blue-500 text-transparent bg-clip-text [-webkit-background-clip:text]">
                Discover Our New Features
              </span>
              <span className="inline-flex gap-1 items-center">
                <span>Learn More</span>
                <ArrowIcon />
              </span>
            </a>
          </div>
          <div className="flex justify-center">
            <div className="inline-flex relative">
              <div className="text-4xl sm:text-7xl font-bold mt-8 text-center tracking-tighter pb-4  bg-clip-text gap-2  bg-opacity-0 pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/90  leading-none text-transparent dark:from-white dark:to-gray-100/10">
              Simplify Collaboration, <br/> Amplify Growth <br />
              <div className="text-2xl sm:text-4xl text-white/40 ">Monitor . Analyze . Succeed</div>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="text-xl text-center mt-8 max-w-md">
              <TypingAnimation
                className="text-xl  text-black dark:text-white"
                text="TrackVerse.ai simplifies project monitoring with AI-powered insights, real-time tracking, and developer discovery. Whether you're a mentor, company, or student, manage projects effortlessly and achieve excellence. Start tracking smarter today!"
              />
            </div>
          </div>
          <div className="flex justify-center mt-5">
            <button className="px-5 py-3 bg-white text-black rounded-lg hover:bg-gray-400 font-medium transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
