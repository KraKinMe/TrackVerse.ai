"use client";
import React from "react";
import { HoverEffect } from "./ui/card-hover-effect";



export const services = [
  {
    title: "PROJECT TRACKING",
    description:
      "Simplify project monitoring with real-time insights. Track contributions, repository updates, and team progress effortlessly using advanced AI tools and analytics.",
    link: "",
  },
  {
    title: "REPOSITORY ANALYTICS",
    description:
      "Get a full overview of any repository, including contributors, recent commits, bugs, open issues, and the overall structure to streamline evaluations.",
    link: "",
  },
  {
    title: "STUDENT CONTRIBUTION TRACKING",
    description:
      "Track individual student contributions with precision. Identify valid commits, validate features added, and monitor activity levels for improved project evaluation.",
    link: "",
  },
  {
    title: "FIND DEVELOPERS",
    description:
      "Discover top developers based on tech stack, contribution frequency, and scores. Perfect for companies, TNP cells, or teams looking for the best talent.",
    link: "",
  },
  {
    title: "AI-POWERED INSIGHTS",
    description:
      "Leverage AI tools to generate progress summaries, analyze newly added features, and automate alerts for inactive contributors for seamless project management.",
    link: "",
  },
  {
    title: "VISUAL ANALYTICS",
    description:
      "Enhance understanding with clear visualizations like pie charts and contribution graphs, making data-driven decisions easier and faster for mentors and teams.",
    link: "",
  },
];


export const Features = () => {
  return (
    <div className="h-fit bg-black">
        <div className="text-center">
          <h1 className="text-white font-bold sm:text-6xl text-3xl opacity-100">Our Services</h1>
        </div>
        <div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={services} />
    </div>
    </div>
  );
};
