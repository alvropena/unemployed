"use client";

import type React from "react";
import { useState, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ResumeData } from "@/lib/types";
import { useResumeData } from "@/hooks/use-resume-data";
import { useFormHandlers } from "@/hooks/use-form-handlers";

import SkillsForm from "./form/skills-form";
import PersonalForm from "./form/personal-form";
import ProjectsForm from "./form/projects-form";
import EducationForm from "./form/education-form";
import ExperienceForm from "./form/experience-form";
import { Button } from "./ui/button";
import { Save } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { saveResumeData } from "@/lib/resume-service";

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
  const { isLoading } = useResumeData(setData, data);
  const {
    updatePersonal,
    addEducation,
    updateEducation,
    removeEducation,
    addExperience,
    updateExperience,
    removeExperience,
    addResponsibility,
    updateResponsibility,
    removeResponsibility,
    addProject,
    updateProject,
    removeProject,
    addProjectDetail,
    updateProjectDetail,
    removeProjectDetail,
    updateSkills,
  } = useFormHandlers(setData);
	const [isSaving, setIsSaving] = useState(false);
	const { toast } = useToast();

  // Get the current window of 3 tabs based on active tab
  const visibleTabs = useMemo(() => {
    const currentIndex = ALL_TABS.indexOf(activeTab);
    let startIndex = currentIndex - 1;

    // Handle edge cases
    if (startIndex < 0) startIndex = 0;
    if (startIndex > ALL_TABS.length - 3) startIndex = ALL_TABS.length - 3;

    return ALL_TABS.slice(startIndex, startIndex + 3);
  }, [activeTab]);

  const handleSaveChanges = async () => {
		setIsSaving(true);
		try {
			const success = await saveResumeData(data);
			if (success) {
				toast({
					title: "Success",
					description: "Your resume has been saved successfully.",
				});
			} else {
				toast({
					title: "Error",
					description: "Failed to save your resume. Please try again.",
					variant: "destructive",
				});
			}
		} catch (error) {
			console.error("Error saving resume:", error);
			toast({
				title: "Error",
				description: "An unexpected error occurred. Please try again.",
				variant: "destructive",
			});
		} finally {
			setIsSaving(false);
		}
	};

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Resume Information</h2>
            <Button
              variant="default"
              className="flex items-center justify-center gap-2 w-full md:w-auto"
              onClick={handleSaveChanges}
              disabled={isSaving}
              size="sm"
            >
              <Save className="h-4 w-4" />
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>

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
                />
              </TabsContent>

              <TabsContent value="education" className="space-y-4">
                <EducationForm
                  education={data.education}
                  addEducation={addEducation}
                  updateEducation={updateEducation}
                  removeEducation={removeEducation}
                />
              </TabsContent>

              <TabsContent value="experience" className="space-y-4">
                <ExperienceForm
                  experience={data.experience}
                  addExperience={addExperience}
                  updateExperience={updateExperience}
                  removeExperience={removeExperience}
                  addResponsibility={addResponsibility}
                  updateResponsibility={updateResponsibility}
                  removeResponsibility={removeResponsibility}
                />
              </TabsContent>

              <TabsContent value="projects" className="space-y-4">
                <ProjectsForm
                  projects={data.projects}
                  addProject={addProject}
                  updateProject={updateProject}
                  removeProject={removeProject}
                  addProjectDetail={addProjectDetail}
                  updateProjectDetail={updateProjectDetail}
                  removeProjectDetail={removeProjectDetail}
                />
              </TabsContent>

              <TabsContent value="skills" className="space-y-4">
                <SkillsForm skills={data.skills} updateSkills={updateSkills} />
              </TabsContent>
            </Tabs>
          </div>
        </>
      )}
    </>
  );
}
