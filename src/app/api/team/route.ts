import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    //Getting all the data from body/request
    const {
      gameSessionId,
      name

    } = body;

    console.log(name);

    //return error if gameSessionId is not provided
    if (!gameSessionId) {
      return NextResponse.json(
        { success: false, error: "GameSessionId is required" },
        { status: 400 }
      )
    }
    //return error if name is provided
    if (!name || typeof name !== "string") {
      return NextResponse.json(
        { success: false, error: "Team Name is required" },
        { status: 400 }
      )
    }

    // Check if session exists
    const session = await prisma.gameSession.findUnique({
      where: { id: gameSessionId },
    });

    if (!session) {
      return NextResponse.json(
        { success: false, error: "Game session not found" },
        { status: 404 }
      );
    }

    //Create a team

    const team = await prisma.team.create({
      data: {
        name,
        gameSessionId
      }
    })

    return NextResponse.json({ success: true, team }, { status: 201 })
  } catch (error) {
    console.error("Error creating team:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}