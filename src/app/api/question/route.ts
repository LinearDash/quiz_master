import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    //Getting all the data from body/request
    const {
      roundId,
      questionText,
      options,
      correctOptionIndex,
      mediaType = 'none',
      mediaUrl = null,
    } = body;

    //return error if roundId isn't provided or is undefine
    if (!roundId) {
      return NextResponse.json(
        { success: false, error: "RoundId is required" },
        { status: 400 }
      )
    }

    //return error if questionText isn't provided or isn't string
    if (!questionText || typeof questionText !== "string") {
      return NextResponse.json(
        { success: false, error: "Question Text is required" },
        { status: 400 }
      )
    }

    //return error if option isn't an array or length of option is less than 4
    if (!Array.isArray(options) || options.length < 4) {
      return NextResponse.json(
        { success: false, error: "At least four options are required" },
        { status: 400 }
      )
    }

    //return error if correctionOptionIndex is not a number or is smaller than 0 or is bigger than option.length
    if (
      typeof correctOptionIndex !== 'number' ||
      correctOptionIndex < 0 ||
      correctOptionIndex >= options.length
    ) {
      return NextResponse.json(
        { success: false, error: "Invalid CorrectOptionIndex" },
        { status: 400 }
      )
    }

    //Find the round
    const round = prisma.round.findUnique({
      where: { id: roundId }
    })

    if (!round) {
      return NextResponse.json(
        { success: false, error: "Couldn't find the round" },
        { status: 404 }
      )
    }

    //Create the question
    const question = prisma.question.create({
      data: {
        roundId,
        questionText,
        options,
        correctOptionIndex,
        mediaType,
        mediaUrl
      }
    })

    return NextResponse.json(
      { success: true, question },
      { status: 201 }
    )
  } catch (error) {
    console.error("Error creating question:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}