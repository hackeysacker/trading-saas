"use client";

import type { MarketQuote } from "@/lib/market-data";

interface MarketTickerProps {
  quotes: MarketQuote[];
  onSelectSymbol: (symbol: string) => void;
}

export default function MarketTicker({ quotes, onSelectSymbol }: MarketTickerProps) {
  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-700 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">Live Market Data</h3>
        <span className="text-xs text-gray-500">Click to trade</span>
      </div>
      <div className="overflow-x-auto">
        <div className="flex gap-0 min-w-max">
          {quotes.map((q) => (
            <button
              key={q.symbol}
              onClick={() => onSelectSymbol(q.symbol)}
              className="flex-shrink-0 px-4 py-3 hover:bg-gray-700/50 transition-colors border-r border-gray-700/50 last:border-r-0"
            >
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white">{q.symbol}</span>
                <span className={`text-xs ${q.changePercent >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                  {q.changePercent >= 0 ? "+" : ""}{q.changePercent.toFixed(2)}%
                </span>
              </div>
              <p className="text-sm font-medium text-gray-300">${q.price.toLocaleString()}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
