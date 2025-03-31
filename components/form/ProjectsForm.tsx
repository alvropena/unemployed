"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import type { ResumeData } from "@/lib/types";
import { defaultResumeData } from "@/lib/defaultData";
import { Label } from "@/components/ui/label";

interface ProjectsFormProps {
	projects: ResumeData["projects"];
	updateProject: (
		index: number,
		field: string,
		value: string | Date | boolean | null,
	) => void;
	updateProjectDetail: (
		projIndex: number,
		detailIndex: number,
		value: string,
	) => void;
}

interface ProjectState {
	name: string;
	description: string[];
}

export default function ProjectsForm({
	projects,
	updateProject,
	updateProjectDetail,
}: ProjectsFormProps) {
	// Project 1 State
	const [project1, setProject1] = React.useState<ProjectState>({
		name: projects[0]?.name || "",
		description: projects[0]?.description || ["", "", "", ""],
	});

	// Project 2 State
	const [project2, setProject2] = React.useState<ProjectState>({
		name: projects[1]?.name || "",
		description: projects[1]?.description || ["", "", "", ""],
	});

	// Handler for updating project fields
	const handleProjectChange = React.useCallback((
		index: number,
		field: string,
		value: string,
		setter: React.Dispatch<React.SetStateAction<ProjectState>>,
	) => {
		setter(prev => ({ ...prev, [field]: value }));
		updateProject(index, field, value);
	}, [updateProject]);

	// Handler for updating project details
	const handleProjectDetailChange = React.useCallback((
		projIndex: number,
		detailIndex: number,
		value: string,
		setter: React.Dispatch<React.SetStateAction<ProjectState>>,
	) => {
		setter(prev => {
			const newDescription = [...prev.description];
			newDescription[detailIndex] = value;
			return { ...prev, description: newDescription };
		});
		updateProjectDetail(projIndex, detailIndex, value);
	}, [updateProjectDetail]);

	return (
		<div className="space-y-4">
			{/* First Project */}
			<Card>
				<CardContent className="pt-6">
					<div className="mb-6">
						<h3 className="font-medium">Project #1</h3>
					</div>
					<div className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="project-name1">Project Name</Label>
							<Input
								id="project-name1"
								value={project1.name}
								onChange={(e) => handleProjectChange(0, "name", e.target.value, setProject1)}
								placeholder={defaultResumeData.projects[0].name}
							/>
						</div>
						<div>
							<Label>Responsibilities</Label>
							<div className="space-y-2">
								<Textarea
									value={project1.description[0]}
									onChange={(e) => handleProjectDetailChange(0, 0, e.target.value, setProject1)}
									placeholder={defaultResumeData.projects[0].description[0]}
									className="min-h-[80px]"
								/>
								<Textarea
									value={project1.description[1]}
									onChange={(e) => handleProjectDetailChange(0, 1, e.target.value, setProject1)}
									placeholder={defaultResumeData.projects[0].description[1]}
									className="min-h-[80px]"
								/>
								<Textarea
									value={project1.description[2]}
									onChange={(e) => handleProjectDetailChange(0, 2, e.target.value, setProject1)}
									placeholder={defaultResumeData.projects[0].description[2]}
									className="min-h-[80px]"
								/>
								<Textarea
									value={project1.description[3]}
									onChange={(e) => handleProjectDetailChange(0, 3, e.target.value, setProject1)}
									placeholder={defaultResumeData.projects[0].description[3]}
									className="min-h-[80px]"
								/>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Second Project */}
			<Card>
				<CardContent className="pt-6">
					<div className="mb-6">
						<h3 className="font-medium">Project #2</h3>
					</div>
					<div className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="project-name2">Project Name</Label>
							<Input
								id="project-name2"
								value={project2.name}
								onChange={(e) => handleProjectChange(1, "name", e.target.value, setProject2)}
								placeholder={defaultResumeData.projects[1].name}
							/>
						</div>
						<div>
							<Label>Responsibilities</Label>
							<div className="space-y-2">
								<Textarea
									value={project2.description[0]}
									onChange={(e) => handleProjectDetailChange(1, 0, e.target.value, setProject2)}
									placeholder={defaultResumeData.projects[1].description[0]}
									className="min-h-[80px]"
								/>
								<Textarea
									value={project2.description[1]}
									onChange={(e) => handleProjectDetailChange(1, 1, e.target.value, setProject2)}
									placeholder={defaultResumeData.projects[1].description[1]}
									className="min-h-[80px]"
								/>
								<Textarea
									value={project2.description[2]}
									onChange={(e) => handleProjectDetailChange(1, 2, e.target.value, setProject2)}
									placeholder={defaultResumeData.projects[1].description[2]}
									className="min-h-[80px]"
								/>
								<Textarea
									value={project2.description[3]}
									onChange={(e) => handleProjectDetailChange(1, 3, e.target.value, setProject2)}
									placeholder={defaultResumeData.projects[1].description[3]}
									className="min-h-[80px]"
								/>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
