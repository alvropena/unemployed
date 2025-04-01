"use client";

import React, { useState, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ResumeData } from "@/types/types";
import { useResumeData } from "@/hooks/useResumeData";
import { useFormHandlers } from "@/hooks/useFormHandlers";
import { useDebounce } from "@/hooks/useDebounce";
import { saveResumeData } from "@/lib/resumeUtils";

import SkillsForm from "./form/SkillsForm";
import PersonalForm from "./form/PersonalForm";
import ProjectsForm from "./form/ProjectsForm";
import EducationForm from "./form/EducationForm";
import ExperienceForm from "./form/ExperienceForm";

interface ResumeFormProps {
  data: ResumeData;
  setData: React.Dispatch<React.SetStateAction<ResumeData>>;
}

type TabType = "personal" | "education" | "experience" | "projects" | "skills";

const ALL_TABS: TabType[] = [
  "personal",
  "education",
  "experience",
  "projects",
  "skills",
];

export default function ResumeForm({ data, setData }: ResumeFormProps) {
  const [activeTab, setActiveTab] = useState<TabType>("personal");
  const [isSaving, setIsSaving] = useState(false);
  const { isLoading } = useResumeData(setData, data);
  const {
    updatePersonal,
    updateEducation,
    updateExperience,
    updateProject,
    updateSkills,
  } = useFormHandlers(setData, setIsSaving);

  // Debounce the data changes for 1 second
  const debouncedData = useDebounce(data, 1000);

  // Auto-save effect
  React.useEffect(() => {
    const saveData = async () => {
      if (!isLoading) {
        setIsSaving(true);
        try {
          await saveResumeData(debouncedData);
        } catch (error) {
          console.error("Error saving resume:", error);
        } finally {
          setIsSaving(false);
        }
      }
    };

    saveData();
  }, [debouncedData, isLoading]);

  // Get the current window of 3 tabs based on active tab
  const visibleTabs = useMemo(() => {
    const currentIndex = ALL_TABS.indexOf(activeTab);
    let startIndex = currentIndex - 1;

    // Handle edge cases
    if (startIndex < 0) startIndex = 0;
    if (startIndex > ALL_TABS.length - 3) startIndex = ALL_TABS.length - 3;

    return ALL_TABS.slice(startIndex, startIndex + 3);
  }, [activeTab]);

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      ) : (
        <>
          <div id="resume-preview">
            <Tabs
              value={activeTab}
              onValueChange={(value) => setActiveTab(value as TabType)}
            >
              <TabsList className="flex w-full gap-1 mb-4">
                {/* Show all tabs on desktop */}
                <div className="hidden md:flex w-full gap-1">
                  {ALL_TABS.map((tab) => (
                    <TabsTrigger
                      key={`desktop-${tab}`}
                      value={tab}
                      className="flex-1 capitalize"
                    >
                      {tab}
                    </TabsTrigger>
                  ))}
                </div>
                {/* Show only 3 tabs on mobile */}
                <div className="flex md:hidden w-full gap-1">
                  {visibleTabs.map((tab) => (
                    <TabsTrigger
                      key={`mobile-${tab}`}
                      value={tab}
                      className="flex-1 capitalize"
                    >
                      {tab}
                    </TabsTrigger>
                  ))}
                </div>
              </TabsList>

              <TabsContent value="personal" className="space-y-4">
                <PersonalForm
                  personal={data.personal}
                  updatePersonal={updatePersonal}
                  onContinue={() => setActiveTab("education")}
                />
              </TabsContent>

              <TabsContent value="education" className="space-y-4">
                <EducationForm
                  education={data.education}
                  updateEducation={updateEducation}
                  onContinue={() => setActiveTab("experience")}
                  onBack={() => setActiveTab("personal")}
                />
              </TabsContent>

              <TabsContent value="experience" className="space-y-4">
                <ExperienceForm
                  experience={data.experience}
                  updateExperience={updateExperience}
                  onContinue={() => setActiveTab("projects")}
                  onBack={() => setActiveTab("education")}
                />
              </TabsContent>

              <TabsContent value="projects" className="space-y-4">
                <ProjectsForm
                  projects={data.projects}
                  updateProject={updateProject}
                  onContinue={() => setActiveTab("skills")}
                  onBack={() => setActiveTab("experience")}
                />
              </TabsContent>

              <TabsContent value="skills" className="space-y-4">
                <SkillsForm 
                  skills={data.skills} 
                  updateSkills={updateSkills}
                  onBack={() => setActiveTab("projects")}
                />
              </TabsContent>
            </Tabs>
          </div>
        </>
      )}
    </>
  );
}
