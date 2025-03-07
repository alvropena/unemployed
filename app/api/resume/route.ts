import { NextRequest, NextResponse } from "next/server";
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
  languages: string[];
  frameworks: string[];
  developer_tools: string[];
  libraries: string[];
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
    languages: [],
    frameworks: [],
    developer_tools: [],
    libraries: []
  };

  if (typeof data !== 'object' || data === null) {
    return defaultSkills;
  }

  try {
    const parsed = typeof data === 'string' ? JSON.parse(data) : data;
    return {
      languages: Array.isArray(parsed.languages) ? parsed.languages : [],
      frameworks: Array.isArray(parsed.frameworks) ? parsed.frameworks : [],
      developer_tools: Array.isArray(parsed.developer_tools) ? parsed.developer_tools : [],
      libraries: Array.isArray(parsed.libraries) ? parsed.libraries : []
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
            languages: [],
            frameworks: [],
            developer_tools: [],
            libraries: []
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
      languages: Array.isArray(resumeData.skills?.languages) ? resumeData.skills.languages : [],
      frameworks: Array.isArray(resumeData.skills?.frameworks) ? resumeData.skills.frameworks : [],
      developer_tools: Array.isArray(resumeData.skills?.developer_tools) ? resumeData.skills.developer_tools : [],
      libraries: Array.isArray(resumeData.skills?.libraries) ? resumeData.skills.libraries : []
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
        education: education as any,
        experience: experience as any,
        projects: projects as any,
        skills: skills as any
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
        education: education as any,
        experience: experience as any,
        projects: projects as any,
        skills: skills as any
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving resume data:", error);
    return NextResponse.json({ error: "Failed to save resume data" }, { status: 500 });
  }
} 