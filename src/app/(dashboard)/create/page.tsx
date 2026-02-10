"use client";

import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import StrategyBuilder from "@/components/create/StrategyBuilder";
import { useStore } from "@/store/useStore";

export default function CreatePage() {
  const { setUser, setActiveTab } = useStore();

  useEffect(() => {
    setActiveTab("create");
    fetch("/api/auth/me")
      .then((res) => res.ok ? res.json() : null)
      .then((data) => { if (data?.user) setUser(data.user); })
      .catch(() => {});
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
