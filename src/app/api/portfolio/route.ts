import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUserId } from "@/lib/auth";
import { getQuote } from "@/lib/market-data";

export async function GET() {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const portfolio = await prisma.portfolio.findUnique({
      where: { userId },
      include: {
        positions: {
          where: { status: "open" },
          orderBy: { openedAt: "desc" },
        },
      },
    });

    if (!portfolio) {
      return NextResponse.json({ error: "Portfolio not found" }, { status: 404 });
    }

    // Update current prices from market data
    let positionValue = 0;
    const positions = portfolio.positions.map((pos) => {
      const quote = getQuote(pos.symbol);
      const currentPrice = quote?.price || pos.currentPrice;
      const unrealizedPnl = (currentPrice - pos.entryPrice) * pos.quantity * (pos.side === "short" ? -1 : 1);
      positionValue += currentPrice * pos.quantity;

      return {
        id: pos.id,
        symbol: pos.symbol,
        assetType: pos.assetType,
        side: pos.side,
        quantity: pos.quantity,
        entryPrice: pos.entryPrice,
        currentPrice,
        stopLoss: pos.stopLoss,
        takeProfit: pos.takeProfit,
        unrealizedPnl,
        strategy: pos.strategy,
        openedAt: pos.openedAt.toISOString(),
      };
    });

    const totalValue = portfolio.cashBalance + positionValue;
    const totalPnl = totalValue - portfolio.startingCapital;
    const totalPnlPercent = (totalPnl / portfolio.startingCapital) * 100;

    // Get trading stats
    const closedTrades = await prisma.trade.findMany({
      where: { userId, status: { in: ["closed", "stopped"] } },
    });

    const winners = closedTrades.filter((t) => (t.pnl || 0) > 0);
    const losers = closedTrades.filter((t) => (t.pnl || 0) < 0);
    const totalWinAmount = winners.reduce((s, t) => s + (t.pnl || 0), 0);
    const totalLossAmount = Math.abs(losers.reduce((s, t) => s + (t.pnl || 0), 0));

    const stats = {
      totalTrades: closedTrades.length,
      winningTrades: winners.length,
      losingTrades: losers.length,
      winRate: closedTrades.length > 0 ? (winners.length / closedTrades.length) * 100 : 0,
      avgWinner: winners.length > 0 ? totalWinAmount / winners.length : 0,
      avgLoser: losers.length > 0 ? -totalLossAmount / losers.length : 0,
      largestWin: winners.length > 0 ? Math.max(...winners.map((t) => t.pnl || 0)) : 0,
      largestLoss: losers.length > 0 ? Math.min(...losers.map((t) => t.pnl || 0)) : 0,
      profitFactor: totalLossAmount > 0 ? totalWinAmount / totalLossAmount : totalWinAmount > 0 ? 999 : 0,
    };

    return NextResponse.json({
      startingCapital: portfolio.startingCapital,
      cashBalance: portfolio.cashBalance,
      totalValue,
      totalPnl,
      totalPnlPercent,
      todayPnl: portfolio.todayPnl,
      weekPnl: portfolio.weekPnl,
      monthPnl: portfolio.monthPnl,
      positions,
      stats,
    });
  } catch (error) {
    console.error("Portfolio error:", error);
    return NextResponse.json({ error: "Failed to load portfolio" }, { status: 500 });
  }
}
