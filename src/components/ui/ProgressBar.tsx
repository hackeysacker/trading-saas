"use client";

interface ProgressBarProps {
  value: number;
  max: number;
  label?: string;
  color?: string;
  showPercent?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function ProgressBar({ value, max, label, color = "emerald", showPercent = true, size = "md" }: ProgressBarProps) {
  const percent = max > 0 ? Math.min(100, (value / max) * 100) : 0;
  const heights = { sm: "h-1.5", md: "h-2.5", lg: "h-4" };
  const colorMap: Record<string, string> = {
    emerald: "bg-emerald-500",
    cyan: "bg-cyan-500",
    yellow: "bg-yellow-500",
    red: "bg-red-500",
    blue: "bg-blue-500",
    purple: "bg-purple-500",
  };

  return (
    <div className="w-full">
      {(label || showPercent) && (
        <div className="flex justify-between items-center mb-1">
          {label && <span className="text-xs text-gray-400">{label}</span>}
          {showPercent && <span className="text-xs text-gray-400">{percent.toFixed(0)}%</span>}
        </div>
      )}
      <div className={`w-full bg-gray-700 rounded-full ${heights[size]}`}>
        <div
          className={`${colorMap[color] || "bg-emerald-500"} ${heights[size]} rounded-full transition-all duration-500`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
