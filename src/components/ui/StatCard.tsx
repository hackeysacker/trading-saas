"use client";

interface StatCardProps {
  label: string;
  value: string | number;
  change?: number;
  prefix?: string;
  suffix?: string;
  color?: "green" | "red" | "neutral";
}

export default function StatCard({ label, value, change, prefix = "", suffix = "", color = "neutral" }: StatCardProps) {
  const effectiveColor = change !== undefined ? (change >= 0 ? "green" : "red") : color;
  const colorClasses = {
    green: "text-emerald-400",
    red: "text-red-400",
    neutral: "text-white",
  };

  return (
    <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
      <p className="text-xs text-gray-400 mb-1 uppercase tracking-wide">{label}</p>
      <p className={`text-xl font-bold ${colorClasses[effectiveColor]}`}>
        {prefix}{typeof value === "number" ? value.toLocaleString() : value}{suffix}
      </p>
      {change !== undefined && (
        <p className={`text-xs mt-1 ${change >= 0 ? "text-emerald-400" : "text-red-400"}`}>
          {change >= 0 ? "+" : ""}{change.toFixed(2)}%
        </p>
      )}
    </div>
  );
}
