import { NextResponse } from "next/server";
import type { ResumeData } from "@/types/types";
import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Prisma } from "@prisma/client";

interface DBResume {
  id: string;
  userId: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  linkedin: string | null;
  github: string | null;
  education: Array<{
    id: string;
    institution: string;
    degree: string;
    location: string;
    startDate: Date;
    endDate: Date | null;
    current: boolean;
    description: string | null;
  }>;
  experience: Array<{
    id: string;
    company: string;
    position: string;
    location: string;
    startDate: Date;
    endDate: Date | null;
    current: boolean;
    description: string[];
  }>;
  projects: Array<{
    id: string;
    name: string;
    startDate: Date | null;
    endDate: Date | null;
    current: boolean;
    description: string[];
  }>;
  skills: Array<{
    id: string;
    name: string;
    category: 'languages' | 'frameworks' | 'developer_tools' | 'libraries';
  }>;
}

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const data: ResumeData = await request.json();
    
    // Validate the data structure
    if (!data.personal) {
      return NextResponse.json(
        { success: false, error: "Missing personal information in the resume data" },
        { status: 400 }
      );
    }

    // Find existing resume for the user
    const existingResume = await prisma.resume.findFirst({
      where: { userId },
      include: {
        education: true,
        experience: true,
        projects: true,
        skills: true
      }
    });

    let resumeId = existingResume?.id;

    // If no resume exists, create one first
    if (!resumeId) {
      const newResume = await prisma.resume.create({
        data: {
          userId,
          name: data.personal.name,
          email: data.personal.email,
          phone: data.personal.phone,
          linkedin: data.personal.linkedin,
          github: data.personal.github
        }
      });
      resumeId = newResume.id;
    } else {
      // Update existing resume
      await prisma.resume.update({
        where: { id: resumeId },
        data: {
          name: data.personal.name,
          email: data.personal.email,
          phone: data.personal.phone,
          linkedin: data.personal.linkedin,
          github: data.personal.github
        }
      });
    }

    // After creating/updating the resume, handle education separately
    if (resumeId) {
      // Delete existing education entries
      await prisma.education.deleteMany({
        where: { resumeId }
      });

      if (data.education.length > 0) {
        // Create new education entries
        await prisma.education.createMany({
          data: data.education.map(edu => ({
            resumeId,
            institution: edu.institution,
            degree: edu.degree,
            location: edu.location,
            startDate: new Date(edu.startDate),
            endDate: edu.endDate ? new Date(edu.endDate) : null,
            current: edu.current,
            description: edu.description
          }))
        });
      }
    }

    // Handle experience entries
    if (data.experience.length > 0) {
      if (resumeId) {
        await prisma.experience.deleteMany({
          where: { resumeId: resumeId }
        });

        await prisma.experience.createMany({
          data: data.experience.map(exp => ({
            resumeId: resumeId,
            company: exp.company,
            position: exp.position,
            location: exp.location,
            startDate: new Date(exp.startDate),
            endDate: exp.endDate ? new Date(exp.endDate) : null,
            current: exp.current,
            description: exp.description
          }))
        });
      }
    }

    // Handle project entries
    if (data.projects.length > 0) {
      if (resumeId) {
        await prisma.project.deleteMany({
          where: { resumeId: resumeId }
        });

        await prisma.project.createMany({
          data: data.projects.map(proj => ({
            resumeId: resumeId,
            name: proj.name,
            startDate: proj.startDate ? new Date(proj.startDate) : null,
            endDate: proj.endDate ? new Date(proj.endDate) : null,
            current: proj.current,
            description: proj.description || ["", "", "", ""]
          }))
        });
      }
    }

    // Handle skills entries
    if (data.skills.length > 0) {
      if (resumeId) {
        await prisma.skill.deleteMany({
          where: { resumeId: resumeId }
        });

        await prisma.skill.createMany({
          data: data.skills.map(skill => ({
            resumeId: resumeId,
            name: skill.name,
            category: skill.category
          }))
        });
      }
    }

    // Fetch the updated resume with all relations
    const updatedResume = await prisma.$queryRaw<DBResume>`
      SELECT 
        r.*,
        COALESCE(json_agg(e.*) FILTER (WHERE e.id IS NOT NULL), '[]') as education,
        COALESCE(json_agg(ex.*) FILTER (WHERE ex.id IS NOT NULL), '[]') as experience,
        COALESCE(json_agg(p.*) FILTER (WHERE p.id IS NOT NULL), '[]') as projects,
        COALESCE(json_agg(s.*) FILTER (WHERE s.id IS NOT NULL), '[]') as skills
      FROM "Resume" r
      LEFT JOIN "Education" e ON e."resumeId" = r.id
      LEFT JOIN "Experience" ex ON ex."resumeId" = r.id
      LEFT JOIN "Project" p ON p."resumeId" = r.id
      LEFT JOIN "Skill" s ON s."resumeId" = r.id
      WHERE r.id = ${resumeId}
      GROUP BY r.id
    `;

    return NextResponse.json({ success: true, data: updatedResume });
  } catch (error) {
    console.error("Error saving resume:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save resume data" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const resume = await prisma.$queryRaw<DBResume>`
      SELECT 
        r.*,
        COALESCE(json_agg(e.*) FILTER (WHERE e.id IS NOT NULL), '[]') as education,
        COALESCE(json_agg(ex.*) FILTER (WHERE ex.id IS NOT NULL), '[]') as experience,
        COALESCE(json_agg(p.*) FILTER (WHERE p.id IS NOT NULL), '[]') as projects,
        COALESCE(json_agg(s.*) FILTER (WHERE s.id IS NOT NULL), '[]') as skills
      FROM "Resume" r
      LEFT JOIN "Education" e ON e."resumeId" = r.id
      LEFT JOIN "Experience" ex ON ex."resumeId" = r.id
      LEFT JOIN "Project" p ON p."resumeId" = r.id
      LEFT JOIN "Skill" s ON s."resumeId" = r.id
      WHERE r."userId" = ${userId}
      GROUP BY r.id
    `;

    if (!resume) {
      // Return empty data structure if no resume exists
      return NextResponse.json({
        success: true,
        data: {
          personal: {
            name: "",
            email: "",
            phone: "",
            linkedin: "",
            github: "",
          },
          education: [],
          experience: [],
          projects: [],
          skills: []
        }
      });
    }

    // Transform the data into the expected shape
    const transformedData: ResumeData = {
      personal: {
        name: resume.name || "",
        email: resume.email || "",
        phone: resume.phone || "",
        linkedin: resume.linkedin || "",
        github: resume.github || "",
      },
      education: Array.isArray(resume.education) ? resume.education.map(edu => ({
        id: edu.id,
        institution: edu.institution,
        degree: edu.degree,
        location: edu.location,
        startDate: new Date(edu.startDate),
        endDate: edu.endDate ? new Date(edu.endDate) : null,
        current: edu.current,
        description: edu.description
      })) : [],
      experience: Array.isArray(resume.experience) ? resume.experience.map(exp => ({
        id: exp.id,
        company: exp.company,
        position: exp.position,
        location: exp.location,
        startDate: new Date(exp.startDate),
        endDate: exp.endDate ? new Date(exp.endDate) : null,
        current: exp.current,
        description: exp.description
      })) : [],
      projects: Array.isArray(resume.projects) ? resume.projects.map(proj => ({
        id: proj.id,
        name: proj.name,
        startDate: proj.startDate ? new Date(proj.startDate) : null,
        endDate: proj.endDate ? new Date(proj.endDate) : null,
        current: proj.current,
        description: proj.description || ["", "", "", ""]
      })) : [],
      skills: Array.isArray(resume.skills) ? resume.skills.map(skill => ({
        id: skill.id,
        name: skill.name,
        category: skill.category as 'languages' | 'frameworks' | 'developer_tools' | 'libraries'
      })) : []
    };

    return NextResponse.json({ success: true, data: transformedData });
  } catch (error) {
    console.error("Error loading resume:", error);
    return NextResponse.json(
      { success: false, error: "Failed to load resume data" },
      { status: 500 }
    );
  }
}
