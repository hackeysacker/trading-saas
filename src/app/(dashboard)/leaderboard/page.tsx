"use client";

import Navbar from "@/components/layout/Navbar";
import LeaderboardTable from "@/components/leaderboard/LeaderboardTable";
import { useAutoLogin } from "@/hooks/useAutoLogin";

export default function LeaderboardPage() {
  const loaded = useAutoLogin();

  if (!loaded) return <div className="min-h-screen bg-gray-950 flex items-center justify-center"><div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <LeaderboardTable />
      </main>
    </div>
  );
}
