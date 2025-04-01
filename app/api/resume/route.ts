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

    // Start a transaction to ensure all operations succeed or none do
    const result = await db.$transaction(async (tx) => {
      // Ensure user exists first
      await tx.user.upsert({
        where: { id: userId },
        create: { id: userId },
        update: {}
      });

      // Update or create personal information
      const personal = await tx.personal.upsert({
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
        await tx.education.deleteMany({
          where: { userId }
        });

        await tx.education.createMany({
          data: data.education.map(edu => ({
            userId,
            institution: edu.institution,
            degree: edu.degree,
            location: edu.location,
            current: edu.current
          }))
        });
      }

      // Handle experience entries
      if (data.experience.length > 0) {
        await tx.experience.deleteMany({
          where: { userId }
        });

        await tx.experience.createMany({
          data: data.experience.map(exp => ({
            userId,
            company: exp.company,
            position: exp.position,
            location: exp.location,
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
        await tx.project.deleteMany({
          where: { userId }
        });

        await tx.project.createMany({
          data: data.projects.map(proj => ({
            userId,
            name: proj.name,
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
        await tx.skill.deleteMany({
          where: { userId }
        });

        // Create a single skill entry with all skills
        const skillData = data.skills[0]; // Take the first skill object
        await tx.skill.create({
          data: {
            userId,
            languages: skillData.languages || null,
            frameworks: skillData.frameworks || null,
            developerTools: skillData.developerTools || null,
            libraries: skillData.libraries || null
          }
        });
      }

      // Fetch all updated resume data
      const [personalData, educationData, experienceData, projectsData, skillsData] = await Promise.all([
        tx.personal.findUnique({ where: { userId } }),
        tx.education.findMany({ where: { userId } }),
        tx.experience.findMany({ where: { userId } }),
        tx.project.findMany({ where: { userId } }),
        tx.skill.findFirst({ where: { userId } })
      ]);

      return {
        personal: personalData,
        education: educationData,
        experience: experienceData,
        projects: projectsData,
        skills: skillsData
      };
    });

    return NextResponse.json({
      success: true,
      data: result
    });

  } catch (error) {
    console.error('Error saving resume:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : "Failed to save resume data" 
      },
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
      { 
        success: false, 
        error: error instanceof Error ? error.message : "Failed to load resume data" 
      },
      { status: 500 }
    );
  }
}
