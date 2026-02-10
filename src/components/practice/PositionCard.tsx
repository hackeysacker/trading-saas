"use client";

interface Position {
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

interface PositionCardProps {
  position: Position;
  onClose: () => void;
}

export default function PositionCard({ position, onClose }: PositionCardProps) {
  const pnl = (position.currentPrice - position.entryPrice) * position.quantity * (position.side === "short" ? -1 : 1);
  const pnlPercent = ((position.currentPrice - position.entryPrice) / position.entryPrice) * 100 * (position.side === "short" ? -1 : 1);
  const positionValue = position.currentPrice * position.quantity;
  const isProfit = pnl >= 0;

  const stopDistance = position.stopLoss ? Math.abs(position.currentPrice - position.stopLoss) : null;
  const targetDistance = position.takeProfit ? Math.abs(position.takeProfit - position.currentPrice) : null;

  const rrRatio = position.stopLoss && position.takeProfit
    ? Math.abs(position.takeProfit - position.entryPrice) / Math.abs(position.entryPrice - position.stopLoss)
    : null;

  const holdTime = Math.floor((Date.now() - new Date(position.openedAt).getTime()) / 3600000);
  const holdDays = Math.floor(holdTime / 24);
  const holdHours = holdTime % 24;

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-white">{position.symbol}</span>
              <span className={`text-xs px-2 py-0.5 rounded ${
                position.assetType === "crypto" ? "bg-purple-600/20 text-purple-400" : "bg-blue-600/20 text-blue-400"
              }`}>
                {position.assetType.toUpperCase()}
              </span>
              <span className={`text-xs px-2 py-0.5 rounded ${
                position.side === "long" ? "bg-emerald-600/20 text-emerald-400" : "bg-red-600/20 text-red-400"
              }`}>
                {position.side.toUpperCase()}
              </span>
            </div>
          </div>
          <div className="text-right">
            <p className={`text-lg font-bold ${isProfit ? "text-emerald-400" : "text-red-400"}`}>
              {isProfit ? "+" : ""}{pnl >= 0 ? "+" : ""}${pnl.toFixed(2)}
            </p>
            <p className={`text-xs ${isProfit ? "text-emerald-400" : "text-red-400"}`}>
              {isProfit ? "+" : ""}{pnlPercent.toFixed(2)}%
            </p>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mb-3">
          <div>
            <p className="text-gray-500 text-xs">Entry</p>
            <p className="text-white font-medium">${position.entryPrice.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Current</p>
            <p className="text-white font-medium">${position.currentPrice.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Quantity</p>
            <p className="text-white font-medium">{position.quantity}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Value</p>
            <p className="text-white font-medium">${positionValue.toLocaleString()}</p>
          </div>
        </div>

        {/* Stop/Target */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mb-3">
          <div>
            <p className="text-gray-500 text-xs">Stop Loss</p>
            <p className="text-red-400 font-medium">
              {position.stopLoss ? `$${position.stopLoss.toLocaleString()}` : "Not set"}
            </p>
            {stopDistance && (
              <p className="text-xs text-gray-500">${stopDistance.toFixed(2)} away</p>
            )}
          </div>
          <div>
            <p className="text-gray-500 text-xs">Take Profit</p>
            <p className="text-emerald-400 font-medium">
              {position.takeProfit ? `$${position.takeProfit.toLocaleString()}` : "Not set"}
            </p>
            {targetDistance && (
              <p className="text-xs text-gray-500">${targetDistance.toFixed(2)} away</p>
            )}
          </div>
          <div>
            <p className="text-gray-500 text-xs">R:R Ratio</p>
            <p className={`font-medium ${rrRatio && rrRatio >= 2 ? "text-emerald-400" : "text-yellow-400"}`}>
              {rrRatio ? `1:${rrRatio.toFixed(1)}` : "N/A"}
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Hold Time</p>
            <p className="text-gray-300 font-medium">
              {holdDays > 0 ? `${holdDays}d ` : ""}{holdHours}h
            </p>
          </div>
        </div>

        {/* Strategy & Actions */}
        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500">
            {position.strategy && <span>Strategy: {position.strategy}</span>}
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-gray-700 hover:bg-red-600/80 text-gray-300 hover:text-white rounded-lg text-sm transition-colors"
          >
            Close Position
          </button>
        </div>
      </div>
    </div>
  );
}
