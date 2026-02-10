import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hashPassword, generateToken, getCurrentUserId } from "@/lib/auth";

const DEMO_EMAIL = "demo@tradingacademy.com";
const DEMO_USERNAME = "TradeMaster";

export async function POST() {
  try {
    // If already authenticated, just return the user
    const existingUserId = await getCurrentUserId();
    if (existingUserId) {
      const existingUser = await prisma.user.findUnique({
        where: { id: existingUserId },
        select: { id: true, email: true, username: true, displayName: true, tradingStyle: true, experienceLevel: true, createdAt: true },
      });
      if (existingUser) {
        return NextResponse.json({ user: existingUser });
      }
    }

    // Find or create demo user
    let user = await prisma.user.findUnique({ where: { email: DEMO_EMAIL } });

    if (!user) {
      const passwordHash = await hashPassword("demo123456");
      user = await prisma.user.create({
        data: {
          email: DEMO_EMAIL,
          username: DEMO_USERNAME,
          passwordHash,
          displayName: DEMO_USERNAME,
          experienceLevel: "beginner",
          portfolio: {
            create: {
              startingCapital: 100000,
              cashBalance: 100000,
              totalValue: 100000,
            },
          },
        },
      });
    }

    const token = generateToken(user.id);

    const response = NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        displayName: user.displayName,
        tradingStyle: user.tradingStyle,
        experienceLevel: user.experienceLevel,
        createdAt: user.createdAt,
      },
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Demo auth error:", error);
    return NextResponse.json({ error: "Failed to create demo session" }, { status: 500 });
  }
}
