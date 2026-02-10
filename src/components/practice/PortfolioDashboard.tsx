"use client";

import { useState, useEffect } from "react";
import StatCard from "@/components/ui/StatCard";
import PositionCard from "@/components/practice/PositionCard";
import OrderForm from "@/components/practice/OrderForm";
import MarketTicker from "@/components/practice/MarketTicker";
import { getAllQuotes } from "@/lib/market-data";
import type { MarketQuote } from "@/lib/market-data";

interface PortfolioData {
  startingCapital: number;
  cashBalance: number;
  totalValue: number;
  totalPnl: number;
  totalPnlPercent: number;
  todayPnl: number;
  weekPnl: number;
  monthPnl: number;
  positions: PositionItem[];
  stats: StatsData;
}

interface PositionItem {
  id: string;
  symbol: string;
  assetType: string;
  side: string;
  quantity: number;
  entryPrice: number;
  currentPrice: number;
  stopLoss: number | null;
  takeProfit: number | null;
  unrealizedPnl: number;
  strategy: string | null;
  openedAt: string;
}

interface StatsData {
  totalTrades: number;
  winningTrades: number;
  losingTrades: number;
  winRate: number;
  avgWinner: number;
  avgLoser: number;
  largestWin: number;
  largestLoss: number;
  profitFactor: number;
}

export default function PortfolioDashboard() {
  const [portfolio, setPortfolio] = useState<PortfolioData>({
    startingCapital: 100000,
    cashBalance: 100000,
    totalValue: 100000,
    totalPnl: 0,
    totalPnlPercent: 0,
    todayPnl: 0,
    weekPnl: 0,
    monthPnl: 0,
    positions: [],
    stats: {
      totalTrades: 0, winningTrades: 0, losingTrades: 0, winRate: 0,
      avgWinner: 0, avgLoser: 0, largestWin: 0, largestLoss: 0, profitFactor: 0,
    },
  });
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [selectedSymbol, setSelectedSymbol] = useState<string>("AAPL");
  const [quotes, setQuotes] = useState<MarketQuote[]>([]);
  const [activeView, setActiveView] = useState<"positions" | "history" | "stats">("positions");

  useEffect(() => {
    loadPortfolio();
    const q = getAllQuotes();
    setQuotes(q);
    const interval = setInterval(() => setQuotes(getAllQuotes()), 5000);
    return () => clearInterval(interval);
  }, []);

  async function loadPortfolio() {
    try {
      const res = await fetch("/api/portfolio");
      if (res.ok) {
        const data = await res.json();
        setPortfolio(data);
      }
    } catch { /* will use defaults */ }
  }

  async function handlePlaceOrder(order: {
    symbol: string;
    side: "buy" | "sell" | "short";
    orderType: string;
    quantity: number;
    limitPrice?: number;
    stopLoss?: number;
    takeProfit?: number;
    strategy?: string;
  }) {
    try {
      const res = await fetch("/api/trades", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });
      if (res.ok) {
        setShowOrderForm(false);
        loadPortfolio();
      }
    } catch { /* handle error */ }
  }

  async function handleClosePosition(positionId: string) {
    try {
      const res = await fetch(`/api/trades/${positionId}/close`, { method: "POST" });
      if (res.ok) loadPortfolio();
    } catch { /* handle error */ }
  }

  const totalRisk = portfolio.positions.reduce((sum, p) => {
    if (p.stopLoss) {
      const risk = Math.abs(p.entryPrice - p.stopLoss) * p.quantity;
      return sum + risk;
    }
    return sum;
  }, 0);
  const riskPercent = (totalRisk / portfolio.totalValue) * 100;
  const deployedPercent = ((portfolio.totalValue - portfolio.cashBalance) / portfolio.totalValue) * 100;

  return (
    <div className="space-y-6">
      {/* Market Ticker */}
      <MarketTicker quotes={quotes} onSelectSymbol={(s) => { setSelectedSymbol(s); setShowOrderForm(true); }} />

      {/* Account Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard label="Portfolio Value" value={`$${portfolio.totalValue.toLocaleString()}`} change={portfolio.totalPnlPercent} />
        <StatCard label="Available Cash" value={`$${portfolio.cashBalance.toLocaleString()}`} />
        <StatCard label="Total P&L" value={`$${portfolio.totalPnl.toLocaleString()}`} change={portfolio.totalPnlPercent} />
        <StatCard label="Today's P&L" value={`$${portfolio.todayPnl.toLocaleString()}`} change={portfolio.todayPnl >= 0 ? 0.5 : -0.5} />
      </div>

      {/* Risk Analysis Bar */}
      <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-white">Risk Analysis</h3>
          <span className={`text-sm font-bold ${riskPercent < 3 ? "text-emerald-400" : riskPercent < 5 ? "text-yellow-400" : "text-red-400"}`}>
            {riskPercent < 3 ? "LOW RISK" : riskPercent < 5 ? "MODERATE" : "HIGH RISK"}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-gray-400">Total Risk if All Stops Hit</p>
            <p className={`font-semibold ${riskPercent < 3 ? "text-emerald-400" : "text-yellow-400"}`}>
              -${totalRisk.toFixed(0)} ({riskPercent.toFixed(1)}%)
            </p>
          </div>
          <div>
            <p className="text-gray-400">Open Positions</p>
            <p className="text-white font-semibold">{portfolio.positions.length}</p>
          </div>
          <div>
            <p className="text-gray-400">Capital Deployed</p>
            <p className="text-white font-semibold">{deployedPercent.toFixed(1)}%</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={() => setShowOrderForm(true)}
          className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-colors"
        >
          + New Trade
        </button>
        <div className="flex bg-gray-800 rounded-xl p-1">
          {(["positions", "history", "stats"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setActiveView(v)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeView === v ? "bg-gray-700 text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              {v === "positions" ? `Positions (${portfolio.positions.length})` : v === "history" ? "History" : "Statistics"}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      {activeView === "positions" && (
        <div className="space-y-3">
          {portfolio.positions.length === 0 ? (
            <div className="bg-gray-800 rounded-xl p-12 border border-gray-700 text-center">
              <p className="text-4xl mb-4">📊</p>
              <h3 className="text-xl font-bold text-white mb-2">No Open Positions</h3>
              <p className="text-gray-400 mb-6">Start trading by clicking &quot;New Trade&quot; above or selecting an asset from the market ticker.</p>
              <button
                onClick={() => setShowOrderForm(true)}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-colors"
              >
                Place Your First Trade
              </button>
            </div>
          ) : (
            portfolio.positions.map((pos) => (
              <PositionCard key={pos.id} position={pos} onClose={() => handleClosePosition(pos.id)} />
            ))
          )}
        </div>
      )}

      {activeView === "stats" && (
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-bold text-white mb-4">Trading Statistics</h3>
          {portfolio.stats.totalTrades === 0 ? (
            <p className="text-gray-400">No trades yet. Start trading to see your statistics.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-gray-400 uppercase">Total Trades</p>
                <p className="text-xl font-bold text-white">{portfolio.stats.totalTrades}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase">Win Rate</p>
                <p className={`text-xl font-bold ${portfolio.stats.winRate >= 50 ? "text-emerald-400" : "text-red-400"}`}>
                  {portfolio.stats.winRate.toFixed(1)}%
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase">Profit Factor</p>
                <p className={`text-xl font-bold ${portfolio.stats.profitFactor >= 1.5 ? "text-emerald-400" : "text-yellow-400"}`}>
                  {portfolio.stats.profitFactor.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase">Avg Winner</p>
                <p className="text-xl font-bold text-emerald-400">+${portfolio.stats.avgWinner.toFixed(0)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase">Avg Loser</p>
                <p className="text-xl font-bold text-red-400">-${Math.abs(portfolio.stats.avgLoser).toFixed(0)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase">W/L</p>
                <p className="text-xl font-bold text-white">
                  {portfolio.stats.winningTrades}W / {portfolio.stats.losingTrades}L
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {activeView === "history" && (
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-bold text-white mb-4">Trade History</h3>
          <p className="text-gray-400">Trade history will appear here as you close positions.</p>
        </div>
      )}

      {/* Order Form Modal */}
      {showOrderForm && (
        <OrderForm
          symbol={selectedSymbol}
          quotes={quotes}
          accountValue={portfolio.totalValue}
          cashAvailable={portfolio.cashBalance}
          openPositions={portfolio.positions.length}
          onSubmit={handlePlaceOrder}
          onClose={() => setShowOrderForm(false)}
          onChangeSymbol={setSelectedSymbol}
        />
      )}
    </div>
  );
}
