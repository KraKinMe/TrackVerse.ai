"use client";
import React from "react";
import Link from "next/link";

export default function Login() {
  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 to-black flex justify-center items-center">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-lg text-white">
        {/* Logo or Heading */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-violet-400 bg-clip-text text-transparent">
            Welcome Back!
          </h1>
          <p className="text-gray-400 mt-2">Sign in to your account</p>
        </div>

        {/* Form */}
        <form>
          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 bg-black/20 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-violet-500 focus:outline-none"
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full p-3 bg-black/20 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-violet-500 focus:outline-none"
            />
          </div>

          {/* Submit Button */}
          <Link href="/admin"
            className="w-full p-3 bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-violet-400 rounded-lg shadow-lg text-white font-semibold"
          >
            Sign In
          </Link>
        </form>

        {/* Additional Links */}
        <div className="text-center mt-6 text-gray-400">
          <p>
            Dont have an account?{" "}
            <a
              href="#"
              className="text-violet-400 hover:underline hover:text-violet-300"
            >
              Sign Up
            </a>
          </p>
          <p className="mt-2">
            <a
              href="#"
              className="text-violet-400 hover:underline hover:text-violet-300"
            >
              Forgot your password?
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
