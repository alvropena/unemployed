"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save } from "lucide-react";
import type { ResumeData } from "@/lib/types";
import { useToast } from "@/components/ui/use-toast";
import {
	saveResumeData,
	loadResumeData,
	saveResumeDataLocally,
} from "@/lib/resume-service";
import { defaultResumeData } from "@/lib/default-data";
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
	const [isSaving, setIsSaving] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const { toast } = useToast();

	useEffect(() => {
		const fetchResumeData = async () => {
			setIsLoading(true);
			const savedData = await loadResumeData();
			if (savedData) {
				setData(savedData);
			} else {
				// Initialize with defaultResumeData directly
				setData({
					personal: {
						name: "",
						phone: "",
						email: "",
						linkedin: "",
						github: "",
					},
					// Use the exact education entries from defaultResumeData
					education: defaultResumeData.education,
					// Use the exact experience entries from defaultResumeData
					experience: defaultResumeData.experience,
					// Use the exact project entries from defaultResumeData
					projects: defaultResumeData.projects,
					skills: {
						languages: "",
						frameworks: "",
						tools: "",
						libraries: ""
					}
				});
			}
			setIsLoading(false);
		};

		fetchResumeData();
	}, [setData]);

	const handleSaveResume = async () => {
		setIsSaving(true);

		saveResumeDataLocally(data);

		const success = await saveResumeData(data);

		setIsSaving(false);

		if (success) {
			toast({
				title: "Resume saved",
				description: "Your resume has been saved successfully.",
			});
		} else {
			toast({
				title: "Failed to save",
				description:
					"There was an error saving your resume. Your changes have been saved locally.",
				variant: "destructive",
			});
		}
	};

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			if (!isLoading) {
				saveResumeDataLocally(data);
			}
		}, 1000);

		return () => clearTimeout(timeoutId);
	}, [data, isLoading]);

	const updatePersonal = (field: string, value: string) => {
		setData((prev) => ({
			...prev,
			personal: {
				...prev.personal,
				[field]: value,
			},
		}));
	};

	const addEducation = () => {
		setData((prev) => {
			// Only add if less than 2 entries
			if (prev.education.length >= 2) {
				toast({
					title: "Maximum limit reached",
					description: "You can only have up to 2 education entries.",
					variant: "destructive"
				});
				return prev;
			}
			return {
				...prev,
				education: [
					...prev.education,
					{
						institution: "",
						location: "",
						degree: "",
						date: ""
					}
				],
			};
		});
	};

	const updateEducation = (index: number, field: string, value: string) => {
		setData((prev) => {
			const newEducation = [...prev.education];
			newEducation[index] = { ...newEducation[index], [field]: value };
			return { ...prev, education: newEducation };
		});
	};

	const removeEducation = (index: number) => {
		setData((prev) => {
			if (prev.education.length <= 1) {
				toast({
					title: "Cannot remove",
					description: "You must have at least one education entry.",
					variant: "destructive"
				});
				return prev;
			}
			const newEducation = [...prev.education];
			newEducation.splice(index, 1);
			return { ...prev, education: newEducation };
		});
	};

	const addExperience = () => {
		setData((prev) => {
			// Only add if less than 3 entries
			if (prev.experience.length >= 3) {
				toast({
					title: "Maximum limit reached",
					description: "You can only have up to 3 experience entries.",
					variant: "destructive"
				});
				return prev;
			}
			return {
				...prev,
				experience: [
					...prev.experience,
					defaultResumeData.experience[0] // Use the first experience entry as template
				],
			};
		});
	};

	const updateExperience = (
		index: number,
		field: string,
		value: string | string[],
	) => {
		setData((prev) => {
			const newExperience = [...prev.experience];
			newExperience[index] = { ...newExperience[index], [field]: value };
			return { ...prev, experience: newExperience };
		});
	};

	const addResponsibility = (expIndex: number) => {
		setData((prev) => {
			const newExperience = [...prev.experience];
			const defaultResponsibility = defaultResumeData.experience[0].responsibilities[0];
			newExperience[expIndex] = {
				...newExperience[expIndex],
				responsibilities: [...newExperience[expIndex].responsibilities, ""],
			};
			return { ...prev, experience: newExperience };
		});
	};

	const updateResponsibility = (
		expIndex: number,
		respIndex: number,
		value: string,
	) => {
		setData((prev) => {
			const newExperience = [...prev.experience];
			const newResponsibilities = [...newExperience[expIndex].responsibilities];
			newResponsibilities[respIndex] = value;
			newExperience[expIndex] = {
				...newExperience[expIndex],
				responsibilities: newResponsibilities,
			};
			return { ...prev, experience: newExperience };
		});
	};

	const removeResponsibility = (expIndex: number, respIndex: number) => {
		setData((prev) => {
			const newExperience = [...prev.experience];
			const newResponsibilities = [...newExperience[expIndex].responsibilities];
			newResponsibilities.splice(respIndex, 1);
			newExperience[expIndex] = {
				...newExperience[expIndex],
				responsibilities: newResponsibilities,
			};
			return { ...prev, experience: newExperience };
		});
	};

	const removeExperience = (index: number) => {
		setData((prev) => {
			const newExperience = [...prev.experience];
			newExperience.splice(index, 1);
			return { ...prev, experience: newExperience };
		});
	};

	const addProject = () => {
		setData((prev) => {
			// Only add if less than 2 entries
			if (prev.projects.length >= 2) {
				toast({
					title: "Maximum limit reached",
					description: "You can only have up to 2 project entries.",
					variant: "destructive"
				});
				return prev;
			}
			return {
				...prev,
				projects: [
					...prev.projects,
					defaultResumeData.projects[0] // Use the first project entry as template
				],
			};
		});
	};

	const updateProject = (
		index: number,
		field: string,
		value: string | string[],
	) => {
		setData((prev) => {
			const newProjects = [...prev.projects];
			newProjects[index] = { ...newProjects[index], [field]: value };
			return { ...prev, projects: newProjects };
		});
	};

	const addProjectDetail = (projIndex: number) => {
		setData((prev) => {
			const newProjects = [...prev.projects];
			const defaultDetail = defaultResumeData.projects[0].details[0];
			newProjects[projIndex] = {
				...newProjects[projIndex],
				details: [...newProjects[projIndex].details, ""],
			};
			return { ...prev, projects: newProjects };
		});
	};

	const updateProjectDetail = (
		projIndex: number,
		detailIndex: number,
		value: string,
	) => {
		setData((prev) => {
			const newProjects = [...prev.projects];
			const newDetails = [...newProjects[projIndex].details];
			newDetails[detailIndex] = value;
			newProjects[projIndex] = {
				...newProjects[projIndex],
				details: newDetails,
			};
			return { ...prev, projects: newProjects };
		});
	};

	const removeProjectDetail = (projIndex: number, detailIndex: number) => {
		setData((prev) => {
			const newProjects = [...prev.projects];
			const newDetails = [...newProjects[projIndex].details];
			newDetails.splice(detailIndex, 1);
			newProjects[projIndex] = {
				...newProjects[projIndex],
				details: newDetails,
			};
			return { ...prev, projects: newProjects };
		});
	};

	const removeProject = (index: number) => {
		setData((prev) => {
			const newProjects = [...prev.projects];
			newProjects.splice(index, 1);
			return { ...prev, projects: newProjects };
		});
	};

	const updateSkills = (category: string, value: string) => {
		setData((prev) => ({
			...prev,
			skills: {
				...(prev?.skills || {}),
				[category]: value,
			},
		}));
	};

	return (
		<>
			{isLoading ? (
				<div className="flex items-center justify-center h-40">
					<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
				</div>
			) : (
				<>
					<div className="flex justify-between items-center mb-4">
						<h2 className="text-xl font-semibold">Resume Information</h2>
						<Button
							onClick={handleSaveResume}
							disabled={isSaving}
							className="flex items-center gap-2"							
						>
							{isSaving ? (
								<>
									<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
									Saving...
								</>
							) : (
								<>
									<Save className="h-4 w-4" />
									Save Resume
								</>
							)}
						</Button>
					</div>

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
				</>
			)}
		</>
	);
}
