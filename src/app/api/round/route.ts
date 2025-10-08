
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    //Getting all the data from body/request
    const {
      name,
      gameMode,
      gameSessionId,
      pointsPerQuestion = 10,
      totalQuestions = null,
      durationInSeconds = null
    } = body;

    //return error if gamesessionId is not passed or is undefine
    if (!gameSessionId) {
      return NextResponse.json(
        { success: false, error: "Game Session Id  is required" },
        { status: 400 })
    }

    //return error if gamemode is not passed or is undefine

    if (!gameMode) {
      return NextResponse.json(
        { success: false, error: "Game Mode  is required" },
        { status: 400 })
    }

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