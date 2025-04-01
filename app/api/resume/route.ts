import { NextResponse } from "next/server";
import type { ResumeData } from "@/types/types";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Prisma } from "@prisma/client";

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
    
    if (!data.personal) {
      return NextResponse.json(
        { success: false, error: "Missing personal information in the resume data" },
        { status: 400 }
      );
    }

    // Ensure user exists first
    await db.user.upsert({
      where: { id: userId },
      create: { id: userId },
      update: {}
    });

    // Update or create personal information
    const personal = await db.personal.upsert({
      where: { userId },
      create: {
        userId,
        name: data.personal.name,
        email: data.personal.email,
        phone: data.personal.phone,
        linkedin: data.personal.linkedin,
        github: data.personal.github
      },
      update: {
        name: data.personal.name,
        email: data.personal.email,
        phone: data.personal.phone,
        linkedin: data.personal.linkedin,
        github: data.personal.github
      }
    });

    // Handle education entries
    if (data.education.length > 0) {
      await db.education.deleteMany({
        where: { userId }
      });

      await db.education.createMany({
        data: data.education.map(edu => ({
          userId,
          institution: edu.institution,
          degree: edu.degree,
          location: edu.location,
          startDate: new Date(edu.startDate),
          endDate: edu.endDate ? new Date(edu.endDate) : null,
          current: edu.current
        }))
      });
    }

    // Handle experience entries
    if (data.experience.length > 0) {
      await db.experience.deleteMany({
        where: { userId }
      });

      await db.experience.createMany({
        data: data.experience.map(exp => ({
          userId,
          company: exp.company,
          position: exp.position,
          location: exp.location,
          startDate: new Date(exp.startDate),
          endDate: exp.endDate ? new Date(exp.endDate) : null,
          current: exp.current,
          responsibilityOne: exp.responsibilityOne || null,
          responsibilityTwo: exp.responsibilityTwo || null,
          responsibilityThree: exp.responsibilityThree || null,
          responsibilityFour: exp.responsibilityFour || null
        }))
      });
    }

    // Handle project entries
    if (data.projects.length > 0) {
      await db.project.deleteMany({
        where: { userId }
      });

      await db.project.createMany({
        data: data.projects.map(proj => ({
          userId,
          name: proj.name,
          startDate: proj.startDate ? new Date(proj.startDate) : null,
          endDate: proj.endDate ? new Date(proj.endDate) : null,
          current: proj.current,
          responsibilityOne: proj.responsibilityOne || null,
          responsibilityTwo: proj.responsibilityTwo || null,
          responsibilityThree: proj.responsibilityThree || null,
          responsibilityFour: proj.responsibilityFour || null
        }))
      });
    }

    // Handle skills
    if (data.skills.length > 0) {
      await db.skill.deleteMany({
        where: { userId }
      });

      // Create a single skill entry with all skills
      const skillData = data.skills[0]; // Take the first skill object
      await db.skill.create({
        data: {
          userId,
          languages: skillData.languages || null,
          frameworks: skillData.frameworks || null,
          developerTools: skillData.developerTools || null,
          libraries: skillData.libraries || null
        }
      });
    }

    // Fetch all resume data
    const [personalData, educationData, experienceData, projectsData, skillsData] = await Promise.all([
      db.personal.findUnique({ where: { userId } }),
      db.education.findMany({ where: { userId } }),
      db.experience.findMany({ where: { userId } }),
      db.project.findMany({ where: { userId } }),
      db.skill.findFirst({ where: { userId } })
    ]);

    return NextResponse.json({
      success: true,
      data: {
        personal: personalData,
        education: educationData,
        experience: experienceData,
        projects: projectsData,
        skills: skillsData
      }
    });

  } catch (error) {
    console.error('Error saving resume:', error);
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
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const [personalData, educationData, experienceData, projectsData, skillsData] = await Promise.all([
      db.personal.findUnique({ where: { userId } }),
      db.education.findMany({ where: { userId } }),
      db.experience.findMany({ where: { userId } }),
      db.project.findMany({ where: { userId } }),
      db.skill.findFirst({ where: { userId } })
    ]);

    return NextResponse.json({
      success: true,
      data: {
        personal: personalData,
        education: educationData,
        experience: experienceData,
        projects: projectsData,
        skills: skillsData
      }
    });

  } catch (error) {
    console.error('Error loading resume:', error);
    return NextResponse.json(
      { success: false, error: "Failed to load resume data" },
      { status: 500 }
    );
  }
}
