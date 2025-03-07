import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { kv } from "@vercel/kv";
import { ResumeData } from "@/lib/types";

// GET endpoint to retrieve resume data for the authenticated user
export async function GET() {
  const authResult = await auth();
  const userId = authResult.userId;
  
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Retrieve resume data from KV store using the user's ID as the key
    const resumeData = await kv.get(`resume:${userId}`);
    
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
    
    // Save resume data to KV store using the user's ID as the key
    await kv.set(`resume:${userId}`, resumeData);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving resume data:", error);
    return NextResponse.json({ error: "Failed to save resume data" }, { status: 500 });
  }
} 