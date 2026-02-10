"use client";

import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import StrategyBuilder from "@/components/create/StrategyBuilder";
import { useStore } from "@/store/useStore";
import { useAutoLogin } from "@/hooks/useAutoLogin";

export default function CreatePage() {
  const { setActiveTab } = useStore();
  const loaded = useAutoLogin();

  useEffect(() => {
    setActiveTab("create");
  }, [setActiveTab]);

  if (!loaded) return <div className="min-h-screen bg-gray-950 flex items-center justify-center"><div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">Create Your Strategy</h1>
          <p className="text-gray-400 text-sm mt-1">Build a personalized trading strategy based on your profile and goals</p>
        </div>
        <StrategyBuilder />
      </main>
    </div>
  );
}
