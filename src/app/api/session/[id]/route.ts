import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sessionSchema } from "@/lib/schemas/session";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    const session = await prisma.gameSession.findUnique({
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
    console.log(session);


    // Transform and validate the session data with Zod
    const validatedSession = sessionSchema.parse({
      ...session,
      createdAt: session.createdAt.toISOString(),
      teams: session.teams,
      rounds: session.rounds,
      _count: {
        teams: session.teams.length,
        rounds: session.rounds.length,
      }
    });

    // console.log(validatedSession);

    return NextResponse.json({ success: true, session: validatedSession }, { status: 200 });
  } catch (error) {
    console.error("Error fetching session:", error);

    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

