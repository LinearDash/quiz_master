
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createRoundSchema } from "@/lib/schemas/round";

export async function POST(req: NextRequest) {
  try {

    const body = await req.json();

    const parseData = createRoundSchema.safeParse(body)

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