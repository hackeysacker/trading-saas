import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUserId } from "@/lib/auth";
import { getQuote } from "@/lib/market-data";

export async function POST(request: NextRequest) {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const body = await request.json();
    const { symbol, side, orderType, quantity, limitPrice, stopLoss, takeProfit, strategy } = body;

    if (!symbol || !side || !quantity) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const quote = getQuote(symbol);
    if (!quote) {
      return NextResponse.json({ error: "Symbol not found" }, { status: 404 });
    }

    const entryPrice = orderType === "limit" && limitPrice ? limitPrice : quote.price;
    const totalCost = entryPrice * quantity;

    const portfolio = await prisma.portfolio.findUnique({ where: { userId } });
    if (!portfolio) {
      return NextResponse.json({ error: "Portfolio not found" }, { status: 404 });
    }

    if (totalCost > portfolio.cashBalance) {
      return NextResponse.json({ error: "Insufficient funds" }, { status: 400 });
    }

    // Create position and trade
    const position = await prisma.position.create({
      data: {
        portfolioId: portfolio.id,
        symbol,
        assetType: quote.assetType,
        side: side === "short" ? "short" : "long",
        quantity,
        entryPrice,
        currentPrice: quote.price,
        stopLoss: stopLoss || null,
        takeProfit: takeProfit || null,
        strategy: strategy || null,
      },
    });

    await prisma.trade.create({
      data: {
        userId,
        positionId: position.id,
        symbol,
        assetType: quote.assetType,
        side: side === "short" ? "short" : "long",
        entryPrice,
        quantity,
        stopLoss: stopLoss || null,
        takeProfit: takeProfit || null,
        strategy: strategy || null,
        status: "open",
      },
    });

    // Update portfolio cash
    await prisma.portfolio.update({
      where: { id: portfolio.id },
      data: { cashBalance: portfolio.cashBalance - totalCost },
    });

    return NextResponse.json({ success: true, positionId: position.id });
  } catch (error) {
    console.error("Trade error:", error);
    return NextResponse.json({ error: "Failed to place trade" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const trades = await prisma.trade.findMany({
      where: { userId },
      orderBy: { openedAt: "desc" },
      take: 50,
    });

    return NextResponse.json({ trades });
  } catch (error) {
    console.error("Trades fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch trades" }, { status: 500 });
  }
}
