import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

import { createSessionSchema, sessionSchema } from "@/lib/schemas/session";

export async function GET() {
  try {
    const sessions = await prisma.gameSession.findMany({
      include: {
        teams: true,
        rounds: true,
        _count: {
          select: {
            teams: true,
            rounds: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json({ success: true, sessions }, { status: 200 });
  } catch (error) {
    console.error("Error fetching sessions:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parseResult = createSessionSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json({ success: false, error: parseResult.error }, { status: 400 });
    }
    const { eventName, organizerName, organizerImage } = parseResult.data;

    //create a new session
    const session = await prisma.gameSession.create({
      data: { eventName, organizerName, organizerImage: organizerImage || null },
      include: {
        teams: true,
        rounds: true,
        _count: {
          select: { teams: true, rounds: true }
        }
      }
    })
    return NextResponse.json({ success: true, session }, { status: 201 })
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}

