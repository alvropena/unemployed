"use client";

import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import type { ResumeData } from "@/types/types";
import { defaultResumeData } from "@/lib/defaultData";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

interface ExperienceFormProps {
	experience: ResumeData["experience"];
	updateExperience: (
		index: number,
		field: string,
		value: string | Date | boolean | null,
	) => void;
	onContinue?: () => void;
	onBack?: () => void;
}

interface ExperienceState {
	position: string;
	company: string;
	location: string;
	startDate: Date | null;
	endDate: Date | null;
	current: boolean;
	responsibilityOne: string | null;
	responsibilityTwo: string | null;
	responsibilityThree: string | null;
	responsibilityFour: string | null;
}

export default function ExperienceForm({
	experience,
	updateExperience,
	onContinue,
	onBack,
}: ExperienceFormProps) {
	const company1Ref = useRef<HTMLInputElement>(null);
	const [currentExperience, setCurrentExperience] = useState(0); // Track which experience is shown (0, 1, or 2)

	useEffect(() => {
		// Focus the first company input when component mounts or when switching to first experience
		if (currentExperience === 0) {
			company1Ref.current?.focus();
		}
	}, [currentExperience]);

	// Experience 1 State
	const [experience1, setExperience1] = React.useState<ExperienceState>({
		position: experience[0]?.position || "",
		company: experience[0]?.company || "",
		location: experience[0]?.location || "",
		startDate: experience[0]?.startDate || null,
		endDate: experience[0]?.endDate || null,
		current: experience[0]?.current || false,
		responsibilityOne: experience[0]?.responsibilityOne || "",
		responsibilityTwo: experience[0]?.responsibilityTwo || "",
		responsibilityThree: experience[0]?.responsibilityThree || "",
		responsibilityFour: experience[0]?.responsibilityFour || "",
	});

	// Experience 2 State
	const [experience2, setExperience2] = React.useState<ExperienceState>({
		position: experience[1]?.position || "",
		company: experience[1]?.company || "",
		location: experience[1]?.location || "",
		startDate: experience[1]?.startDate || null,
		endDate: experience[1]?.endDate || null,
		current: experience[1]?.current || false,
		responsibilityOne: experience[1]?.responsibilityOne || "",
		responsibilityTwo: experience[1]?.responsibilityTwo || "",
		responsibilityThree: experience[1]?.responsibilityThree || "",
		responsibilityFour: experience[1]?.responsibilityFour || "",
	});

	// Experience 3 State
	const [experience3, setExperience3] = React.useState<ExperienceState>({
		position: experience[2]?.position || "",
		company: experience[2]?.company || "",
		location: experience[2]?.location || "",
		startDate: experience[2]?.startDate || null,
		endDate: experience[2]?.endDate || null,
		current: experience[2]?.current || false,
		responsibilityOne: experience[2]?.responsibilityOne || "",
		responsibilityTwo: experience[2]?.responsibilityTwo || "",
		responsibilityThree: experience[2]?.responsibilityThree || "",
		responsibilityFour: experience[2]?.responsibilityFour || "",
	});

	// Handler for updating experience fields
	const handleExperienceChange = React.useCallback((
		index: number,
		field: keyof ExperienceState,
		value: string | Date | boolean | null,
		setter: React.Dispatch<React.SetStateAction<ExperienceState>>,
	) => {
		setter(prev => ({ ...prev, [field]: value }));
		updateExperience(index, field, value);
	}, [updateExperience]);

	const handleNext = () => {
		if (currentExperience === 2) {
			// If we're on the last experience, navigate to projects
			onContinue?.();
		} else {
			// Otherwise, show the next experience
			setCurrentExperience(prev => prev + 1);
		}
	};

	const handleBack = () => {
		if (currentExperience === 0) {
			// If we're on the first experience, go back to education
			onBack?.();
		} else {
			// Otherwise, show the previous experience
			setCurrentExperience(prev => prev - 1);
		}
	};

	return (
		<div className="relative">
			<div className="space-y-4">
				{/* First Experience */}
				{currentExperience === 0 && (
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
										placeholder={defaultResumeData.experience[0].position}
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="company1">Company</Label>
									<Input
										ref={company1Ref}
										id="company1"
										value={experience1.company}
										onChange={(e) => handleExperienceChange(0, "company", e.target.value, setExperience1)}
										placeholder={defaultResumeData.experience[0].company}
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="location1">Location</Label>
									<Input
										id="location1"
										value={experience1.location}
										onChange={(e) => handleExperienceChange(0, "location", e.target.value, setExperience1)}
										placeholder={defaultResumeData.experience[0].location}
									/>
								</div>
								<div className="flex items-center space-x-2">
									<Checkbox
										id="current1"
										checked={experience1.current}
										onCheckedChange={(checked) => handleExperienceChange(0, "current", checked as boolean, setExperience1)}
									/>
									<Label htmlFor="current1">Current Position</Label>
								</div>
								<div>
									<Label>Responsibilities</Label>
									<div className="space-y-2">
										<Textarea
											value={experience1.responsibilityOne || ""}
											onChange={(e) => handleExperienceChange(0, "responsibilityOne", e.target.value, setExperience1)}
											placeholder={defaultResumeData.experience[0].responsibilityOne || ""}
											className="min-h-[80px]"
										/>
										<Textarea
											value={experience1.responsibilityTwo || ""}
											onChange={(e) => handleExperienceChange(0, "responsibilityTwo", e.target.value, setExperience1)}
											placeholder={defaultResumeData.experience[0].responsibilityTwo || ""}
											className="min-h-[80px]"
										/>
										<Textarea
											value={experience1.responsibilityThree || ""}
											onChange={(e) => handleExperienceChange(0, "responsibilityThree", e.target.value, setExperience1)}
											placeholder={defaultResumeData.experience[0].responsibilityThree || ""}
											className="min-h-[80px]"
										/>
										<Textarea
											value={experience1.responsibilityFour || ""}
											onChange={(e) => handleExperienceChange(0, "responsibilityFour", e.target.value, setExperience1)}
											placeholder={defaultResumeData.experience[0].responsibilityFour || ""}
											className="min-h-[80px]"
										/>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				)}

				{/* Second Experience */}
				{currentExperience === 1 && (
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
										placeholder={defaultResumeData.experience[1].position}
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="company2">Company</Label>
									<Input
										id="company2"
										value={experience2.company}
										onChange={(e) => handleExperienceChange(1, "company", e.target.value, setExperience2)}
										placeholder={defaultResumeData.experience[1].company}
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="location2">Location</Label>
									<Input
										id="location2"
										value={experience2.location}
										onChange={(e) => handleExperienceChange(1, "location", e.target.value, setExperience2)}
										placeholder={defaultResumeData.experience[1].location}
									/>
								</div>
								<div className="flex items-center space-x-2">
									<Checkbox
										id="current2"
										checked={experience2.current}
										onCheckedChange={(checked) => handleExperienceChange(1, "current", checked as boolean, setExperience2)}
									/>
									<Label htmlFor="current2">Current Position</Label>
								</div>
								<div>
									<Label>Responsibilities</Label>
									<div className="space-y-2">
										<Textarea
											value={experience2.responsibilityOne || ""}
											onChange={(e) => handleExperienceChange(1, "responsibilityOne", e.target.value, setExperience2)}
											placeholder={defaultResumeData.experience[1].responsibilityOne || ""}
											className="min-h-[80px]"
										/>
										<Textarea
											value={experience2.responsibilityTwo || ""}
											onChange={(e) => handleExperienceChange(1, "responsibilityTwo", e.target.value, setExperience2)}
											placeholder={defaultResumeData.experience[1].responsibilityTwo || ""}
											className="min-h-[80px]"
										/>
										<Textarea
											value={experience2.responsibilityThree || ""}
											onChange={(e) => handleExperienceChange(1, "responsibilityThree", e.target.value, setExperience2)}
											placeholder={defaultResumeData.experience[1].responsibilityThree || ""}
											className="min-h-[80px]"
										/>
										<Textarea
											value={experience2.responsibilityFour || ""}
											onChange={(e) => handleExperienceChange(1, "responsibilityFour", e.target.value, setExperience2)}
											placeholder={defaultResumeData.experience[1].responsibilityFour || ""}
											className="min-h-[80px]"
										/>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				)}

				{/* Third Experience */}
				{currentExperience === 2 && (
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
										placeholder={defaultResumeData.experience[2].position}
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="company3">Company</Label>
									<Input
										id="company3"
										value={experience3.company}
										onChange={(e) => handleExperienceChange(2, "company", e.target.value, setExperience3)}
										placeholder={defaultResumeData.experience[2].company}
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="location3">Location</Label>
									<Input
										id="location3"
										value={experience3.location}
										onChange={(e) => handleExperienceChange(2, "location", e.target.value, setExperience3)}
										placeholder={defaultResumeData.experience[2].location}
									/>
								</div>
								<div className="flex items-center space-x-2">
									<Checkbox
										id="current3"
										checked={experience3.current}
										onCheckedChange={(checked) => handleExperienceChange(2, "current", checked as boolean, setExperience3)}
									/>
									<Label htmlFor="current3">Current Position</Label>
								</div>
								<div>
									<Label>Responsibilities</Label>
									<div className="space-y-2">
										<Textarea
											value={experience3.responsibilityOne || ""}
											onChange={(e) => handleExperienceChange(2, "responsibilityOne", e.target.value, setExperience3)}
											placeholder={defaultResumeData.experience[2].responsibilityOne || ""}
											className="min-h-[80px]"
										/>
										<Textarea
											value={experience3.responsibilityTwo || ""}
											onChange={(e) => handleExperienceChange(2, "responsibilityTwo", e.target.value, setExperience3)}
											placeholder={defaultResumeData.experience[2].responsibilityTwo || ""}
											className="min-h-[80px]"
										/>
										<Textarea
											value={experience3.responsibilityThree || ""}
											onChange={(e) => handleExperienceChange(2, "responsibilityThree", e.target.value, setExperience3)}
											placeholder={defaultResumeData.experience[2].responsibilityThree || ""}
											className="min-h-[80px]"
										/>
										<Textarea
											value={experience3.responsibilityFour || ""}
											onChange={(e) => handleExperienceChange(2, "responsibilityFour", e.target.value, setExperience3)}
											placeholder={defaultResumeData.experience[2].responsibilityFour || ""}
											className="min-h-[80px]"
										/>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				)}
			</div>

			<div className="mt-4 flex justify-between">
				<Button 
					variant="outline" 
					onClick={handleBack}
				>
					Back
				</Button>
				<Button onClick={handleNext}>
					{currentExperience === 2 ? "Continue" : "Next"}
				</Button>
			</div>
		</div>
	);
}
