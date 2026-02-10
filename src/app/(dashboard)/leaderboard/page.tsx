"use client";

import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import LeaderboardTable from "@/components/leaderboard/LeaderboardTable";
import { useStore } from "@/store/useStore";

export default function LeaderboardPage() {
  const { setUser } = useStore();

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.ok ? res.json() : null)
      .then((data) => { if (data?.user) setUser(data.user); })
      .catch(() => {});
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <LeaderboardTable />
      </main>
    </div>
  );
}
