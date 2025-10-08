import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    const session = prisma.gameSession.findUnique({
      where: { id },
      include: {
        teams: {
          include: {
            scoreHistory: true
          }
        },
        rounds: {
          include: {
            questions: true
          }
        }
      }
    })

    if (!session) {
      return NextResponse.json(
        { success: false, error: "GameSession not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, session }, { status: 200 });
  } catch (error) {
    console.error("Error fetching session:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

