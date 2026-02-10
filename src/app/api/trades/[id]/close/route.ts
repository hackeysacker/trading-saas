import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUserId } from "@/lib/auth";
import { getQuote } from "@/lib/market-data";

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { id: positionId } = await params;

    const position = await prisma.position.findUnique({
      where: { id: positionId },
      include: { portfolio: true, trade: true },
    });

    if (!position || position.portfolio.userId !== userId) {
      return NextResponse.json({ error: "Position not found" }, { status: 404 });
    }

    const quote = getQuote(position.symbol);
    const exitPrice = quote?.price || position.currentPrice;
    const pnl = (exitPrice - position.entryPrice) * position.quantity * (position.side === "short" ? -1 : 1);
    const pnlPercent = ((exitPrice - position.entryPrice) / position.entryPrice) * 100 * (position.side === "short" ? -1 : 1);
    const holdTimeMinutes = Math.floor((Date.now() - position.openedAt.getTime()) / 60000);

    const riskReward = position.stopLoss && position.takeProfit
      ? Math.abs(position.takeProfit - position.entryPrice) / Math.abs(position.entryPrice - position.stopLoss)
      : null;

    // Close position
    await prisma.position.update({
      where: { id: positionId },
      data: { status: "closed", closedAt: new Date(), currentPrice: exitPrice, unrealizedPnl: pnl },
    });

    // Update trade
    if (position.trade) {
      await prisma.trade.update({
        where: { id: position.trade.id },
        data: {
          exitPrice,
          pnl,
          pnlPercent,
          riskReward,
          holdTime: holdTimeMinutes,
          status: "closed",
          closedAt: new Date(),
        },
      });
    }

    // Return cash + proceeds
    const proceeds = exitPrice * position.quantity;
    await prisma.portfolio.update({
      where: { id: position.portfolioId },
      data: {
        cashBalance: position.portfolio.cashBalance + proceeds,
        totalPnl: position.portfolio.totalPnl + pnl,
        totalPnlPercent: ((position.portfolio.totalPnl + pnl) / position.portfolio.startingCapital) * 100,
      },
    });

    return NextResponse.json({ success: true, pnl, pnlPercent, exitPrice });
  } catch (error) {
    console.error("Close trade error:", error);
    return NextResponse.json({ error: "Failed to close trade" }, { status: 500 });
  }
}
