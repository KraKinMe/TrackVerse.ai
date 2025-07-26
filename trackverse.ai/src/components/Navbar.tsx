"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/images/logosaas.png";
import Link from "next/link";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="fixed top-0 w-full bg-transparent backdrop-blur z-50 border-b border-slate-900">
      <div className="px-4">
        <div className="py-4 flex items-center justify-between">
          <Link href="/" className="flex justify-center items-center">
            <Image src={logo} alt="logo" className="h-12 w-12 relative" />
            <div className="text-white text-xl font-semibold">TrackVerse.ai</div>
          </Link>
          <div
            className="h-10 w-10 inline-flex justify-center items-center cursor-pointer border border-white border-opacity-30 rounded-md sm:hidden"
            onClick={toggleMenu}
          >
            {menuOpen ? (
              <FaTimes className="text-white text-2xl" />
            ) : (
              <FaBars className="text-white text-2xl" />
            )}
          </div>
          <nav className="gap-6 items-center hidden sm:flex">
            <Link href="/leaderboard"
              className="text-opacity-60 text-white hover:text-opacity-100 transition"
            >
              Leaderboard
            </Link>
            <Link href="/find"
              
              className="text-opacity-60 text-white hover:text-opacity-100 transition"
            >
              Find Devs
            </Link>
            <Link href="/track"
              className="text-opacity-60 text-white hover:text-opacity-100 transition"
            >
              Track
            </Link>
            <Link 
              href="/community"
              className="text-opacity-60 text-white hover:text-opacity-100 transition"
            >
              Community
            </Link>
            
            <Link href="/login" className="bg-white py-2 px-4 rounded-lg">Login</Link>
          </nav>
        </div>
        <div className={`sm:hidden ${menuOpen ? "block" : "hidden"}`}>
          <div className="fixed inset-y-0 right-0 w-48 bg-gradient-to-b from-black via-gray-900 to-purple-900 h-fit pb-10 border border-t-0 border-r-0 border-l-white border-b-white p-4 rounded-l-lg shadow-lg transform transition-transform duration-300 ease-in-out z-50">
            <div className="flex items-center justify-end">
              <div
                className="h-10 w-10 inline-flex justify-center mt-1 items-center cursor-pointer border border-white border-opacity-30 rounded-md"
                onClick={toggleMenu}
              >
                <FaTimes className="text-white text-2xl" />
              </div>
            </div>
            <div className="flex flex-col items-center gap-4 mt-4">
              <Link
                href="/leaderboard"
                className="text-white text-lg font-semibold text-opacity-80 border-b border-opacity-30 hover:text-opacity-100 transition"
              >
                Leaderboard
              </Link>
              <Link
                href="/find"
                className="text-white text-lg font-semibold text-opacity-80 border-b border-opacity-30 hover:text-opacity-100 transition"
              >
                Find Devs
              </Link>
              <Link
                href="/track"
                className="text-white text-lg font-semibold text-opacity-80 border-b border-opacity-30 hover:text-opacity-100 transition"
              >
                Track
              </Link>
              <Link
                href="/community"
                className="text-white text-lg font-semibold text-opacity-80 border-b border-opacity-30 hover:text-opacity-100 transition"
              >
                community
              </Link>
              
              <Link href="/login" className="bg-white text-black py-2 px-4 rounded-lg hover:bg-gray-200 transition">
                Login
              </Link>
            </div>
          </div>
          <div
            className={`${menuOpen ? "opacity-40 fixed inset-0 bg-black z-40 blur-3xl" : "hidden"
              }`}
            onClick={toggleMenu}
          ></div>
        </div>
      </div>
    </div>
  );
};
