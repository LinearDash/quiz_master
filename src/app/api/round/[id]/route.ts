
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createRoundSchema } from "@/lib/schemas/round";


export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    const session = await prisma.gameSession.findUnique({
      where: { id },
      select: { id: true } // Only select id for efficiency
    });

    if (!session) {
      return NextResponse.json(
        { success: false, error: "Game Session not found" },
        { status: 404 }
      );
    }

    const rounds = await prisma.round.findMany({
      where: { gameSessionId: id },
      include: {
        _count: {
          select: {
            questions: true,
            scoreHistories: true
          }
        }
      },
      orderBy: { createdAt: 'asc' } // Order by creation time
    });

    return NextResponse.json({ success: true, rounds }, { status: 200 })
  } catch (error) {
    console.error("Error fetching rounds:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await req.json();

    const parseData = createRoundSchema.safeParse({ ...body, gameSessionId: id })

    if (!parseData.success) {
      return NextResponse.json({ success: false, error: parseData.error }, { status: 400 })
    }
    const {
      name,
      gameMode,
      pointsPerQuestion,
      totalQuestions,
      durationInSeconds,
      gameSessionId
    } = parseData.data;

    //find a session which gameSessionId 
    const session = await prisma.gameSession.findUnique({
      where: { id: gameSessionId }
    })

    //return error if the session doesn't exists
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Game Session not found" },
        { status: 404 })
    }

    //create a Round
    const round = await prisma.round.create({
      data: {
        name,
        gameMode,
        pointsPerQuestion,
        totalQuestions,
        durationInSeconds,
        gameSessionId
      }
    })
    return NextResponse.json(
      { success: true, round },
      { status: 201 }
    )
  } catch (error) {

    console.error("Error creating round:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}