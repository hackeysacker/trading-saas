"use client";

import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import PortfolioDashboard from "@/components/practice/PortfolioDashboard";
import { useStore } from "@/store/useStore";

export default function PracticePage() {
  const { setUser, setActiveTab } = useStore();

  useEffect(() => {
    setActiveTab("practice");
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
          <h1 className="text-2xl font-bold text-white">Paper Trading</h1>
          <p className="text-gray-400 text-sm mt-1">Practice trading with $100K virtual capital and real market data</p>
        </div>
        <PortfolioDashboard />
      </main>
    </div>
  );
}
