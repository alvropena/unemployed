"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import type { ResumeData } from "@/types/types";
import { defaultResumeData } from "@/lib/defaultData";
import { Label } from "@/components/ui/label";

interface ProjectsFormProps {
	projects: ResumeData["projects"];
	updateProject: (
		index: number,
		field: string,
		value: string | Date | boolean | null,
	) => void;
}

interface ProjectState {
	name: string;
	startDate: Date | null;
	endDate: Date | null;
	current: boolean;
	responsibilityOne: string | null;
	responsibilityTwo: string | null;
	responsibilityThree: string | null;
	responsibilityFour: string | null;
}

export default function ProjectsForm({
	projects,
	updateProject,
}: ProjectsFormProps) {
	// Project 1 State
	const [project1, setProject1] = React.useState<ProjectState>({
		name: projects[0]?.name || "",
		startDate: projects[0]?.startDate || null,
		endDate: projects[0]?.endDate || null,
		current: projects[0]?.current || false,
		responsibilityOne: projects[0]?.responsibilityOne || "",
		responsibilityTwo: projects[0]?.responsibilityTwo || "",
		responsibilityThree: projects[0]?.responsibilityThree || "",
		responsibilityFour: projects[0]?.responsibilityFour || "",
	});

	// Project 2 State
	const [project2, setProject2] = React.useState<ProjectState>({
		name: projects[1]?.name || "",
		startDate: projects[1]?.startDate || null,
		endDate: projects[1]?.endDate || null,
		current: projects[1]?.current || false,
		responsibilityOne: projects[1]?.responsibilityOne || "",
		responsibilityTwo: projects[1]?.responsibilityTwo || "",
		responsibilityThree: projects[1]?.responsibilityThree || "",
		responsibilityFour: projects[1]?.responsibilityFour || "",
	});

	// Handler for updating project fields
	const handleProjectChange = React.useCallback((
		index: number,
		field: keyof ProjectState,
		value: string | Date | boolean | null,
		setter: React.Dispatch<React.SetStateAction<ProjectState>>,
	) => {
		setter(prev => ({ ...prev, [field]: value }));
		updateProject(index, field, value);
	}, [updateProject]);

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
									value={project1.responsibilityOne || ""}
									onChange={(e) => handleProjectChange(0, "responsibilityOne", e.target.value, setProject1)}
									placeholder={defaultResumeData.projects[0].responsibilityOne || ""}
									className="min-h-[80px]"
								/>
								<Textarea
									value={project1.responsibilityTwo || ""}
									onChange={(e) => handleProjectChange(0, "responsibilityTwo", e.target.value, setProject1)}
									placeholder={defaultResumeData.projects[0].responsibilityTwo || ""}
									className="min-h-[80px]"
								/>
								<Textarea
									value={project1.responsibilityThree || ""}
									onChange={(e) => handleProjectChange(0, "responsibilityThree", e.target.value, setProject1)}
									placeholder={defaultResumeData.projects[0].responsibilityThree || ""}
									className="min-h-[80px]"
								/>
								<Textarea
									value={project1.responsibilityFour || ""}
									onChange={(e) => handleProjectChange(0, "responsibilityFour", e.target.value, setProject1)}
									placeholder={defaultResumeData.projects[0].responsibilityFour || ""}
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
									value={project2.responsibilityOne || ""}
									onChange={(e) => handleProjectChange(1, "responsibilityOne", e.target.value, setProject2)}
									placeholder={defaultResumeData.projects[1].responsibilityOne || ""}
									className="min-h-[80px]"
								/>
								<Textarea
									value={project2.responsibilityTwo || ""}
									onChange={(e) => handleProjectChange(1, "responsibilityTwo", e.target.value, setProject2)}
									placeholder={defaultResumeData.projects[1].responsibilityTwo || ""}
									className="min-h-[80px]"
								/>
								<Textarea
									value={project2.responsibilityThree || ""}
									onChange={(e) => handleProjectChange(1, "responsibilityThree", e.target.value, setProject2)}
									placeholder={defaultResumeData.projects[1].responsibilityThree || ""}
									className="min-h-[80px]"
								/>
								<Textarea
									value={project2.responsibilityFour || ""}
									onChange={(e) => handleProjectChange(1, "responsibilityFour", e.target.value, setProject2)}
									placeholder={defaultResumeData.projects[1].responsibilityFour || ""}
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
