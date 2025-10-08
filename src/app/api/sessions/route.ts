import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    //Getting all the data from body/request
    const { eventName, organizerImage, organizerName } = body;

    // return error if no event name is provided
    if (!eventName) {
      return NextResponse.json({ success: false, error: "Event Name is Required" },
        { status: 400 }
      )
    }

    //return error if no organizer Name is provided
    if (!organizerName) {
      return NextResponse.json({ success: false, error: "Event Organizer name is Required" },
        { status: 400 }
      )
    }

    //create a new session
    const session = await prisma.gameSession.create({
      data: { eventName, organizerName, organizerImage: organizerImage || null }
    })
    return NextResponse.json({ success: true, session }, { status: 201 })
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}

