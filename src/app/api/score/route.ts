import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      teamId,
      roundId,
      questionId,
      points
    } = body;

    //Validation
    if (!teamId) {
      return NextResponse.json(
        { success: false, error: "teamId is required" },
        { status: 400 }
      );
    }

    if (!roundId) {
      return NextResponse.json(
        { success: false, error: "roundId is required" },
        { status: 400 }
      );
    }

    if (!questionId) {
      return NextResponse.json(
        { success: false, error: "questionId is required" },
        { status: 400 }
      );
    }

    if (typeof points !== "number") {
      return NextResponse.json(
        { success: false, error: "points must be a number" },
        { status: 400 }
      );
    }

    // Check if all referenced entities exist
    const [team, round, question] = await Promise.all([
      prisma.team.findUnique({ where: { id: teamId } }),
      prisma.round.findUnique({ where: { id: roundId } }),
      prisma.question.findUnique({ where: { id: questionId } }),
    ]);

    if (!team) {
      return NextResponse.json(
        { success: false, error: "Team not found" },
        { status: 404 }
      )
    }
    if (!round) {
      return NextResponse.json(
        { success: false, error: "Round not found" },
        { status: 404 }
      )
    }
    if (!question) {
      return NextResponse.json(
        { success: false, error: "Question not found" },
        { status: 404 }
      )
    }

    //Create Score history
    const score = await prisma.scoreHistory.create({
      data: {
        teamId,
        roundId,
        questionId,
        points
      }
    })

    return NextResponse.json(
      { success: true, score },
      { status: 201 }
    )
  } catch (error) {
    console.error("Error creating score history:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}