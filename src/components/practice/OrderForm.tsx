"use client";

import { useState, useMemo } from "react";
import type { MarketQuote } from "@/lib/market-data";
import { analyzeTradeEntry } from "@/lib/ai-coach";

interface OrderFormProps {
  symbol: string;
  quotes: MarketQuote[];
  accountValue: number;
  cashAvailable: number;
  openPositions: number;
  onSubmit: (order: {
    symbol: string;
    side: "buy" | "sell" | "short";
    orderType: string;
    quantity: number;
    limitPrice?: number;
    stopLoss?: number;
    takeProfit?: number;
    strategy?: string;
  }) => void;
  onClose: () => void;
  onChangeSymbol: (symbol: string) => void;
}

export default function OrderForm({ symbol, quotes, accountValue, cashAvailable, openPositions, onSubmit, onClose, onChangeSymbol }: OrderFormProps) {
  const [side, setSide] = useState<"buy" | "sell" | "short">("buy");
  const [orderType, setOrderType] = useState<"market" | "limit">("limit");
  const [quantity, setQuantity] = useState<number>(10);
  const [limitPrice, setLimitPrice] = useState<number>(0);
  const [stopLoss, setStopLoss] = useState<number>(0);
  const [takeProfit, setTakeProfit] = useState<number>(0);
  const [strategy, setStrategy] = useState("");
  const [checklist, setChecklist] = useState<boolean[]>([false, false, false, false, false]);

  const quote = quotes.find((q) => q.symbol === symbol);
  const price = orderType === "limit" && limitPrice > 0 ? limitPrice : (quote?.price || 0);

  // Initialize prices from quote
  useMemo(() => {
    if (quote) {
      setLimitPrice(Number((quote.price * 0.998).toFixed(2)));
      setStopLoss(Number((quote.price * 0.97).toFixed(2)));
      setTakeProfit(Number((quote.price * 1.04).toFixed(2)));
    }
  }, [quote?.symbol]); // eslint-disable-line react-hooks/exhaustive-deps

  const totalCost = price * quantity;
  const riskPerShare = stopLoss > 0 ? Math.abs(price - stopLoss) : 0;
  const totalRisk = riskPerShare * quantity;
  const riskPercent = accountValue > 0 ? (totalRisk / accountValue) * 100 : 0;
  const rewardPerShare = takeProfit > 0 ? Math.abs(takeProfit - price) : 0;
  const totalReward = rewardPerShare * quantity;
  const rrRatio = riskPerShare > 0 ? rewardPerShare / riskPerShare : 0;

  const coachAnalysis = useMemo(() => {
    return analyzeTradeEntry(symbol, side, quantity, price, stopLoss || undefined, takeProfit || undefined, accountValue, openPositions);
  }, [symbol, side, quantity, price, stopLoss, takeProfit, accountValue, openPositions]);

  const allChecked = checklist.every(Boolean);

  function handleSubmit() {
    onSubmit({
      symbol,
      side,
      orderType,
      quantity,
      limitPrice: orderType === "limit" ? limitPrice : undefined,
      stopLoss: stopLoss > 0 ? stopLoss : undefined,
      takeProfit: takeProfit > 0 ? takeProfit : undefined,
      strategy: strategy || undefined,
    });
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-gray-900 rounded-2xl border border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-white">New Order</h2>
              <div className="flex items-center gap-2 mt-1">
                <select
                  value={symbol}
                  onChange={(e) => onChangeSymbol(e.target.value)}
                  className="bg-gray-800 text-white border border-gray-600 rounded px-2 py-1 text-sm"
                >
                  {quotes.map((q) => (
                    <option key={q.symbol} value={q.symbol}>{q.symbol} - {q.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">&times;</button>
          </div>

          {/* Current Price */}
          {quote && (
            <div className="bg-gray-800 rounded-xl p-4 mb-4 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Current Price</p>
                  <p className="text-2xl font-bold text-white">${quote.price.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-bold ${quote.changePercent >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                    {quote.changePercent >= 0 ? "+" : ""}{quote.changePercent.toFixed(2)}%
                  </p>
                  <p className="text-xs text-gray-400">
                    Bid: ${quote.bid} / Ask: ${quote.ask}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Order Config */}
          <div className="space-y-4">
            {/* Side */}
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Action</label>
              <div className="flex gap-2">
                {(["buy", "sell", "short"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSide(s)}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                      side === s
                        ? s === "buy" ? "bg-emerald-600 text-white" : "bg-red-600 text-white"
                        : "bg-gray-700 text-gray-400 hover:text-white"
                    }`}
                  >
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Order Type */}
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Order Type</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setOrderType("market")}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium ${orderType === "market" ? "bg-cyan-600 text-white" : "bg-gray-700 text-gray-400"}`}
                >
                  Market
                </button>
                <button
                  onClick={() => setOrderType("limit")}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium ${orderType === "limit" ? "bg-cyan-600 text-white" : "bg-gray-700 text-gray-400"}`}
                >
                  Limit
                </button>
              </div>
            </div>

            {/* Limit Price */}
            {orderType === "limit" && (
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Limit Price</label>
                <input
                  type="number"
                  step="0.01"
                  value={limitPrice}
                  onChange={(e) => setLimitPrice(Number(e.target.value))}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white"
                />
              </div>
            )}

            {/* Quantity */}
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Quantity</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white"
              />
              <p className="text-xs text-gray-500 mt-1">
                Total cost: ${totalCost.toLocaleString()} | Available: ${cashAvailable.toLocaleString()}
                {totalCost > cashAvailable && <span className="text-red-400 ml-1">Insufficient funds</span>}
              </p>
            </div>

            {/* Risk Management */}
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
              <h3 className="text-sm font-semibold text-white mb-3">Risk Management</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Stop Loss</label>
                  <input
                    type="number"
                    step="0.01"
                    value={stopLoss}
                    onChange={(e) => setStopLoss(Number(e.target.value))}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Risk: -${totalRisk.toFixed(0)} ({riskPercent.toFixed(2)}%)
                  </p>
                </div>
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Take Profit</label>
                  <input
                    type="number"
                    step="0.01"
                    value={takeProfit}
                    onChange={(e) => setTakeProfit(Number(e.target.value))}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Reward: +${totalReward.toFixed(0)} | R:R 1:{rrRatio.toFixed(1)}
                  </p>
                </div>
              </div>
            </div>

            {/* Strategy */}
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Strategy (optional)</label>
              <select
                value={strategy}
                onChange={(e) => setStrategy(e.target.value)}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm"
              >
                <option value="">Select strategy...</option>
                <option value="Pullback in Trend">Pullback in Trend</option>
                <option value="Breakout">Breakout</option>
                <option value="Range Trade">Range Trade</option>
                <option value="Momentum">Momentum</option>
                <option value="Mean Reversion">Mean Reversion</option>
                <option value="Swing Trade">Swing Trade</option>
              </select>
            </div>

            {/* AI Coach Feedback */}
            <div className="bg-gray-800/50 rounded-xl p-4 border border-cyan-900/50">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-cyan-400">AI Coach Analysis</h3>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">Confidence:</span>
                  <span className={`text-sm font-bold ${
                    coachAnalysis.confidenceScore >= 7 ? "text-emerald-400" : coachAnalysis.confidenceScore >= 5 ? "text-yellow-400" : "text-red-400"
                  }`}>
                    {coachAnalysis.confidenceScore}/10
                  </span>
                  <span className="text-xs font-bold text-white bg-gray-700 px-2 py-0.5 rounded">
                    {coachAnalysis.riskGrade}
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                {coachAnalysis.messages.map((msg, i) => (
                  <div key={i} className={`text-sm p-2 rounded-lg ${
                    msg.type === "celebration" ? "bg-emerald-900/30 text-emerald-300" :
                    msg.type === "warning" ? "bg-yellow-900/30 text-yellow-300" :
                    msg.type === "alert" ? "bg-red-900/30 text-red-300" :
                    "bg-gray-700/50 text-gray-300"
                  }`}>
                    <span className="font-medium">{msg.title}:</span> {msg.message}
                  </div>
                ))}
              </div>
            </div>

            {/* Pre-Trade Checklist */}
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
              <h3 className="text-sm font-semibold text-white mb-3">Pre-Trade Checklist</h3>
              {[
                "I have reviewed the chart and analysis",
                `I understand the risk (-$${totalRisk.toFixed(0)} if stop is hit)`,
                "I have set stop loss and take profit",
                "This trade fits my strategy",
                "I am not chasing FOMO or revenge trading",
              ].map((item, i) => (
                <label key={i} className="flex items-center gap-2 py-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checklist[i]}
                    onChange={() => {
                      const next = [...checklist];
                      next[i] = !next[i];
                      setChecklist(next);
                    }}
                    className="rounded border-gray-600 bg-gray-700 text-emerald-500 focus:ring-emerald-500"
                  />
                  <span className="text-sm text-gray-300">{item}</span>
                </label>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={onClose}
                className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!allChecked || totalCost > cashAvailable}
                className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-colors"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
