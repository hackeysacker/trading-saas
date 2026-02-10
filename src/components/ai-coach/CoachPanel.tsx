"use client";

import type { AICoachMessage } from "@/types";

interface CoachPanelProps {
  messages: AICoachMessage[];
  onDismiss: (index: number) => void;
}

export default function CoachPanel({ messages, onDismiss }: CoachPanelProps) {
  if (messages.length === 0) return null;

  const typeStyles = {
    info: "border-blue-800 bg-blue-900/20",
    warning: "border-yellow-800 bg-yellow-900/20",
    alert: "border-red-800 bg-red-900/20",
    coaching: "border-cyan-800 bg-cyan-900/20",
    celebration: "border-emerald-800 bg-emerald-900/20",
  };

  const typeIcons = {
    info: "💡",
    warning: "⚠️",
    alert: "🚨",
    coaching: "🤖",
    celebration: "🎉",
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-wide">AI Coach</h3>
      {messages.slice(0, 5).map((msg, i) => (
        <div key={i} className={`rounded-xl p-4 border ${typeStyles[msg.type]}`}>
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span>{typeIcons[msg.type]}</span>
                <h4 className="text-sm font-semibold text-white">{msg.title}</h4>
              </div>
              <p className="text-sm text-gray-300">{msg.message}</p>
              {msg.suggestions && msg.suggestions.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {msg.suggestions.map((s, si) => (
                    <button key={si} className="text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 px-3 py-1 rounded-full transition-colors">
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => onDismiss(i)} className="text-gray-500 hover:text-gray-300 text-sm">&times;</button>
          </div>
        </div>
      ))}
    </div>
  );
}
