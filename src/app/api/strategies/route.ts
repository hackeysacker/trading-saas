import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUserId } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const body = await request.json();
    const { name, description, tradingStyle, assets, entryRules, exitRules, riskPerTrade, maxPositions, filters } = body;

    const strategy = await prisma.strategy.create({
      data: {
        userId,
        name: name || "Untitled Strategy",
        description,
        tradingStyle: tradingStyle || "swing",
        assets: assets || "Both",
        entryRules: entryRules || "[]",
        exitRules: exitRules || "{}",
        riskPerTrade: riskPerTrade || 1,
        maxPositions: maxPositions || 5,
        filters: filters || "[]",
      },
    });

    return NextResponse.json({ success: true, strategyId: strategy.id });
  } catch (error) {
    console.error("Strategy error:", error);
    return NextResponse.json({ error: "Failed to create strategy" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const strategies = await prisma.strategy.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ strategies });
  } catch (error) {
    console.error("Strategies fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch strategies" }, { status: 500 });
  }
}
