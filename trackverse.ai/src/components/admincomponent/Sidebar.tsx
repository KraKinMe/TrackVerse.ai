"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IconArrowLeft, IconBrandTabler, IconUserBolt } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/utils/cn";
import { FaUser, FaGithub } from 'react-icons/fa';

import { FaTasks } from 'react-icons/fa';

// Toast component
const Toast = ({ message, type }: { message: string, type: "success" | "error" }) => (
  <div 
    className={`fixed top-5 z-[100] left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-md text-white ${type === 'success' ? 'bg-green-500' : 'bg-red-500'} 
    animate-[flyIn_10ms_ease-in]`}
  >
    {message}
  </div>
);



interface LinkItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

export function AdminSidebar() {
  const [open, setOpen] = useState<boolean>(true); // Sidebar state (open or collapsed)
  const [activeLink, setActiveLink] = useState<string>("Add Group"); // Active link state
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | null }>({ message: "", type: null });

  const links: LinkItem[] = [
    {
      label: "Add Group",
      href: "#",
      icon: <IconBrandTabler className="h-5 w-5" />,
    },
    {
      label: "Add Student",
      href: "#",
      icon: <IconUserBolt className="h-5 w-5" />,
    },
    {
      label: "Add Task",
      href: "#",
      icon: <IconUserBolt className="h-5 w-5" />,
    },
    {
      label: "Logout",
      href: "#",
      icon: <IconArrowLeft className="h-5 w-5" />,
    },
  ];

  // Show toast for 3 seconds
  useEffect(() => {
    if (toast.type) {
      const timer = setTimeout(() => {
        setToast({ message: "", type: null });
      }, 3000);
      return () => clearTimeout(timer); // Cleanup timeout on component unmount
    }
  }, [toast]);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-neutral-900">
      {/* Sidebar */}
      <div
        className={cn(
          "transition-all duration-300 bg-gray-800 dark:bg-neutral-800 text-white flex flex-col",
          open ? "w-64" : "w-16"
        )}
      >
        <div
          className="flex items-center justify-between px-4 py-4 border-b border-gray-700 cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          {open ? <Logo /> : <LogoIcon />}
        </div>
        <div className="flex-1 overflow-y-auto">
          <nav className="flex flex-col mt-6 space-y-2">
            {links.map((link, idx) => (
              <button
                key={idx}
                onClick={() => setActiveLink(link.label)}
                className={cn(
                  "flex items-center gap-4 px-4 py-3 text-sm rounded-md transition-all duration-200",
                  activeLink === link.label
                    ? "bg-gray-700 text-white"
                    : "text-gray-400 hover:bg-gray-700 hover:text-white"
                )}
              >
                <span className="flex-shrink-0">{link.icon}</span>
                {open && <span>{link.label}</span>}
              </button>
            ))}
          </nav>
        </div>
        <div className="flex items-center justify-center p-4 border-t border-gray-700">
          <Link href="#" className="flex items-center gap-2 text-sm">
            <Image
              src="https://i.imgur.com/mcakTJo.jpeg"
              className="h-8 w-8 rounded-full"
              width={32}
              height={32}
              alt="Admin Avatar"
            />
            {open && <span>Admin</span>}
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center bg-gray-100 dark:bg-neutral-900">
        {activeLink === "Add Group" && <AddGroupForm setToast={setToast} />}
        {activeLink === "Add Student" && <AddStudentForm setToast={setToast} />}
        {activeLink === "Add Task" && <AddTaskForm setToast={setToast} />}
        {activeLink === "Logout" && <Logout />}
      </main>

      {toast.type && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}

// Logo for expanded sidebar
const Logo = () => (
  <div className="flex items-center gap-2">
    <div className="h-6 w-6 bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm" />
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="font-medium text-white opacity-10 bg-neutral-900"
    >
      TrackVerse.ai
    </motion.span>
  </div>
);

// Logo icon for collapsed sidebar
const LogoIcon = () => (
  <div className="h-6 w-6 bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm bg-neutral-900" />
);

// Forms and other sections
const formStyles = "w-1/2 h-1/2 p-8 bg-white rounded-lg shadow-md dark:bg-neutral-800";

const AddGroupForm = ({ setToast }: { setToast: React.Dispatch<React.SetStateAction<{ message: string; type: "success" | "error" | null }>> }) => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay
      setToast({ message: "Group added successfully!", type: "success" });
    } catch (error) {
      setToast({ message: "Failed to add group!", type: "error" });
    }
  };

  return (
    <div className={`${formStyles} max-w-lg mx-auto p-6 bg-[#121212] rounded-lg shadow-lg border border-gray-800`}>
  <h2 className="mb-6 text-2xl font-semibold text-gray-100 flex items-center">
    <FaUser className="mr-2 text-xl text-gray-500" /> Add Student
  </h2>
  <form onSubmit={handleSubmit} className="space-y-6">
    
    {/* Name Input */}
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-300 mb-2">
        Name
      </label>
      <div className="relative">
        <input
          type="text"
          placeholder="Enter student name"
          className="w-full px-4 py-3 text-sm rounded-lg border border-gray-700 bg-[#1E1E1E] text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
          <FaUser />
        </span>
      </div>
    </div>

    {/* GitHub URL Input */}
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-300 mb-2">
        GitHub URL
      </label>
      <div className="relative">
        <input
          type="text"
          placeholder="Enter GitHub URL"
          className="w-full px-4 py-3 text-sm rounded-lg border border-gray-700 bg-[#1E1E1E] text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
          <FaGithub />
        </span>
      </div>
    </div>
    
    {/* Submit Button */}
    <div className="flex justify-between items-center">
      <button className="w-full py-3 px-6 text-sm font-medium text-white bg-purple-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
        Submit
      </button>
    </div>
  </form>
</div>

  );
};


const AddStudentForm = ({ setToast }: { setToast: React.Dispatch<React.SetStateAction<{ message: string; type: "success" | "error" | null }>> }) => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay
      setToast({ message: "Student added successfully!", type: "success" });
    } catch (error) {
      setToast({ message: "Failed to add student!", type: "error" });
    }
  };

  return (
    <div className={`${formStyles} max-w-lg mx-auto p-6 bg-[#1A1A1D] rounded-lg shadow-md border border-gray-700`}>
  <h2 className="mb-6 text-2xl font-semibold text-gray-100 flex items-center">
    <FaUser className="mr-2 text-xl text-gray-400" /> Add Student
  </h2>
  <form onSubmit={handleSubmit} className="space-y-6">
    
    {/* Name Input */}
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-300 mb-2">
        Name
      </label>
      <div className="relative">
        <input
          type="text"
          placeholder="Enter student name"
          className="w-full px-4 py-3 text-sm rounded-lg border border-gray-600 bg-[#222] text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <FaUser />
        </span>
      </div>
    </div>

    {/* GitHub URL Input */}
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-300 mb-2">
        GitHub URL
      </label>
      <div className="relative">
        <input
          type="text"
          placeholder="Enter GitHub URL"
          className="w-full px-4 py-3 text-sm rounded-lg border border-gray-600 bg-[#222] text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <FaGithub />
        </span>
      </div>
    </div>
    
    {/* Submit Button */}
    <div className="flex justify-between items-center">
      <button className="w-full py-3 px-6 text-sm font-medium  text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500">
        Submit
      </button>
    </div>
  </form>
</div>

  );
};




const AddTaskForm = ({
  setToast,
}: {
  setToast: React.Dispatch<
    React.SetStateAction<{ message: string; type: "success" | "error" | null }>
  >;
}) => {
  const [projects, setProjects] = useState<any[]>([]); // Stores fetched projects
  const [selectedProject, setSelectedProject] = useState<string | null>(null); // Stores selected project
  const [taskTitle, setTaskTitle] = useState<string>(""); // Stores task title
  const [points, setPoints] = useState<number | "">(""); // Stores points for the task

  // Fetch all projects on component mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("https://tbppp.centralindia.cloudapp.azure.com/projects");
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        const data = await response.json();
        setProjects(data.data); // Set the fetched projects into state
      } catch (error) {
        setToast({ message: "Failed to load projects", type: "error" });
      }
    };

    fetchProjects();
  }, []);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProject) {
      setToast({ message: "Please select a project", type: "error" });
      return;
    }

    if (!taskTitle.trim()) {
      setToast({ message: "Please enter a task title", type: "error" });
      return;
    }

    if (points === "" || points <= 0) {
      setToast({ message: "Please enter valid points", type: "error" });
      return;
    }

    try {
      // Prepare the task data
      const taskData = {
        task: taskTitle,
        project: selectedProject,
        points: points,
      };

      // Send POST request to add the task
      const response = await fetch("https://tbppp.centralindia.cloudapp.azure.com/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        throw new Error("Failed to add task");
      }

      const result = await response.json();

      setToast({ message: result.message || "Task added successfully!", type: "success" });
      setTaskTitle(""); // Reset task title
      setSelectedProject(null); // Reset selected project
      setPoints(""); // Reset points
    } catch (error) {
      setToast({ message: (error as any).message || "Failed to add task", type: "error" });
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-[#1A1A1D] rounded-lg shadow-md border border-gray-700">
  <h2 className="mb-6 text-2xl font-semibold text-gray-100 flex items-center">
    <FaTasks className="mr-2 text-xl text-gray-400" /> Add Task
  </h2>
  <form onSubmit={handleSubmit} className="space-y-6">
    {/* Task Title Input */}
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-300 mb-2">
        Task Title
      </label>
      <input
        type="text"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        placeholder="Enter task title"
        className="w-full px-4 py-3 text-sm rounded-lg border border-gray-600 bg-[#222] text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
    </div>

    {/* Points Input */}
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-300 mb-2">
        Points
      </label>
      <input
        type="number"
        value={points}
        onChange={(e) => setPoints(Number(e.target.value))}
        placeholder="Enter points for the task"
        className="w-full px-4 py-3 text-sm rounded-lg border border-gray-600 bg-[#222] text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
    </div>

    {/* Project Dropdown */}
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-300 mb-2">
        Select Project
      </label>
      <select
        value={selectedProject || ""}
        onChange={(e) => setSelectedProject(e.target.value)}
        className="w-full px-4 py-3 text-sm rounded-lg border border-gray-600 bg-[#222] text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        <option value="">Select a project</option>
        {projects.map((project, index) => (
          <option key={index} value={project}>
            {project}
          </option>
        ))}
      </select>
    </div>

    {/* Submit Button */}
    <div className="flex justify-between items-center">
      <button
        type="submit"
        className="w-full py-3 px-6 text-sm font-medium text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        Submit
      </button>
    </div>
  </form>
</div>

  );
};


const Logout = () => (
  <div className="w-full h-full flex items-center justify-center bg-neutral-800 text-white">
    <p className="text-xl">You have logged out</p>
  </div>
);

