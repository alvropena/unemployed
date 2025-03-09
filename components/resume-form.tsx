"use client";

import type React from "react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ResumeData } from "@/lib/types";
import { useResumeData } from "@/hooks/use-resume-data";
import { useFormHandlers } from "@/hooks/use-form-handlers";
import ResumeFormActions from "./resume-form-actions";
import SkillsForm from "./skills-form";
import PersonalForm from "./personal-form";
import ProjectsForm from "./projects-form";
import EducationForm from "./education-form";
import ExperienceForm from "./experience-form";

interface ResumeFormProps {
	data: ResumeData;
	setData: React.Dispatch<React.SetStateAction<ResumeData>>;
}

export default function ResumeForm({ data, setData }: ResumeFormProps) {
	const [activeTab, setActiveTab] = useState("personal");
	const { isLoading } = useResumeData(setData, data);
	const { 
		updatePersonal,
		addEducation, updateEducation, removeEducation,
		addExperience, updateExperience, removeExperience,
		addResponsibility, updateResponsibility, removeResponsibility,
		addProject, updateProject, removeProject,
		addProjectDetail, updateProjectDetail, removeProjectDetail,
		updateSkills
	} = useFormHandlers(setData);

	return (
		<>
			{isLoading ? (
				<div className="flex items-center justify-center h-40">
					<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
				</div>
			) : (
				<>
					<ResumeFormActions data={data} />

					<div id="resume-preview">
						<Tabs value={activeTab} onValueChange={setActiveTab}>
							<TabsList className="grid grid-cols-5 mb-4">
								<TabsTrigger value="personal">Personal</TabsTrigger>
								<TabsTrigger value="education">Education</TabsTrigger>
								<TabsTrigger value="experience">Experience</TabsTrigger>
								<TabsTrigger value="projects">Projects</TabsTrigger>
								<TabsTrigger value="skills">Skills</TabsTrigger>
							</TabsList>

							<TabsContent value="personal" className="space-y-4">
								<PersonalForm personal={data.personal} updatePersonal={updatePersonal} />
							</TabsContent>

							<TabsContent value="education" className="space-y-4">
								<EducationForm education={data.education} addEducation={addEducation} updateEducation={updateEducation} removeEducation={removeEducation} />
							</TabsContent>

							<TabsContent value="experience" className="space-y-4">
								<ExperienceForm experience={data.experience} addExperience={addExperience} updateExperience={updateExperience} removeExperience={removeExperience} addResponsibility={addResponsibility} updateResponsibility={updateResponsibility} removeResponsibility={removeResponsibility} />
							</TabsContent>

							<TabsContent value="projects" className="space-y-4">
								<ProjectsForm projects={data.projects} addProject={addProject} updateProject={updateProject} removeProject={removeProject} addProjectDetail={addProjectDetail} updateProjectDetail={updateProjectDetail} removeProjectDetail={removeProjectDetail} />
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
