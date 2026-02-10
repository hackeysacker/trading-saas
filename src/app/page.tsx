"use client";

import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import { useAutoLogin } from "@/hooks/useAutoLogin";

export default function Home() {
  const loaded = useAutoLogin();

  if (!loaded) return <div className="min-h-screen bg-gray-950 flex items-center justify-center"><div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/20 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block mb-6 px-4 py-1.5 bg-emerald-600/20 border border-emerald-600/30 rounded-full">
              <span className="text-emerald-400 text-sm font-medium">Paper trading with real market data</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Learn to Trade
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400"> Profitably</span>
              <br />Before Risking Real Money
            </h1>
            <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Interactive education, AI coaching, and realistic paper trading simulation.
              Practice with $100K virtual capital and build your track record.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link
                href="/register"
                className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-lg font-semibold transition-colors"
              >
                Start Free - $100K Virtual Capital
              </Link>
              <Link
                href="/learn"
                className="px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white rounded-xl text-lg font-semibold transition-colors border border-gray-700"
              >
                Explore Curriculum
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Problem / Solution */}
      <section className="py-20 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              90% of traders lose money. <span className="text-red-400">Don&apos;t be one of them.</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Most traders lose $10K-$30K learning by trial and error. Our platform lets you learn by doing - with zero financial risk.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "📚", title: "Learn", desc: "59 interactive modules covering fundamentals, technical analysis, strategies, psychology, and risk management.", link: "/learn" },
              { icon: "📊", title: "Practice", desc: "Paper trade with $100K virtual capital and real market data. AI coach prevents emotional trading mistakes.", link: "/practice" },
              { icon: "🎯", title: "Create", desc: "Build your own trading strategy with our guided wizard. Backtest it and refine until profitable.", link: "/create" },
            ].map((item) => (
              <Link key={item.title} href={item.link} className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700 hover:border-emerald-600/50 transition-colors group">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Everything you need to become a profitable trader</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "🤖", title: "AI Trading Coach", desc: "Real-time coaching that analyzes your trades, warns about emotional decisions, and provides personalized feedback." },
              { icon: "📈", title: "Real Market Data", desc: "Practice with actual market prices from NYSE, NASDAQ, and crypto exchanges. No dummy data." },
              { icon: "🛡️", title: "Risk Management Tools", desc: "Built-in position sizing calculator, portfolio heat tracker, and mandatory stop-loss enforcement." },
              { icon: "🏆", title: "Leaderboards", desc: "Compete with other traders. Track your ranking, earn achievements, and join trading challenges." },
              { icon: "📝", title: "Trading Journal", desc: "Auto-generated trade journal with emotion tracking. Learn from every win and loss." },
              { icon: "🧠", title: "Psychology Training", desc: "8 dedicated modules on trading psychology. Master FOMO, revenge trading, and discipline." },
            ].map((f) => (
              <div key={f.title} className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/50">
                <div className="text-2xl mb-3">{f.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Preview */}
      <section className="py-20 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">59 Interactive Modules</h2>
            <p className="text-gray-400 text-lg">From complete beginner to advanced trader</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: "📚", title: "Fundamentals", count: 8 },
              { icon: "📊", title: "Technical Analysis", count: 10 },
              { icon: "📰", title: "Fundamental Analysis", count: 6 },
              { icon: "🎯", title: "Trading Strategies", count: 12 },
              { icon: "🧠", title: "Psychology", count: 8 },
              { icon: "🛡️", title: "Risk Management", count: 7 },
              { icon: "🚀", title: "Advanced Concepts", count: 8 },
            ].map((s) => (
              <div key={s.title} className="bg-gray-800/50 rounded-xl p-5 border border-gray-700">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{s.icon}</span>
                  <div>
                    <h3 className="text-sm font-semibold text-white">{s.title}</h3>
                    <p className="text-xs text-gray-500">{s.count} modules</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-gray-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to learn trading the right way?
          </h2>
          <p className="text-lg text-gray-400 mb-10">
            Start with $100,000 in virtual capital. Learn, practice, and build your track record before risking real money.
          </p>
          <Link
            href="/register"
            className="inline-block px-10 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-lg font-semibold transition-colors"
          >
            Start Learning Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-lg flex items-center justify-center font-bold text-gray-900 text-sm">TA</div>
              <span className="text-white font-bold">Trading Academy</span>
            </div>
            <p className="text-gray-500 text-sm">Paper trading only. Not financial advice.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
