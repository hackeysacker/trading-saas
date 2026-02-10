"use client";

import Link from "next/link";
import { useStore } from "@/store/useStore";

export default function Navbar() {
  const { user, isAuthenticated, activeTab, setActiveTab } = useStore();

  return (
    <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-lg flex items-center justify-center font-bold text-gray-900 text-sm">
                TA
              </div>
              <span className="text-white font-bold text-lg">Trading Academy</span>
            </Link>

            {isAuthenticated && (
              <div className="hidden md:flex items-center gap-1 bg-gray-800 rounded-lg p-1">
                {(["learn", "practice", "create"] as const).map((tab) => (
                  <Link
                    key={tab}
                    href={`/${tab}`}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeTab === tab
                        ? "bg-emerald-600 text-white"
                        : "text-gray-400 hover:text-white hover:bg-gray-700"
                    }`}
                  >
                    {tab === "learn" && "Learn"}
                    {tab === "practice" && "Practice"}
                    {tab === "create" && "Create"}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link
                  href="/leaderboard"
                  className="text-gray-400 hover:text-white text-sm font-medium transition-colors"
                >
                  Leaderboard
                </Link>
                <Link
                  href="/profile"
                  className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded-lg transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center text-xs font-bold text-gray-900">
                    {user?.username?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <span className="text-white text-sm hidden sm:block">{user?.username}</span>
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="text-gray-400 hover:text-white text-sm font-medium transition-colors"
                >
                  Log In
                </Link>
                <Link
                  href="/register"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Start Free
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile tabs */}
        {isAuthenticated && (
          <div className="md:hidden flex gap-1 pb-3 bg-gray-800 rounded-lg p-1">
            {(["learn", "practice", "create"] as const).map((tab) => (
              <Link
                key={tab}
                href={`/${tab}`}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 text-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? "bg-emerald-600 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
