"use client";

import { useState, useEffect } from "react";
import { ACHIEVEMENTS } from "@/lib/achievements-data";

interface LeaderboardUser {
  rank: number;
  username: string;
  totalPnl: number;
  pnlPercent: number;
  winRate: number;
  totalTrades: number;
  profitFactor: number;
  tradingStyle: string;
  streak: number;
  isCurrentUser?: boolean;
}

// Simulated leaderboard data for MVP
const MOCK_LEADERS: LeaderboardUser[] = [
  { rank: 1, username: "AlphaWolf", totalPnl: 47230, pnlPercent: 47.2, winRate: 71.3, totalTrades: 284, profitFactor: 3.87, tradingStyle: "Day Trader", streak: 8 },
  { rank: 2, username: "CryptoQueen", totalPnl: 38940, pnlPercent: 38.9, winRate: 68.9, totalTrades: 156, profitFactor: 3.42, tradingStyle: "Crypto", streak: 5 },
  { rank: 3, username: "SwingKing", totalPnl: 31250, pnlPercent: 31.3, winRate: 73.2, totalTrades: 82, profitFactor: 4.12, tradingStyle: "Swing", streak: 12 },
  { rank: 4, username: "TrendMaster", totalPnl: 28120, pnlPercent: 28.1, winRate: 69.4, totalTrades: 124, profitFactor: 3.28, tradingStyle: "Trend", streak: 4 },
  { rank: 5, username: "MomentumKing", totalPnl: 26880, pnlPercent: 26.9, winRate: 67.8, totalTrades: 167, profitFactor: 3.15, tradingStyle: "Momentum", streak: 3 },
  { rank: 6, username: "ChartWizard", totalPnl: 24450, pnlPercent: 24.5, winRate: 72.1, totalTrades: 93, profitFactor: 3.91, tradingStyle: "Technical", streak: 6 },
  { rank: 7, username: "RiskManager", totalPnl: 22340, pnlPercent: 22.3, winRate: 74.6, totalTrades: 71, profitFactor: 4.45, tradingStyle: "Conservative", streak: 9 },
  { rank: 8, username: "PatientTrader", totalPnl: 21890, pnlPercent: 21.9, winRate: 76.2, totalTrades: 58, profitFactor: 4.87, tradingStyle: "Swing", streak: 7 },
  { rank: 9, username: "TechAnalyst", totalPnl: 20120, pnlPercent: 20.1, winRate: 68.2, totalTrades: 142, profitFactor: 3.08, tradingStyle: "Stocks", streak: 2 },
  { rank: 10, username: "DisciplinedPro", totalPnl: 19450, pnlPercent: 19.5, winRate: 70.5, totalTrades: 89, profitFactor: 3.52, tradingStyle: "Balanced", streak: 5 },
];

export default function LeaderboardTable() {
  const [period, setPeriod] = useState<"all_time" | "monthly" | "weekly">("all_time");
  const [category, setCategory] = useState<"overall" | "stocks" | "crypto">("overall");
  const [leaders] = useState<LeaderboardUser[]>(MOCK_LEADERS);
  const [achievements] = useState(ACHIEVEMENTS.slice(0, 7).map(a => ({ ...a, isUnlocked: true })));

  useEffect(() => {
    // In production, fetch real leaderboard data
  }, [period, category]);

  const medals = ["", "🏆", "🥈", "🥉"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-2xl font-bold text-white">Leaderboard</h1>
        <div className="flex gap-2">
          {(["all_time", "monthly", "weekly"] as const).map((p) => (
            <button key={p} onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${period === p ? "bg-emerald-600 text-white" : "bg-gray-800 text-gray-400 hover:text-white"}`}>
              {p === "all_time" ? "All Time" : p === "monthly" ? "This Month" : "This Week"}
            </button>
          ))}
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2">
        {(["overall", "stocks", "crypto"] as const).map((c) => (
          <button key={c} onClick={() => setCategory(c)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${category === c ? "bg-gray-700 text-white" : "bg-gray-800/50 text-gray-400 hover:text-white"}`}>
            {c.charAt(0).toUpperCase() + c.slice(1)}
          </button>
        ))}
      </div>

      {/* Leaderboard Table */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700 text-xs text-gray-400 uppercase tracking-wide">
                <th className="text-left px-4 py-3">Rank</th>
                <th className="text-left px-4 py-3">Trader</th>
                <th className="text-right px-4 py-3">P&L</th>
                <th className="text-right px-4 py-3">Win%</th>
                <th className="text-right px-4 py-3 hidden sm:table-cell">Trades</th>
                <th className="text-right px-4 py-3 hidden md:table-cell">PF</th>
                <th className="text-right px-4 py-3 hidden lg:table-cell">Streak</th>
              </tr>
            </thead>
            <tbody>
              {leaders.map((user) => (
                <tr key={user.rank} className={`border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors ${user.isCurrentUser ? "bg-emerald-900/20" : ""}`}>
                  <td className="px-4 py-3">
                    <span className="text-lg">{medals[user.rank] || ""}</span>
                    <span className={`text-sm font-bold ${user.rank <= 3 ? "text-yellow-400" : "text-gray-400"}`}>
                      {!medals[user.rank] && `#${user.rank}`}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <p className={`font-semibold ${user.isCurrentUser ? "text-emerald-400" : "text-white"}`}>
                        {user.username} {user.isCurrentUser && "(You)"}
                      </p>
                      <p className="text-xs text-gray-500">{user.tradingStyle}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <p className="text-emerald-400 font-bold">${user.totalPnl.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">+{user.pnlPercent}%</p>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className={`font-medium ${user.winRate >= 70 ? "text-emerald-400" : user.winRate >= 60 ? "text-yellow-400" : "text-gray-300"}`}>
                      {user.winRate}%
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right text-gray-300 hidden sm:table-cell">{user.totalTrades}</td>
                  <td className="px-4 py-3 text-right hidden md:table-cell">
                    <span className={`font-medium ${user.profitFactor >= 3 ? "text-emerald-400" : "text-gray-300"}`}>
                      {user.profitFactor.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right hidden lg:table-cell">
                    <span className="text-gray-300">{user.streak}W</span>
                    {user.streak >= 10 && <span className="ml-1">🔥</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-lg font-bold text-white mb-4">Achievements</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {achievements.map((a) => (
            <div key={a.id} className={`p-3 rounded-lg border ${a.isUnlocked ? "bg-emerald-900/20 border-emerald-700" : "bg-gray-700/50 border-gray-600 opacity-60"}`}>
              <div className="text-2xl mb-1">{a.icon}</div>
              <p className="text-sm font-medium text-white">{a.name}</p>
              <p className="text-xs text-gray-400">{a.description}</p>
            </div>
          ))}
          {ACHIEVEMENTS.slice(7, 15).map((a) => (
            <div key={a.id} className="p-3 rounded-lg border bg-gray-700/50 border-gray-600 opacity-40">
              <div className="text-2xl mb-1">🔒</div>
              <p className="text-sm font-medium text-gray-400">{a.name}</p>
              <p className="text-xs text-gray-500">{a.requirement}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Active Challenges */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-lg font-bold text-white mb-4">Active Challenges</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-700/50 rounded-xl p-4 border border-purple-900/50">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-white">February Crypto Challenge</h4>
              <span className="text-xs bg-purple-600/20 text-purple-400 px-2 py-0.5 rounded">23 days left</span>
            </div>
            <p className="text-sm text-gray-400 mb-3">Crypto trades only. Best P&L wins 3 months Pro free.</p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Leader: CryptoQueen (+$38,940)</span>
              <button className="text-emerald-400 hover:text-emerald-300 font-medium">Join</button>
            </div>
          </div>
          <div className="bg-gray-700/50 rounded-xl p-4 border border-cyan-900/50">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-white">Risk Management Challenge</h4>
              <span className="text-xs bg-cyan-600/20 text-cyan-400 px-2 py-0.5 rounded">Ongoing</span>
            </div>
            <p className="text-sm text-gray-400 mb-3">Maintain 60%+ win rate for 20 consecutive trades.</p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Prize: Risk Master badge</span>
              <button className="text-emerald-400 hover:text-emerald-300 font-medium">Track Progress</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
