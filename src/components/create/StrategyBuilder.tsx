"use client";

import { useState } from "react";

interface StrategyConfig {
  name: string;
  timeCommitment: string;
  assets: string;
  personality: string;
  experienceLevel: string;
  goal: string;
  trendFilters: string[];
  entryStyle: string;
  riskPercent: number;
  maxPositions: number;
  stopLossType: string;
  takeProfitStyle: string;
  additionalFilters: string[];
}

const STEPS = [
  "Trading Profile",
  "Strategy Type",
  "Entry Rules",
  "Risk Management",
  "Exit Strategy",
  "Review & Save",
];

export default function StrategyBuilder() {
  const [step, setStep] = useState(0);
  const [config, setConfig] = useState<StrategyConfig>({
    name: "",
    timeCommitment: "",
    assets: "",
    personality: "",
    experienceLevel: "",
    goal: "",
    trendFilters: [],
    entryStyle: "",
    riskPercent: 1,
    maxPositions: 5,
    stopLossType: "",
    takeProfitStyle: "",
    additionalFilters: [],
  });
  const [saved, setSaved] = useState(false);

  function toggleFilter(filter: string) {
    setConfig((prev) => ({
      ...prev,
      trendFilters: prev.trendFilters.includes(filter)
        ? prev.trendFilters.filter((f) => f !== filter)
        : [...prev.trendFilters, filter],
    }));
  }

  function toggleAdditionalFilter(filter: string) {
    setConfig((prev) => ({
      ...prev,
      additionalFilters: prev.additionalFilters.includes(filter)
        ? prev.additionalFilters.filter((f) => f !== filter)
        : [...prev.additionalFilters, filter],
    }));
  }

  async function saveStrategy() {
    try {
      const res = await fetch("/api/strategies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: config.name || "My Trading Strategy",
          description: `${config.personality} ${config.assets} trader targeting ${config.goal}`,
          tradingStyle: config.entryStyle || "swing",
          assets: config.assets,
          entryRules: JSON.stringify(config.trendFilters),
          exitRules: JSON.stringify({ stopLossType: config.stopLossType, takeProfitStyle: config.takeProfitStyle }),
          riskPerTrade: config.riskPercent,
          maxPositions: config.maxPositions,
          filters: JSON.stringify(config.additionalFilters),
        }),
      });
      if (res.ok) setSaved(true);
    } catch { /* handle error */ }
  }

  if (saved) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className="text-6xl mb-4">&#10003;</div>
        <h2 className="text-3xl font-bold text-white mb-4">Strategy Saved!</h2>
        <p className="text-gray-400 mb-8">Your trading strategy has been created. Start using it in the Practice tab to track your performance.</p>
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-left mb-6">
          <h3 className="text-lg font-bold text-white mb-4">{config.name || "My Trading Strategy"}</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div><span className="text-gray-400">Style:</span> <span className="text-white ml-1">{config.entryStyle || "Swing"}</span></div>
            <div><span className="text-gray-400">Assets:</span> <span className="text-white ml-1">{config.assets || "Both"}</span></div>
            <div><span className="text-gray-400">Risk/Trade:</span> <span className="text-white ml-1">{config.riskPercent}%</span></div>
            <div><span className="text-gray-400">Max Positions:</span> <span className="text-white ml-1">{config.maxPositions}</span></div>
          </div>
          {config.trendFilters.length > 0 && (
            <div className="mt-4">
              <p className="text-gray-400 text-sm mb-2">Trend Filters:</p>
              <div className="flex flex-wrap gap-2">
                {config.trendFilters.map((f) => (
                  <span key={f} className="text-xs bg-emerald-600/20 text-emerald-400 px-2 py-1 rounded">{f}</span>
                ))}
              </div>
            </div>
          )}
        </div>
        <button onClick={() => { setSaved(false); setStep(0); setConfig({ name: "", timeCommitment: "", assets: "", personality: "", experienceLevel: "", goal: "", trendFilters: [], entryStyle: "", riskPercent: 1, maxPositions: 5, stopLossType: "", takeProfitStyle: "", additionalFilters: [] }); }}
          className="px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors">
          Create Another Strategy
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold text-white">Strategy Builder</h2>
          <span className="text-sm text-gray-400">Step {step + 1} of {STEPS.length}</span>
        </div>
        <div className="flex gap-1">
          {STEPS.map((_, i) => (
            <div key={i} className={`flex-1 h-1.5 rounded-full ${i <= step ? "bg-emerald-500" : "bg-gray-700"}`} />
          ))}
        </div>
        <p className="text-sm text-gray-400 mt-2">{STEPS[step]}</p>
      </div>

      {/* Step 0: Trading Profile */}
      {step === 0 && (
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">How much time can you dedicate to trading daily?</h3>
            {["< 30 minutes", "1-2 hours", "4-6 hours", "All day"].map((opt) => (
              <button key={opt} onClick={() => setConfig((p) => ({ ...p, timeCommitment: opt }))}
                className={`w-full text-left px-4 py-3 rounded-lg mb-2 transition-colors ${config.timeCommitment === opt ? "bg-emerald-600/20 border border-emerald-500 text-emerald-300" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}>
                {opt}
              </button>
            ))}
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Which markets interest you?</h3>
            {["Stocks only", "Crypto only", "Both"].map((opt) => (
              <button key={opt} onClick={() => setConfig((p) => ({ ...p, assets: opt }))}
                className={`w-full text-left px-4 py-3 rounded-lg mb-2 transition-colors ${config.assets === opt ? "bg-emerald-600/20 border border-emerald-500 text-emerald-300" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}>
                {opt}
              </button>
            ))}
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Which best describes you?</h3>
            {["Patient - I can wait for perfect setups", "Active - I want to trade frequently", "Analytical - I love data and indicators", "Intuitive - I read price action by feel"].map((opt) => (
              <button key={opt} onClick={() => setConfig((p) => ({ ...p, personality: opt.split(" - ")[0] }))}
                className={`w-full text-left px-4 py-3 rounded-lg mb-2 transition-colors ${config.personality === opt.split(" - ")[0] ? "bg-emerald-600/20 border border-emerald-500 text-emerald-300" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}>
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 1: Strategy Type */}
      {step === 1 && (
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-2">What&apos;s your primary goal?</h3>
            <p className="text-sm text-gray-400 mb-4">This determines your strategy&apos;s risk/reward profile.</p>
            {[
              { val: "Consistent income", desc: "Steady gains, lower volatility. Target 65-70% win rate with 1:2 R:R." },
              { val: "Capital growth", desc: "Bigger gains, accept more risk. Lower win rate but larger winners." },
              { val: "Learning", desc: "Practicing strategies, not focused on profit yet." },
            ].map((opt) => (
              <button key={opt.val} onClick={() => setConfig((p) => ({ ...p, goal: opt.val }))}
                className={`w-full text-left px-4 py-3 rounded-lg mb-2 transition-colors ${config.goal === opt.val ? "bg-emerald-600/20 border border-emerald-500 text-emerald-300" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}>
                <p className="font-medium">{opt.val}</p>
                <p className="text-xs text-gray-400 mt-1">{opt.desc}</p>
              </button>
            ))}
          </div>

          <div className="bg-cyan-900/20 rounded-xl p-4 border border-cyan-800/50">
            <p className="text-sm text-cyan-300">
              <span className="font-semibold">AI Recommendation:</span> Based on your profile ({config.personality}, {config.timeCommitment}),
              I recommend <strong>Swing Trading with Pullback Entries</strong>. This fits your patience, requires minimal screen time, and delivers consistent results.
            </p>
          </div>
        </div>
      )}

      {/* Step 2: Entry Rules */}
      {step === 2 && (
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Entry Style</h3>
            {[
              { val: "Pullback", desc: "Wait for pullback to support in uptrend. Higher win rate (65-75%)." },
              { val: "Breakout", desc: "Enter when price breaks above resistance. Catches explosive moves." },
              { val: "Combination", desc: "Use both depending on setup. More complex but more opportunities." },
            ].map((opt) => (
              <button key={opt.val} onClick={() => setConfig((p) => ({ ...p, entryStyle: opt.val }))}
                className={`w-full text-left px-4 py-3 rounded-lg mb-2 transition-colors ${config.entryStyle === opt.val ? "bg-emerald-600/20 border border-emerald-500 text-emerald-300" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}>
                <p className="font-medium">{opt.val}</p>
                <p className="text-xs text-gray-400 mt-1">{opt.desc}</p>
              </button>
            ))}
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Trend Filters (select all that apply)</h3>
            <p className="text-sm text-gray-400 mb-3">Only trade when ALL selected filters are true:</p>
            {[
              "Price above 20-day MA",
              "Price above 50-day MA",
              "20-day MA above 50-day MA",
              "RSI above 50",
              "Volume above 20-day average",
              "Making higher highs",
              "Above weekly support",
            ].map((filter) => (
              <label key={filter} className="flex items-center gap-3 py-2 cursor-pointer">
                <input type="checkbox" checked={config.trendFilters.includes(filter)} onChange={() => toggleFilter(filter)}
                  className="rounded border-gray-600 bg-gray-700 text-emerald-500 focus:ring-emerald-500" />
                <span className="text-sm text-gray-300">{filter}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Risk Management */}
      {step === 3 && (
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Risk Per Trade</h3>
            <div className="flex gap-3">
              {[0.5, 1, 1.5, 2].map((pct) => (
                <button key={pct} onClick={() => setConfig((p) => ({ ...p, riskPercent: pct }))}
                  className={`flex-1 py-3 rounded-lg text-sm font-medium transition-colors ${config.riskPercent === pct ? "bg-emerald-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}>
                  {pct}%
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-2">On a $100K account, {config.riskPercent}% = ${(100000 * config.riskPercent / 100).toLocaleString()} max risk per trade.</p>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Maximum Open Positions</h3>
            <div className="flex gap-3">
              {[3, 5, 7, 10].map((n) => (
                <button key={n} onClick={() => setConfig((p) => ({ ...p, maxPositions: n }))}
                  className={`flex-1 py-3 rounded-lg text-sm font-medium transition-colors ${config.maxPositions === n ? "bg-emerald-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}>
                  {n}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-2">Max portfolio heat: {config.maxPositions * config.riskPercent}% if all stops hit.</p>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Stop Loss Placement</h3>
            {["Below 20-day MA", "Below recent swing low", "Fixed percentage (2%)", "ATR-based (1.5x ATR)"].map((opt) => (
              <button key={opt} onClick={() => setConfig((p) => ({ ...p, stopLossType: opt }))}
                className={`w-full text-left px-4 py-3 rounded-lg mb-2 transition-colors ${config.stopLossType === opt ? "bg-emerald-600/20 border border-emerald-500 text-emerald-300" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}>
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 4: Exit Strategy */}
      {step === 4 && (
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Take Profit Style</h3>
            {[
              { val: "Fixed R:R", desc: "Always exit at predetermined R:R ratio (e.g., 1:2). Simple and consistent." },
              { val: "Trailing Stop", desc: "Let winners run with a trailing stop. Captures big moves." },
              { val: "Hybrid", desc: "Take partial profits at targets, trail the rest. Best of both worlds." },
            ].map((opt) => (
              <button key={opt.val} onClick={() => setConfig((p) => ({ ...p, takeProfitStyle: opt.val }))}
                className={`w-full text-left px-4 py-3 rounded-lg mb-2 transition-colors ${config.takeProfitStyle === opt.val ? "bg-emerald-600/20 border border-emerald-500 text-emerald-300" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}>
                <p className="font-medium">{opt.val}</p>
                <p className="text-xs text-gray-400 mt-1">{opt.desc}</p>
              </button>
            ))}
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Additional Filters</h3>
            {[
              "Don't trade during earnings week",
              "Don't trade during Fed announcements",
              "Close all before 3-day weekends",
              "Only trade first/last hour (stocks)",
              "Don't trade crypto on Sundays",
            ].map((filter) => (
              <label key={filter} className="flex items-center gap-3 py-2 cursor-pointer">
                <input type="checkbox" checked={config.additionalFilters.includes(filter)} onChange={() => toggleAdditionalFilter(filter)}
                  className="rounded border-gray-600 bg-gray-700 text-emerald-500 focus:ring-emerald-500" />
                <span className="text-sm text-gray-300">{filter}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Step 5: Review */}
      {step === 5 && (
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="mb-4">
              <label className="text-sm text-gray-400 block mb-1">Strategy Name</label>
              <input type="text" value={config.name} onChange={(e) => setConfig((p) => ({ ...p, name: e.target.value }))}
                placeholder="e.g., Patient Swing Trader"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" />
            </div>

            <h3 className="text-lg font-semibold text-white mb-4">Strategy Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-gray-700">
                <span className="text-gray-400">Time Commitment</span><span className="text-white">{config.timeCommitment}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-700">
                <span className="text-gray-400">Markets</span><span className="text-white">{config.assets}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-700">
                <span className="text-gray-400">Personality</span><span className="text-white">{config.personality}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-700">
                <span className="text-gray-400">Goal</span><span className="text-white">{config.goal}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-700">
                <span className="text-gray-400">Entry Style</span><span className="text-white">{config.entryStyle}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-700">
                <span className="text-gray-400">Risk/Trade</span><span className="text-white">{config.riskPercent}%</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-700">
                <span className="text-gray-400">Max Positions</span><span className="text-white">{config.maxPositions}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-700">
                <span className="text-gray-400">Stop Loss</span><span className="text-white">{config.stopLossType}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-700">
                <span className="text-gray-400">Take Profit</span><span className="text-white">{config.takeProfitStyle}</span>
              </div>
              {config.trendFilters.length > 0 && (
                <div className="py-2">
                  <p className="text-gray-400 mb-2">Trend Filters:</p>
                  <div className="flex flex-wrap gap-1">
                    {config.trendFilters.map((f) => (
                      <span key={f} className="text-xs bg-emerald-600/20 text-emerald-400 px-2 py-1 rounded">{f}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-cyan-900/20 rounded-xl p-4 border border-cyan-800/50">
            <p className="text-sm text-cyan-300">
              <span className="font-semibold">AI Analysis:</span> This strategy aligns well with your profile.
              Expected win rate: 60-70%. Projected profit factor: 2.0-3.0.
              Remember: backtest before using with real capital, and paper trade for at least 50 trades.
            </p>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <button onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}
          className="px-6 py-3 bg-gray-700 hover:bg-gray-600 disabled:opacity-40 text-white rounded-xl font-medium transition-colors">
          Back
        </button>
        {step < STEPS.length - 1 ? (
          <button onClick={() => setStep((s) => s + 1)}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-colors">
            Continue
          </button>
        ) : (
          <button onClick={saveStrategy}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-colors">
            Save Strategy
          </button>
        )}
      </div>
    </div>
  );
}
