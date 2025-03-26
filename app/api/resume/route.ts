import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import type { Prisma } from "@prisma/client";

interface Education {
  institution: string;
  location: string;
  degree: string;
  date: string;
}

interface Experience {
  title: string;
  company: string;
  location: string;
  date: string;
  responsibilities: string[];
}

interface Project {
  name: string;
  technologies: string;
  date: string;
  details: string[];
}

interface Skills {
  languages: string;
  frameworks: string;
  tools: string;
  libraries: string;
}

// Type guards
function isEducation(item: unknown): item is Education {
  return (
    typeof item === 'object' &&
    item !== null &&
    'institution' in item &&
    'location' in item &&
    'degree' in item &&
    'date' in item
  );
}

function isExperience(item: unknown): item is Experience {
  return (
    typeof item === 'object' &&
    item !== null &&
    'title' in item &&
    'company' in item &&
    'location' in item &&
    'date' in item &&
    'responsibilities' in item &&
    Array.isArray((item as Experience).responsibilities)
  );
}

function isProject(item: unknown): item is Project {
  return (
    typeof item === 'object' &&
    item !== null &&
    'name' in item &&
    'technologies' in item &&
    'date' in item &&
    'details' in item &&
    Array.isArray((item as Project).details)
  );
}

// Helper functions to safely cast arrays
function safeParseEducation(data: unknown): Education[] {
  if (!Array.isArray(data)) return [];
  return data.filter(isEducation);
}

function safeParseExperience(data: unknown): Experience[] {
  if (!Array.isArray(data)) return [];
  return data.filter(isExperience);
}

function safeParseProjects(data: unknown): Project[] {
  if (!Array.isArray(data)) return [];
  return data.filter(isProject);
}

// Helper function to parse skills
function parseSkills(data: unknown): Skills {
  const defaultSkills: Skills = {
    languages: "",
    frameworks: "",
    tools: "",
    libraries: ""
  };

  if (typeof data !== 'object' || data === null) {
    return defaultSkills;
  }

  try {
    const parsed = typeof data === 'string' ? JSON.parse(data) : data;
    return {
      languages: typeof parsed.languages === 'string' ? parsed.languages : defaultSkills.languages,
      frameworks: typeof parsed.frameworks === 'string' ? parsed.frameworks : defaultSkills.frameworks,
      tools: typeof parsed.tools === 'string' ? parsed.tools : defaultSkills.tools,
      libraries: typeof parsed.libraries === 'string' ? parsed.libraries : defaultSkills.libraries
    };
  } catch {
    return defaultSkills;
  }
}

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
          personal: {
            name: "",
            email: "",
            phone: "",
            location: "",
            website: "",
            linkedin: "",
            github: ""
          },
          education: [],
          experience: [],
          projects: [],
          skills: {
            languages: "",
            frameworks: "",
            tools: "",
            libraries: ""
          }
        }
      });
    }

    // Parse the JSON data from the database
    const parsedEducation = safeParseEducation(resume.education);
    const parsedExperience = safeParseExperience(resume.experience);
    const parsedProjects = safeParseProjects(resume.projects);
    const parsedSkills = parseSkills(resume.skills);

    // Format the data to match the expected structure in the frontend
    const resumeData = {
      personal: {
        name: resume.name || "",
        email: resume.email || "",
        phone: resume.phone || "",
        location: resume.location || "",
        website: resume.website || "",
        linkedin: resume.linkedin || "",
        github: resume.github || ""
      },
      education: parsedEducation,
      experience: parsedExperience,
      projects: parsedProjects,
      skills: parsedSkills
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

    // Convert arrays to JSON-compatible objects
    const education = safeParseEducation(resumeData.education);
    const experience = safeParseExperience(resumeData.experience);
    const projects = safeParseProjects(resumeData.projects);
    const skills = {
      languages: typeof resumeData.skills?.languages === 'string' ? resumeData.skills.languages : "",
      frameworks: typeof resumeData.skills?.frameworks === 'string' ? resumeData.skills.frameworks : "",
      tools: typeof resumeData.skills?.tools === 'string' ? resumeData.skills.tools : "",
      libraries: typeof resumeData.skills?.libraries === 'string' ? resumeData.skills.libraries : ""
    };

    // Save resume data
    await prisma.resume.upsert({
      where: { userId },
      update: {
        name: resumeData.personal?.name || "",
        email: resumeData.personal?.email || "",
        phone: resumeData.personal?.phone || "",
        location: resumeData.personal?.location || "",
        website: resumeData.personal?.website || "",
        linkedin: resumeData.personal?.linkedin || "",
        github: resumeData.personal?.github || "",
        education: education as unknown as Prisma.InputJsonValue[],
        experience: experience as unknown as Prisma.InputJsonValue[],
        projects: projects as unknown as Prisma.InputJsonValue[],
        skills: skills as unknown as Prisma.InputJsonValue
      },
      create: {
        userId,
        name: resumeData.personal?.name || "",
        email: resumeData.personal?.email || "",
        phone: resumeData.personal?.phone || "",
        location: resumeData.personal?.location || "",
        website: resumeData.personal?.website || "",
        linkedin: resumeData.personal?.linkedin || "",
        github: resumeData.personal?.github || "",
        education: education as unknown as Prisma.InputJsonValue[],
        experience: experience as unknown as Prisma.InputJsonValue[],
        projects: projects as unknown as Prisma.InputJsonValue[],
        skills: skills as unknown as Prisma.InputJsonValue
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving resume data:", error);
    return NextResponse.json({ error: "Failed to save resume data" }, { status: 500 });
  }
} 