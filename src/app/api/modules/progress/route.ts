import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUserId } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { moduleId, sectionId, completed, quizScore } = await request.json();

    await prisma.moduleProgress.upsert({
      where: { userId_moduleId: { userId, moduleId } },
      update: {
        completed: completed ?? true,
        quizScore,
        completedAt: completed ? new Date() : null,
      },
      create: {
        userId,
        moduleId,
        sectionId,
        completed: completed ?? true,
        quizScore,
        completedAt: completed ? new Date() : null,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Module progress error:", error);
    return NextResponse.json({ error: "Failed to update progress" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const progress = await prisma.moduleProgress.findMany({
      where: { userId, completed: true },
      select: { moduleId: true },
    });

    return NextResponse.json({
      completedModules: progress.map((p) => p.moduleId),
    });
  } catch (error) {
    console.error("Module progress fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch progress" }, { status: 500 });
  }
}
