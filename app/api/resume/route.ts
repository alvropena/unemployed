import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

// Simple in-memory storage (note: this will reset on server restart)
const memoryStore = new Map();

// GET endpoint to retrieve resume data for the authenticated user
export async function GET() {
  const authResult = await auth();
  const userId = authResult.userId;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Retrieve resume data from memory store using the user's ID as the key
    const resumeData = memoryStore.get(`resume:${userId}`);

    if (!resumeData) {
      return NextResponse.json({ error: "No resume data found" }, { status: 404 });
    }

    return NextResponse.json({ data: resumeData });
  } catch (error) {
    console.error("Error retrieving resume data:", error);
    return NextResponse.json({ error: "Failed to retrieve resume data" }, { status: 500 });
  }
}

// POST endpoint to save resume data for the authenticated user
export async function POST(request: NextRequest) {
  const authResult = await auth();
  const userId = authResult.userId;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const resumeData = await request.json();

    // Save resume data to memory store using the user's ID as the key
    memoryStore.set(`resume:${userId}`, resumeData);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving resume data:", error);
    return NextResponse.json({ error: "Failed to save resume data" }, { status: 500 });
  }
} 