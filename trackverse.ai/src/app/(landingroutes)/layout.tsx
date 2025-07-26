"use-client"
import React from "react";
import { Navbar } from "@/components/Navbar";
const Dashlayout = ({ 
    children 
}:{
    children: React.ReactNode
} ) => {
  return (
    <div className="h-full">
        <Navbar />
        <main className="bg-black">
        {children}
        </main>
    </div>
  );
};

export default Dashlayout;