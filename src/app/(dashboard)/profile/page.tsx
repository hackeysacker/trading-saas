"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import { useStore } from "@/store/useStore";

export default function ProfilePage() {
  const { user, setUser } = useStore();
  const [stats, setStats] = useState({ totalTrades: 0, winRate: 0, profitFactor: 0, completedModules: 0 });
  const router = useRouter();

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.ok ? res.json() : null)
      .then((data) => { if (data?.user) setUser(data.user); })
      .catch(() => {});
    fetch("/api/portfolio")
      .then((res) => res.ok ? res.json() : null)
      .then((data) => {
        if (data?.stats) setStats((s) => ({ ...s, totalTrades: data.stats.totalTrades, winRate: data.stats.winRate, profitFactor: data.stats.profitFactor }));
      })
      .catch(() => {});
    fetch("/api/modules/progress")
      .then((res) => res.ok ? res.json() : null)
      .then((data) => {
        if (data?.completedModules) setStats((s) => ({ ...s, completedModules: data.completedModules.length }));
      })
      .catch(() => {});
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    router.push("/");
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center text-2xl font-bold text-gray-900">
              {user?.username?.charAt(0).toUpperCase() || "U"}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">{user?.displayName || user?.username}</h1>
              <p className="text-gray-400">@{user?.username}</p>
              <p className="text-gray-500 text-sm">{user?.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-700/50 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-white">{stats.totalTrades}</p>
              <p className="text-xs text-gray-400">Total Trades</p>
            </div>
            <div className="bg-gray-700/50 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-emerald-400">{stats.winRate.toFixed(1)}%</p>
              <p className="text-xs text-gray-400">Win Rate</p>
            </div>
            <div className="bg-gray-700/50 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-cyan-400">{stats.profitFactor.toFixed(2)}</p>
              <p className="text-xs text-gray-400">Profit Factor</p>
            </div>
            <div className="bg-gray-700/50 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-purple-400">{stats.completedModules}/59</p>
              <p className="text-xs text-gray-400">Modules Done</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
          <h2 className="text-lg font-bold text-white mb-4">Account</h2>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-gray-700">
              <span className="text-gray-400">Experience Level</span>
              <span className="text-white capitalize">{user?.experienceLevel || "beginner"}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-700">
              <span className="text-gray-400">Trading Style</span>
              <span className="text-white capitalize">{user?.tradingStyle || "Not set"}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-400">Member Since</span>
              <span className="text-white">{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}</span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full mt-6 py-3 bg-gray-700 hover:bg-red-600/80 text-gray-300 hover:text-white rounded-lg font-medium transition-colors"
          >
            Log Out
          </button>
        </div>
      </main>
    </div>
  );
}
