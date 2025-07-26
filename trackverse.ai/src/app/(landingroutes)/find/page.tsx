"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { BsSearch } from "react-icons/bs";
import { BiSort } from "react-icons/bi";

export default function FindDev() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    techStack: "",
    experience: "",
    sortBy: "",
  });

  const developers = [
    {
      name: "Alice Johnson",
      photo: "https://i.imgur.com/mcakTJo.jpeg",
      techStack: ["React", "Node.js", "TypeScript"],
      experience: "2 years",
      contributions: 150,
      repos: 25,
      score: 95,
      github: "https://github.com/alicejohnson",
      linkedin: "https://linkedin.com/in/alicejohnson",
      registeredSince: "2020-06-15",
      summary:
        "Alice is a skilled full-stack developer with expertise in building scalable web apps. Passionate about open-source contributions.",
    },
    {
      name: "Bob Smith",
      photo: "https://i.imgur.com/mcakTJo.jpeg",
      techStack: ["Python", "Django", "Flask"],
      experience: "3 years",
      contributions: 200,
      repos: 30,
      score: 90,
      github: "https://github.com/bsmith",
      linkedin: "https://linkedin.com/in/bsmith",
      registeredSince: "2019-04-20",
      summary:
        "Bob specializes in backend development and cloud integrations. Actively contributes to Python open-source libraries.",
    },
    {
      name: "Charlie Daniels",
      photo: "https://i.imgur.com/mcakTJo.jpeg",
      techStack: ["Java", "Spring Boot", "Kotlin"],
      experience: "4 years",
      contributions: 180,
      repos: 28,
      score: 88,
      github: "https://github.com/cdaniels",
      linkedin: "https://linkedin.com/in/cdaniels",
      registeredSince: "2018-03-10",
      summary:
        "Charlie has a deep understanding of Java ecosystems and enterprise applications, with a passion for microservices.",
    },
    {
      name: "Diana Carter",
      photo: "https://i.imgur.com/mcakTJo.jpeg",
      techStack: ["Vue.js", "Node.js", "GraphQL"],
      experience: "3 years",
      contributions: 120,
      repos: 22,
      score: 85,
      github: "https://github.com/dcarter",
      linkedin: "https://linkedin.com/in/dcarter",
      registeredSince: "2020-01-05",
      summary:
        "Diana is proficient in building intuitive UIs and designing seamless API integrations. Enthusiastic about performance optimization.",
    },
    {
      name: "Ethan Moore",
      photo: "https://i.imgur.com/mcakTJo.jpeg",
      techStack: ["Go", "Docker", "Kubernetes"],
      experience: "5 years",
      contributions: 250,
      repos: 35,
      score: 92,
      github: "https://github.com/emoore",
      linkedin: "https://linkedin.com/in/emoore",
      registeredSince: "2017-08-12",
      summary:
        "Ethan is an experienced DevOps engineer with a knack for automating workflows and managing scalable infrastructures.",
    },
    {
      name: "Fiona Green",
      photo: "https://i.imgur.com/mcakTJo.jpeg",
      techStack: ["Angular", "Node.js", "MySQL"],
      experience: "3 years",
      contributions: 140,
      repos: 27,
      score: 87,
      github: "https://github.com/fgreen",
      linkedin: "https://linkedin.com/in/fgreen",
      registeredSince: "2019-05-23",
      summary:
        "Fiona is a front-end developer with expertise in Angular and data-driven web applications. Enjoys mentoring junior developers.",
    },
    {
      name: "George Kim",
      photo: "https://i.imgur.com/mcakTJo.jpeg",
      techStack: ["C++", "Python", "Machine Learning"],
      experience: "6 years",
      contributions: 300,
      repos: 40,
      score: 94,
      github: "https://github.com/gkim",
      linkedin: "https://linkedin.com/in/gkim",
      registeredSince: "2016-11-14",
      summary:
        "George is a machine learning engineer with a strong background in algorithms and data science. Focuses on cutting-edge AI models.",
    },
    {
      name: "Hannah Lee",
      photo: "https://i.imgur.com/mcakTJo.jpeg",
      techStack: ["Swift", "iOS Development", "Objective-C"],
      experience: "4 years",
      contributions: 220,
      repos: 18,
      score: 91,
      github: "https://github.com/hlee",
      linkedin: "https://linkedin.com/in/hlee",
      registeredSince: "2018-09-07",
      summary:
        "Hannah is an iOS developer with experience in creating polished and user-friendly mobile applications. Passionate about UI/UX.",
    },
    {
      name: "Ian Patel",
      photo: "https://i.imgur.com/mcakTJo.jpeg",
      techStack: ["Ruby", "Rails", "PostgreSQL"],
      experience: "5 years",
      contributions: 190,
      repos: 24,
      score: 89,
      github: "https://github.com/ipatel",
      linkedin: "https://linkedin.com/in/ipatel",
      registeredSince: "2017-02-28",
      summary:
        "Ian is a backend developer specializing in Ruby on Rails and scalable database architectures. Loves simplifying complex workflows.",
    },
    {
      name: "Julia Nguyen",
      photo: "https://i.imgur.com/mcakTJo.jpeg",
      techStack: ["PHP", "Laravel", "JavaScript"],
      experience: "3 years",
      contributions: 170,
      repos: 19,
      score: 86,
      github: "https://github.com/jnguyen",
      linkedin: "https://linkedin.com/in/jnguyen",
      registeredSince: "2020-03-15",
      summary:
        "Julia is a backend developer proficient in PHP and Laravel frameworks. Enjoys working on e-commerce platforms and APIs.",
    },
    {
      name: "Kevin Parker",
      photo: "https://i.imgur.com/mcakTJo.jpeg",
      techStack: ["JavaScript", "React", "Next.js"],
      experience: "2 years",
      contributions: 110,
      repos: 15,
      score: 83,
      github: "https://github.com/kparker",
      linkedin: "https://linkedin.com/in/kparker",
      registeredSince: "2021-05-10",
      summary:
        "Kevin is a passionate front-end developer with expertise in React and Next.js. Focused on creating dynamic and responsive web apps.",
    },
    {
      name: "Laura Simmons",
      photo: "https://i.imgur.com/mcakTJo.jpeg",
      techStack: ["Python", "Flask", "SQLAlchemy"],
      experience: "3 years",
      contributions: 130,
      repos: 20,
      score: 84,
      github: "https://github.com/lsimmons",
      linkedin: "https://linkedin.com/in/lsimmons",
      registeredSince: "2019-07-18",
      summary:
        "Laura is a backend developer with extensive experience in Flask and database management. Enjoys solving complex problems.",
    },
    {
      name: "Mike Taylor",
      photo: "https://i.imgur.com/mcakTJo.jpeg",
      techStack: ["C#", ".NET", "Azure"],
      experience: "6 years",
      contributions: 250,
      repos: 29,
      score: 93,
      github: "https://github.com/mtaylor",
      linkedin: "https://linkedin.com/in/mtaylor",
      registeredSince: "2016-05-22",
      summary:
        "Mike is a seasoned software engineer with expertise in enterprise .NET applications and cloud solutions on Azure.",
    },
    {
      name: "Nina Wright",
      photo: "https://i.imgur.com/mcakTJo.jpeg",
      techStack: ["JavaScript", "Vue.js", "Nuxt.js"],
      experience: "2 years",
      contributions: 95,
      repos: 12,
      score: 82,
      github: "https://github.com/nwright",
      linkedin: "https://linkedin.com/in/nwright",
      registeredSince: "2021-09-04",
      summary:
        "Nina is a front-end developer with a strong focus on building engaging web interfaces using Vue.js and Nuxt.js.",
    },
    {
      name: "Oscar Lopez",
      photo: "https://i.imgur.com/mcakTJo.jpeg",
      techStack: ["Ruby", "Rails", "MongoDB"],
      experience: "4 years",
      contributions: 190,
      repos: 22,
      score: 89,
      github: "https://github.com/olopez",
      linkedin: "https://linkedin.com/in/olopez",
      registeredSince: "2018-04-17",
      summary:
        "Oscar is a backend developer experienced in Rails and NoSQL databases. Loves contributing to open-source tools for developers.",
    },
    {
      name: "Paula King",
      photo: "https://i.imgur.com/mcakTJo.jpeg",
      techStack: ["Java", "Spring", "Hibernate"],
      experience: "5 years",
      contributions: 210,
      repos: 25,
      score: 90,
      github: "https://github.com/pking",
      linkedin: "https://linkedin.com/in/pking",
      registeredSince: "2017-12-03",
      summary:
        "Paula is a backend developer specializing in enterprise-level Java applications. Passionate about design patterns and clean code.",
    },
    {
      name: "Quinn Adams",
      photo: "https://i.imgur.com/mcakTJo.jpeg",
      techStack: ["Python", "FastAPI", "Redis"],
      experience: "3 years",
      contributions: 150,
      repos: 18,
      score: 87,
      github: "https://github.com/qadams",
      linkedin: "https://linkedin.com/in/qadams",
      registeredSince: "2019-10-20",
      summary:
        "Quinn is a Python developer skilled in building fast APIs and caching solutions. Focused on scalable web services.",
    },
    {
      name: "Ryan Hill",
      photo: "https://i.imgur.com/mcakTJo.jpeg",
      techStack: ["C++", "Qt", "Embedded Systems"],
      experience: "6 years",
      contributions: 230,
      repos: 21,
      score: 92,
      github: "https://github.com/rhill",
      linkedin: "https://linkedin.com/in/rhill",
      registeredSince: "2016-01-15",
      summary:
        "Ryan is an embedded systems engineer with experience in C++ and GUI development using Qt. Loves working on IoT projects.",
    },
    {
      name: "Sophie Clark",
      photo: "https://i.imgur.com/mcakTJo.jpeg",
      techStack: ["JavaScript", "React Native", "Redux"],
      experience: "2 years",
      contributions: 105,
      repos: 14,
      score: 84,
      github: "https://github.com/sclark",
      linkedin: "https://linkedin.com/in/sclark",
      registeredSince: "2021-06-09",
      summary:
        "Sophie is a mobile developer focusing on cross-platform apps using React Native. Enjoys improving app performance.",
    },
    {
      name: "Tom Harris",
      photo: "https://i.imgur.com/mcakTJo.jpeg",
      techStack: ["Go", "Kafka", "AWS"],
      experience: "4 years",
      contributions: 185,
      repos: 30,
      score: 91,
      github: "https://github.com/tharris",
      linkedin: "https://linkedin.com/in/tharris",
      registeredSince: "2018-05-18",
      summary:
        "Tom is a backend engineer experienced in distributed systems and real-time data pipelines. Enthusiastic about cloud-native applications.",
    },
  ];
  const filteredDevelopers = developers
    .filter((dev) => {
      const matchesSearch =
        dev.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dev.techStack.some((tech) =>
          tech.toLowerCase().includes(searchTerm.toLowerCase())
        );
      const matchesFilters =
        (!selectedFilters.techStack ||
          dev.techStack.includes(selectedFilters.techStack)) &&
        (!selectedFilters.experience ||
          dev.experience.includes(selectedFilters.experience));
      return matchesSearch && matchesFilters;
    })
    .sort((a, b) => {
      if (selectedFilters.sortBy === "score") return b.score - a.score;
      if (selectedFilters.sortBy === "contributions")
        return b.contributions - a.contributions;
      return 0;
    });

  return (
    <div className="min-h-screen pt-10 p-8 bg-gradient-to-br from-black to-gray-800 text-white">
      {/* Header Section */}
      <motion.div
        className="text-center py-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-6xl font-bold bg-gradient-to-r from-violet-500 to-indigo-600 bg-clip-text text-transparent">
          Find Your Developer
        </h1>
        <p className="text-gray-400 mt-4 text-lg">
          Explore talented developers and connect with them effortlessly.
        </p>
      </motion.div>

      {/* Filter Section */}
      <div className="px-8 py-6 bg-white/10 backdrop-blur-md rounded-xl shadow-lg mx-auto max-w-full flex flex-col lg:flex-row justify-between items-center gap-4">
        {/* Search Bar */}
        <div className="relative w-full lg:w-1/3">
          <BsSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or tech stack..."
            className="w-full bg-black text-white p-3 pl-10 rounded-lg focus:ring-2 focus:ring-violet-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="space-x-2">
          <select
            className="bg-black text-white p-3 rounded-lg focus:ring-2 focus:ring-violet-500"
            onChange={(e) =>
              setSelectedFilters({ ...selectedFilters, techStack: e.target.value })
            }
          >
            <option value="">Tech Stack</option>
            <option value="React">React</option>
            <option value="Python">Python</option>
            <option value="Node.js">Node.js</option>
          </select>
          <select
            className="bg-black text-white p-3 rounded-lg focus:ring-2 focus:ring-violet-500"
            onChange={(e) =>
              setSelectedFilters({
                ...selectedFilters,
                experience: e.target.value,
              })
            }
          >
            <option value="">Experience</option>
            <option value="1 year">1 year</option>
            <option value="2 years">2 years</option>
            <option value="3 years">3 years</option>
          </select>
          <select
            className="bg-black text-white p-3 rounded-lg focus:ring-2 focus:ring-violet-500"
            onChange={(e) =>
              setSelectedFilters({ ...selectedFilters, sortBy: e.target.value })
            }
          >
            <option value="">Sort By</option>
            <option value="score">Best Score</option>
            <option value="contributions">Contributions</option>
          </select>
        </div>
      </div>

      {/* Developers List */}
      <div className="mt-8 px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-full mx-auto">
        {filteredDevelopers.map((dev, index) => (
          <motion.div
            key={index}
            className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-6 hover:shadow-2xl transition"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <img
              src={dev.photo}
              alt={dev.name}
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-bold text-center">{dev.name}</h3>
            <p className="text-center text-gray-400 mt-2">{dev.summary}</p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {dev.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="bg-gradient-to-r from-violet-600 to-indigo-500 text-white text-xs px-3 py-1 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="text-center mt-4">
              <p className="text-sm text-gray-400">
                Repos: {dev.repos} | Contributions: {dev.contributions}
              </p>
              <p className="text-sm text-gray-400">
                Registered Since: {new Date(dev.registeredSince).toDateString()}
              </p>
            </div>
            <div className="flex justify-center gap-4 mt-4">
              <a
                href={dev.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-violet-400"
              >
                <FiGithub size={24} />
              </a>
              <a
                href={dev.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-violet-400"
              >
                <FiLinkedin size={24} />
              </a>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="mt-4 px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-500 hover:from-violet-500 hover:to-indigo-400 rounded-lg w-full text-white"
            >
              Connect
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
