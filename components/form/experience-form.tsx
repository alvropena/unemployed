"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import type { ResumeData } from "@/lib/types";
import { defaultResumeData } from "@/lib/default-data";
import { Label } from "@/components/ui/label";

interface ExperienceFormProps {
	experience: ResumeData["experience"];
	updateExperience: (
		index: number,
		field: string,
		value: string | string[],
	) => void;
	updateResponsibility: (
		expIndex: number,
		respIndex: number,
		value: string,
	) => void;
}

interface ExperienceState {
	position: string;
	company: string;
	location: string;
	description: string[];
}

export default function ExperienceForm({
	experience,
	updateExperience,
	updateResponsibility,
}: ExperienceFormProps) {
	// Experience 1 State
	const [experience1, setExperience1] = React.useState<ExperienceState>({
		position: experience[0]?.position || "",
		company: experience[0]?.company || "",
		location: experience[0]?.location || "",
		description: experience[0]?.description || ["", "", ""],
	});

	// Experience 2 State
	const [experience2, setExperience2] = React.useState<ExperienceState>({
		position: experience[1]?.position || "",
		company: experience[1]?.company || "",
		location: experience[1]?.location || "",
		description: experience[1]?.description || ["", "", ""],
	});

	// Experience 3 State
	const [experience3, setExperience3] = React.useState<ExperienceState>({
		position: experience[2]?.position || "",
		company: experience[2]?.company || "",
		location: experience[2]?.location || "",
		description: experience[2]?.description || ["", "", ""],
	});

	// Handler for updating experience fields
	const handleExperienceChange = React.useCallback((
		index: number,
		field: string,
		value: string,
		setter: React.Dispatch<React.SetStateAction<ExperienceState>>,
	) => {
		setter(prev => ({ ...prev, [field]: value }));
		updateExperience(index, field, value);
	}, [updateExperience]);

	// Handler for updating responsibilities
	const handleResponsibilityChange = React.useCallback((
		expIndex: number,
		respIndex: number,
		value: string,
		setter: React.Dispatch<React.SetStateAction<ExperienceState>>,
	) => {
		setter(prev => {
			const newDescription = [...prev.description];
			newDescription[respIndex] = value;
			return { ...prev, description: newDescription };
		});
		updateResponsibility(expIndex, respIndex, value);
	}, [updateResponsibility]);

	return (
		<div className="space-y-4">
			{/* First Experience */}
			<Card>
				<CardContent className="pt-6">
					<div className="mb-6">
						<h3 className="font-medium">Experience #1</h3>
					</div>
					<div className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="title1">Title</Label>
							<Input
								id="title1"
								value={experience1.position}
								onChange={(e) => handleExperienceChange(0, "position", e.target.value, setExperience1)}
								placeholder="Software Engineer"
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="company1">Company</Label>
							<Input
								id="company1"
								value={experience1.company}
								onChange={(e) => handleExperienceChange(0, "company", e.target.value, setExperience1)}
								placeholder="Google"
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="location1">Location</Label>
							<Input
								id="location1"
								value={experience1.location}
								onChange={(e) => handleExperienceChange(0, "location", e.target.value, setExperience1)}
								placeholder="Mountain View, CA"
							/>
						</div>
						<div>
							<Label>Responsibilities</Label>
							<div className="space-y-2">
								<Textarea
									value={experience1.description[0]}
									onChange={(e) => handleResponsibilityChange(0, 0, e.target.value, setExperience1)}
									placeholder={defaultResumeData.experience[0].description[0]}
									className="min-h-[80px]"
								/>
								<Textarea
									value={experience1.description[1]}
									onChange={(e) => handleResponsibilityChange(0, 1, e.target.value, setExperience1)}
									placeholder={defaultResumeData.experience[0].description[1]}
									className="min-h-[80px]"
								/>
								<Textarea
									value={experience1.description[2]}
									onChange={(e) => handleResponsibilityChange(0, 2, e.target.value, setExperience1)}
									placeholder={defaultResumeData.experience[0].description[2]}
									className="min-h-[80px]"
								/>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Second Experience */}
			<Card>
				<CardContent className="pt-6">
					<div className="mb-6">
						<h3 className="font-medium">Experience #2</h3>
					</div>
					<div className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="title2">Title</Label>
							<Input
								id="title2"
								value={experience2.position}
								onChange={(e) => handleExperienceChange(1, "position", e.target.value, setExperience2)}
								placeholder="Software Engineer"
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="company2">Company</Label>
							<Input
								id="company2"
								value={experience2.company}
								onChange={(e) => handleExperienceChange(1, "company", e.target.value, setExperience2)}
								placeholder="Google"
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="location2">Location</Label>
							<Input
								id="location2"
								value={experience2.location}
								onChange={(e) => handleExperienceChange(1, "location", e.target.value, setExperience2)}
								placeholder="Mountain View, CA"
							/>
						</div>
						<div>
							<Label>Responsibilities</Label>
							<div className="space-y-2">
								<Textarea
									value={experience2.description[0]}
									onChange={(e) => handleResponsibilityChange(1, 0, e.target.value, setExperience2)}
									placeholder={defaultResumeData.experience[1].description[0]}
									className="min-h-[80px]"
								/>
								<Textarea
									value={experience2.description[1]}
									onChange={(e) => handleResponsibilityChange(1, 1, e.target.value, setExperience2)}
									placeholder={defaultResumeData.experience[1].description[1]}
									className="min-h-[80px]"
								/>
								<Textarea
									value={experience2.description[2]}
									onChange={(e) => handleResponsibilityChange(1, 2, e.target.value, setExperience2)}
									placeholder={defaultResumeData.experience[1].description[2]}
									className="min-h-[80px]"
								/>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Third Experience */}
			<Card>
				<CardContent className="pt-6">
					<div className="mb-6">
						<h3 className="font-medium">Experience #3</h3>
					</div>
					<div className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="title3">Title</Label>
							<Input
								id="title3"
								value={experience3.position}
								onChange={(e) => handleExperienceChange(2, "position", e.target.value, setExperience3)}
								placeholder="Software Engineer"
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="company3">Company</Label>
							<Input
								id="company3"
								value={experience3.company}
								onChange={(e) => handleExperienceChange(2, "company", e.target.value, setExperience3)}
								placeholder="Google"
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="location3">Location</Label>
							<Input
								id="location3"
								value={experience3.location}
								onChange={(e) => handleExperienceChange(2, "location", e.target.value, setExperience3)}
								placeholder="Mountain View, CA"
							/>
						</div>
						<div>
							<Label>Responsibilities</Label>
							<div className="space-y-2">
								<Textarea
									value={experience3.description[0]}
									onChange={(e) => handleResponsibilityChange(2, 0, e.target.value, setExperience3)}
									placeholder={defaultResumeData.experience[2].description[0]}
									className="min-h-[80px]"
								/>
								<Textarea
									value={experience3.description[1]}
									onChange={(e) => handleResponsibilityChange(2, 1, e.target.value, setExperience3)}
									placeholder={defaultResumeData.experience[2].description[1]}
									className="min-h-[80px]"
								/>
								<Textarea
									value={experience3.description[2]}
									onChange={(e) => handleResponsibilityChange(2, 2, e.target.value, setExperience3)}
									placeholder={defaultResumeData.experience[2].description[2]}
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
