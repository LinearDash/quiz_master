import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

import { createSessionSchema, sessionSchema } from "@/lib/schemas/session";

export async function GET() {
  try {
    const sessions = await prisma.gameSession.findMany({
      include: {
        teams: true,
        rounds: {
          include: {
            _count: {
              select: {
                questions: true
              }
            }
          }
        },
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

    // Validate and transform the sessions to match our schema
    const validatedSessions = sessions.map(session =>
      sessionSchema.parse({
        ...session,
        createdAt: session.createdAt.toISOString(),
        teams: session.teams,
        rounds: session.rounds.map(round => ({
          ...round,
          createdAt: (round as any).createdAt ? (round as any).createdAt.toISOString() : new Date().toISOString(),
        })),
        _count: session._count,
      })
    );

    return NextResponse.json({ success: true, sessions: validatedSessions }, { status: 200 });
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
        rounds: {
          include: {
            _count: {
              select: {
                questions: true
              }
            }
          }
        },
        _count: {
          select: { teams: true, rounds: true }
        }
      }
    })
    // Transform the session data to match schema
    const transformedSession = {
      ...session,
      createdAt: session.createdAt.toISOString(),
      teams: session.teams,
      rounds: session.rounds.map(round => ({
        ...round,
        createdAt: (round as any).createdAt ? (round as any).createdAt.toISOString() : new Date().toISOString(),
      })),
      _count: session._count,
    };

    return NextResponse.json({ success: true, session: transformedSession }, { status: 201 })
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}

