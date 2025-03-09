"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, Download } from "lucide-react";
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
	const [isExporting, setIsExporting] = useState(false);
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

	const handleExportPDF = () => {
		setIsExporting(true);
		
		try {
			// Add print-specific styles
			const style = document.createElement('style');
			style.textContent = `
				@import url('https://fonts.cdnfonts.com/css/computer-modern');
				
				@page {
					margin: 0;
					size: A4;
				}
				@media print {
					body * {
						visibility: hidden;
					}
					#resume-preview, #resume-preview * {
						visibility: visible;
					}
					#resume-preview {
						position: absolute;
						left: 50%;
						transform: translateX(-50%);
						top: 0;
						width: 170mm; /* Narrower width for LaTeX-like margins */
						min-height: 0 !important;
						height: auto !important;
						max-height: 297mm !important; /* A4 height */
						padding: 25mm 0; /* LaTeX-like vertical padding */
						margin: 0 auto;
						overflow: visible !important;
						box-sizing: border-box;
						font-family: 'Computer Modern', serif !important;
						font-size: 10pt;
						line-height: 1.2;
						color: rgb(0, 0, 0);
					}
					/* LaTeX-style typography */
					#resume-preview h1 {
						font-family: 'Computer Modern', serif !important;
						font-size: 17pt;
						margin: 0 0 8pt 0;
						text-align: center;
						font-weight: normal;
					}
					#resume-preview h2 {
						font-family: 'Computer Modern', serif !important;
						font-size: 12pt;
						margin: 12pt 0 6pt 0;
						text-transform: uppercase;
						border-bottom: 0.8pt solid black;
						padding-bottom: 3pt;
						font-weight: normal;
					}
					/* Contact info styling */
					#resume-preview .contact-info {
						text-align: center;
						margin: 3pt 0 16pt 0;
						font-size: 10pt;
					}
					#resume-preview .contact-info a {
						color: black;
						text-decoration: none;
					}
					/* Content styling */
					#resume-preview p {
						margin: 0 0 4pt 0;
					}
					#resume-preview ul {
						margin: 4pt 0;
						padding-left: 12pt;
					}
					#resume-preview li {
						margin: 2pt 0;
						padding-left: 4pt;
					}
					/* Institution/Company lines */
					#resume-preview .institution,
					#resume-preview .company {
						font-weight: bold;
					}
					#resume-preview .degree,
					#resume-preview .position {
						font-style: italic;
					}
					/* Project styling */
					#resume-preview .project-title {
						font-weight: bold;
					}
					#resume-preview .project-tech {
						font-style: italic;
					}
					/* Skills section */
					#resume-preview .skills-section {
						margin: 6pt 0;
					}
					#resume-preview .skills-section strong {
						font-weight: normal;
					}
					/* Ensure single page */
					#resume-preview * {
						page-break-inside: avoid;
					}
					/* Hide UI elements */
					#resume-preview [role="tablist"],
					#resume-preview button,
					#resume-preview [data-state="inactive"] {
						display: none !important;
					}
					#resume-preview [data-state="active"] {
						display: block !important;
					}
					/* Remove headers and footers */
					@page {
						margin: 0;
						size: A4;
					}
					@page :first {
						margin-top: 0;
					}
					@page :left {
						margin-left: 0;
					}
					@page :right {
						margin-right: 0;
					}
				}
			`;
			document.head.appendChild(style);

			window.print();

			// Clean up
			document.head.removeChild(style);
			
			toast({
				title: "Ready to save",
				description: "Use your browser's save as PDF option in the print dialog.",
			});
		} catch (error) {
			console.error('Print error:', error);
			toast({
				title: "Export failed",
				description: "There was an error preparing the resume for export.",
				variant: "destructive",
			});
		} finally {
			setIsExporting(false);
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
						<div className="flex gap-2">
							<Button
								onClick={handleExportPDF}
								disabled={isExporting}
								className="flex items-center gap-2"
							>
								{isExporting ? (
									<>
										<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
										Exporting...
									</>
								) : (
									<>
										<Download className="h-4 w-4" />
										Download PDF
									</>
								)}
							</Button>
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
					</div>

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
