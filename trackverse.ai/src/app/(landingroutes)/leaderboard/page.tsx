"use client";

import React, { useEffect, useState } from "react";
import { motion, progress } from "framer-motion";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { ChevronLeft, ChevronRight, Info, User, Calendar, InfoIcon } from "lucide-react"; // Icons
import { FaUser, FaGithub } from 'react-icons/fa';
import { json } from "stream/consumers";

ChartJS.register(ArcElement, Tooltip, Legend);

const LeaderboardPage = () => {
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [showInfo, setInfo] = useState(false);
  const [progressDetails, setProgressDetails] = useState("");
  const [selectedContributors, setSelectedContributors] = useState<
    { name: string; rollNo: string; contri: string }[] | null
  >(null);
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  

  const [data, setData] = useState([]);
  const [repoTasks, setRepoTasks] = useState([]);

  const formatContribution = (contributionText: string) => {
    // Split by new lines
    const sections = contributionText.split('\n').map(line => line.trim()).filter(line => line !== "");

    // Map through and format each section
    return sections.map((line, index) => {
      // Check for bold section titles
      if (line.startsWith("**")) {
        const title = line.replace(/\*\*/g, ''); // Remove the ** for the title text
        return (
          <p key={index} className="font-semibold text-lg text-white">{title}</p>
        );
      } else {
        // For non-title sections, just return as normal text with some styling
        return (
          <p key={index} className="text-sm text-gray-300 mt-1">
            {line}
          </p>
        );
      }
    });
  };



  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://tbppp.centralindia.cloudapp.azure.com/dataa');
        const data = await res.json();
        setData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call the async function
  }, []);


  useEffect(() => {
    console.log(data);
    const curData = []; // Leaderboard data for all groups
    let i = 1; // Initial rank
    const tasksByRepo = []; // Temporary array to hold tasks grouped by repo

    for (const [repo, group] of Object.entries(data)) {
      // Initialize group details
      const curBro: any  = {
        rank: i,
        projectName: repo,
        contributors: [],
        progress: (group as any).contextBuffer || "",
        contributionData: [],
        lastActive: "2025-01-24", // Default, update dynamically if needed
        tasks: [],
        points: 0,
      };
      i++;

      // Populate contributors
      for (const [member, details] of Object.entries((group as any).members)) {
        curBro.contributors.push({
          name: (details as any).name,
          loc: (details as any).LOC,
          contri: (details as any).summary,
          rollNo: (details as any).roll,
          lastActive: (details as any).lastActive,
        });
        curBro.contributionData.push((details as any).LOC);
      }

      // Handle tasks for this specific repo
      const uniqueTasks:any = [];
      let totalPoints = 0;

      if ((group as any).tasks) {
        (group as any).tasks.forEach((task:any) => {
          // Check if task is already in uniqueTasks
          const isDuplicate = uniqueTasks.some(
            (t:any) => t.task === task.task && t.createdAt === task.createdAt
          );

          if (!isDuplicate) {
            uniqueTasks.push({
              task: task.task,
              createdAt:  new Date(task.createdAt).toLocaleString(),
              points: task.points,
              status: task.status,
            });
          }
          if (!task.status) totalPoints += task.points; // Only add points for incomplete tasks
        });
      }

      // Add unique tasks to the current group and total points
      curBro.tasks = uniqueTasks;
      curBro.points = totalPoints;

      // Push the tasks for this repository into tasksByRepo
      tasksByRepo.push({ repoUrl: repo, tasks: uniqueTasks });

      // Push the completed group object into curData
      curData.push(curBro);
    }

    // Set the leaderboard data and the 2D tasks state
    setLeaderboardData(curData);
    setRepoTasks(tasksByRepo as any);
  }, [data]);

  const [leaderboardData, setLeaderboardData] = useState([
    {
      rank: 1,
      projectName: "AI Chatbot",
      contributors: [
        { name: "Alice Johnson", rollNo: "123", loc: 0, lastActive: "", contri: "" },
        { name: "Bob Smith", rollNo: "124", loc: 0, lastActive: "", contri: "" },
        { name: "Charlie Daniels", rollNo: "125", loc: 0, lastActive: "", contri: "" },
        { name: "David Brown", rollNo: "126", loc: 0, lastActive: "", contri: "" },
      ],
      progress: "The project is currently implementing advanced NLP features and integrating APIs for better performance.",
      contributionData: [13, 51, 23, 13],
      lastActive: "2025-01-24",
    },
  ]);


  const totalRows = leaderboardData.length;
 

  const filteredData = leaderboardData.filter((project) => {
    if (project.projectName.toLowerCase().includes(searchQuery.toLowerCase())) {
      return true;
    }
    if (
      project.contributors.some(
        (contributor) =>
          contributor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          contributor.rollNo.includes(searchQuery)
      )
    ) {
      return true;
    }
    return false;
  });

  const handleProgressClick = (progress: string) => {
    setProgressDetails(progress);
    setShowProgressModal(true);
  };

  function getRepoName(url:any) {
    // Remove trailing slash if it exists
    if (url.endsWith('/')) {
      url = url.slice(0, -1);
    }
    // Split the URL by '/' and return the last part
    return url.split('/').pop();
  }

  const handleprojectinfo = async (repourl: string) => {
    console.log(repourl);
    setInfo(repourl as any);
  }
  const handleGetInfoClick = (project:any) => {
    console.log(project);
    setSelectedContributors(project.contributors);
  };

  const renderPieChart = (data: number[], contributors: { name: string; rollNo: string }[]) => {
    const backgroundColor = [
      "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#FF9F40",
      "#FFCD56", "#7B2CBF", "#F39C12", "#D35400", "#2ECC71"
    ];

    const hoverBackgroundColor = [
      "#FF4D4D", "#2E86C1", "#FFC300", "#26A69A", "#FF7F50",
      "#FFB347", "#8E44AD", "#F57C00", "#E74C3C", "#27AE60"
    ];

    return (
      <div className="w-28 h-28">
        <Pie
          data={{
            labels: contributors.map((contributor) => contributor.name),
            datasets: [
              {
                data,
                backgroundColor, // Use vibrant colors here
                hoverBackgroundColor, // Use hover colors here
                borderWidth: 1,
              },
            ],
          }}
          options={{
            responsive: true,
            cutout: "70%",
            plugins: {
              legend: {
                display: false,
              },
            },
          }}
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen pt-10 p-8 bg-gradient-to-br from-black to-gray-800 text-white">
      {/* Header Section */}
      <motion.div
        className="text-center py-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-6xl font-bold bg-gradient-to-r from-violet-600 to-violet-400 bg-clip-text text-transparent">
          Leaderboard
        </h1>
        <p className="text-gray-400 mt-4 text-lg">
          Explore top projects and contributors on the leaderboard.
        </p>
      </motion.div>

      {/* Filters Section */}
      <div className="px-8 py-6 mb-5 bg-white/10 backdrop-blur-md rounded-xl shadow-lg mx-auto max-w-full flex flex-col lg:flex-row justify-between items-center gap-4">
        <input
          type="text"
          placeholder="Search projects or students..."
          className="w-1/3 p-3 bg-white/10 text-white rounded-lg focus:ring-2 focus:ring-violet-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
        />
        <div className="flex space-x-4">
          <select className="p-3 bg-black text-white rounded-lg border border-white focus:ring-2 focus:ring-violet-500">
            <option>Batch</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
          </select>
          <select className="p-3 bg-black text-white rounded-lg focus:ring-2 border border-white focus:ring-violet-500">
            <option>Section</option>
            <option value="A">A</option>
            <option value="B">B</option>
          </select>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="px-4 py-2 bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-violet-400 rounded-lg shadow-lg text-white"
          >
            Export to CSV
          </motion.button>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="bg-white/10 backdrop-blur-lg rounded-lg shadow-lg overflow-auto">
        <table className="w-full text-left border border-gray-700 overflow-auto">
          <thead className="bg-white/5 text-white border-b border-gray-700">
            <tr>
              <th className="p-4">
                <User className="inline w-5 h-5 mr-2" /> Rank
              </th>
              <th className="p-4">
                <Info className="inline w-5 h-5 mr-2" /> Project Name
              </th>
              <th className="p-4">
                <User className="inline w-5 h-5 mr-2" /> Contributors
              </th>
              <th className="p-4">
                <Info className="inline w-5 h-5 mr-2" /> Get Info
              </th>
              <th className="p-4">Progress</th>
              <th className="p-4">Contribution</th>
              <th className="p-4">
                <Calendar className="inline w-5 h-5 mr-2" /> Last Active
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {filteredData.map((project, index) => (
              <tr key={index} className="hover:bg-white/10 transition">
                <td className="p-4">{project.rank}</td>
                <td className="p-4 font-semibold text-violet-400 uppercase cursor-pointer " ><div className="flex gap-2"><div onClick={() => { window.open(`${project.projectName}`) }}>{project.projectName.split('/')[4]} </div> <InfoIcon onClick={() => handleprojectinfo(project.projectName)} /> </div></td>
                <td className="p-4">
                  {project.contributors.map((contributor, idx) => {
                    const color = [
                      "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#FF9F40",
                      "#FFCD56", "#7B2CBF", "#F39C12", "#D35400", "#2ECC71"
                    ][idx]; // Assign color based on index
                    return (
                      <div
                        key={contributor.rollNo}
                        className="p-2 rounded-lg mb-2"
                        style={{ backgroundColor: color }}
                      >
                        <span className="text-white">{contributor.name}</span> ({contributor.rollNo})
                      </div>
                    );
                  })}
                </td>
                <td className="p-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    onClick={() => handleGetInfoClick(project)}
                    className="px-3 py-1 bg-violet-500 hover:bg-violet-400 rounded-lg text-white"
                  >
                    Get Info
                  </motion.button>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <span>{project.progress.substring(0, 30)}...</span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      onClick={() => handleProgressClick(project.progress)}
                      className="text-violet-400 hover:underline"
                    >
                      Read More
                    </motion.button>
                  </div>
                </td>
                <td className="p-4">
                  {renderPieChart(project.contributionData, project.contributors)}
                </td>
                <td className="p-4">{project.lastActive}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {/* <div className="flex justify-center items-center space-x-4 mt-6">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className={`px-4 py-2 rounded-lg ${currentPage === 1 ? "bg-gray-600 cursor-not-allowed" : "bg-violet-500 hover:bg-violet-400"
            }`}
        >
          <ChevronLeft className="inline w-5 h-5" />
        </button>
        <span className="text-white">
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className={`px-4 py-2 rounded-lg ${currentPage === totalPages ? "bg-gray-600 cursor-not-allowed" : "bg-violet-500 hover:bg-violet-400"
            }`}
        >
          <ChevronRight className="inline w-5 h-5" />
        </button>
      </div> */}

      {/* Modal for Progress Details */}
{showProgressModal && (
  <motion.div
    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-md z-50"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    <div className="bg-[#1A1A1D] rounded-lg shadow-lg p-6 w-full max-w-3xl border border-gray-700">
      <h2 className="text-2xl font-semibold text-gray-100 mb-4 text-center">
        Project Progress
      </h2>
      <div className="bg-[#222] p-4 rounded-lg h-[200px] overflow-auto border border-gray-600">
        <p className="text-lg text-gray-300 leading-relaxed">
          {formatContribution(progressDetails) || "No progress details available."}
        </p>
      </div>
      <div className="flex justify-end mt-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => setShowProgressModal(false)}
          className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md shadow-md text-sm font-medium"
        >
          Close
        </motion.button>
      </div>
    </div>
  </motion.div>
)}

{/* Modal for Contributors */}
{selectedContributors && (
  <motion.div
    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-md z-50"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    <div className="bg-[#1A1A1D] rounded-lg shadow-lg p-6 w-full max-w-5xl border border-gray-700">
      <h2 className="text-2xl font-semibold text-gray-100 mb-6 text-center">
        Contributors Information
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {selectedContributors.map((contributor) => (
          <div
            key={contributor.rollNo}
            className="bg-[#222] p-4 rounded-lg shadow-md border border-gray-600"
          >
            <h3 className="text-lg font-semibold text-gray-200 mb-2">
              {contributor.name}
            </h3>
            <p className="text-sm text-gray-400">
              <strong>Roll No:</strong> {contributor.rollNo}
            </p>
            <p className="text-sm text-gray-400 mt-2">
              <strong>Last Active:</strong> {(contributor as any).lastActive || "N/A"}
            </p>
            <div className="text-sm text-gray-300 mt-3 h-[120px] overflow-auto leading-relaxed">
              <strong>Contribution:</strong>{" "}
              {formatContribution(contributor.contri) ||
                "No contribution details provided yet."}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end mt-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => setSelectedContributors(null)}
          className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md shadow-md text-sm font-medium"
        >
          Close
        </motion.button>
      </div>
    </div>
  </motion.div>
)}

{/* Modal for Project Info */}
{showInfo && (
  <motion.div
    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-md z-50"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    <div className="bg-[#1A1A1D] rounded-lg shadow-lg p-6 w-full max-w-4xl border border-gray-700">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-100 flex items-center justify-center gap-2">
          {`Project Name: ${(showInfo as any).split('/')[4]}`}
          <FaGithub className="text-gray-300" />
        </h2>
      </div>
      <div className="bg-[#222] p-4 rounded-lg mb-6 border border-gray-600">
        <p className="text-sm text-gray-300 leading-relaxed">
          {`This project aims to provide an innovative solution for tracking tasks and progress in the repository: ${(showInfo as any).split('/')[4]}`}
        </p>
      </div>
      <div className="overflow-auto">
        <table className="min-w-full table-auto text-sm bg-[#222] border border-gray-600 rounded-lg">
          <thead>
            <tr className="bg-[#333] text-gray-400">
              <th className="px-4 py-2 text-left">Task</th>
              <th className="px-4 py-2 text-left">Assigned</th>
              <th className="px-4 py-2 text-left">Points</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {repoTasks
              .filter((repo) => (repo as any).repoUrl === showInfo)
              .flatMap((repo) => (repo as any).tasks)
              .map((task, index) => (
                <tr key={index} className="border-b border-gray-600">
                  <td className="px-4 py-2 text-gray-200">{task.task}</td>
                  <td className="px-4 py-2 text-gray-400">{task.createdAt}</td>
                  <td className="px-4 py-2 text-gray-400">{task.points}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-3 py-1 rounded-full text-white text-xs font-medium ${
                        task.status === true
                          ? "bg-green-500"
                          : task.status === false
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    >
                      {task.status ? "Completed" : "Pending"}
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end mt-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => setInfo(false)}
          className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md shadow-md text-sm font-medium"
        >
          Close
        </motion.button>
      </div>
    </div>
  </motion.div>
)}


    </div>
  );
};

export default LeaderboardPage;
