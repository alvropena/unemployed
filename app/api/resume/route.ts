import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";

// GET endpoint to retrieve resume data for the authenticated user
export async function GET() {
  const authResult = await auth();
  const userId = authResult.userId;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const resume = await prisma.resume.findUnique({
      where: { userId }
    });

    if (!resume) {
      return NextResponse.json({ 
        data: {
          name: "",
          email: "",
          phone: "",
          location: "",
          website: "",
          education: [],
          experience: [],
          projects: [],
          technicalSkills: [],
          softSkills: [],
          languages: []
        } 
      });
    }

    // Format the data to match the expected structure in the frontend
    const resumeData = {
      personal: {
        name: resume.name || "",
        email: resume.email || "",
        phone: resume.phone || "",
        location: resume.location || "",
        website: resume.website || "",
      },
      education: resume.education as any[],
      experience: resume.experience as any[],
      projects: resume.projects as any[],
      skills: {
        technical: resume.technicalSkills,
        soft: resume.softSkills,
        languages: resume.languages,
      }
    };

    return NextResponse.json({ data: resumeData });
  } catch (error) {
    console.error("Error fetching resume data:", error);
    return NextResponse.json({ error: "Failed to fetch resume data" }, { status: 500 });
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

    // Ensure user exists
    await prisma.user.upsert({
      where: { id: userId },
      update: {},
      create: {
        id: userId,
        email: resumeData.personal?.email || "unknown",
      },
    });

    // Save resume data
    await prisma.resume.upsert({
      where: { userId },
      update: {
        name: resumeData.personal?.name || "",
        email: resumeData.personal?.email || "",
        phone: resumeData.personal?.phone || "",
        location: resumeData.personal?.location || "",
        website: resumeData.personal?.website || "",
        education: resumeData.education || [],
        experience: resumeData.experience || [],
        projects: resumeData.projects || [],
        technicalSkills: resumeData.skills?.technical || [],
        softSkills: resumeData.skills?.soft || [],
        languages: resumeData.skills?.languages || [],
      },
      create: {
        userId,
        name: resumeData.personal?.name || "",
        email: resumeData.personal?.email || "",
        phone: resumeData.personal?.phone || "",
        location: resumeData.personal?.location || "",
        website: resumeData.personal?.website || "",
        education: resumeData.education || [],
        experience: resumeData.experience || [],
        projects: resumeData.projects || [],
        technicalSkills: resumeData.skills?.technical || [],
        softSkills: resumeData.skills?.soft || [],
        languages: resumeData.skills?.languages || [],
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving resume data:", error);
    return NextResponse.json({ error: "Failed to save resume data" }, { status: 500 });
  }
} 