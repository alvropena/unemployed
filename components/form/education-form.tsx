"use client";

import React, { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import type { ResumeData } from "@/lib/types";
import { defaultResumeData } from "@/lib/default-data";
import { Label } from "@/components/ui/label";
import { DateRangeSelect } from "@/components/ui/date-range-select";

interface EducationFormProps {
	education: ResumeData["education"];
	addEducation: () => void;
	updateEducation: (index: number, field: string, value: string) => void;
	removeEducation: (index: number) => void;
}

const EducationCard = React.memo(
	({
		edu,
		index,
		updateEducation,
		removeEducation,
		disabled,
	}: {
		edu: ResumeData["education"][number];
		index: number;
		updateEducation: (index: number, field: string, value: string) => void;
		removeEducation: (index: number) => void;
		disabled: boolean;
	}) => {
		const [startMonth, startYear, endMonth, endYear] = edu.date
			.split(" – ")
			.flatMap((part) => part.split(" "))
			.map((part) => part.trim());

		const handleDateChange = useCallback(
			(
				startMonth: string,
				startYear: string,
				endMonth: string,
				endYear: string,
			) => {
				const formattedDate = `${startMonth} ${startYear} – ${endYear === "Present" ? "Present" : `${endMonth} ${endYear}`}`;
				updateEducation(index, "date", formattedDate);
			},
			[index, updateEducation],
		);

		return (
			<Card className="mb-4">
				<CardContent className="pt-6">
					<div className="flex justify-between items-center mb-2">
						<h3 className="font-medium">Education #{index + 1}</h3>
						<Button
							variant="destructive"
							size="sm"
							onClick={() => removeEducation(index)}
							disabled={disabled}
						>
							<Trash2 className="h-4 w-4" />
						</Button>
					</div>
					<div className="grid gap-4">
						<div>
							<Label htmlFor={`institution-${index}`}>Institution</Label>
							<Input
								id={`institution-${index}`}
								value={edu.institution}
								onChange={(e) =>
									updateEducation(index, "institution", e.target.value)
								}
								placeholder={
									defaultResumeData.education[
										index % defaultResumeData.education.length
									].institution
								}
							/>
						</div>
						<div>
							<Label htmlFor={`location-${index}`}>Location</Label>
							<Input
								id={`location-${index}`}
								value={edu.location}
								onChange={(e) =>
									updateEducation(index, "location", e.target.value)
								}
								placeholder={
									defaultResumeData.education[
										index % defaultResumeData.education.length
									].location
								}
							/>
						</div>
						<div>
							<Label htmlFor={`degree-${index}`}>Degree</Label>
							<Input
								id={`degree-${index}`}
								value={edu.degree}
								onChange={(e) =>
									updateEducation(index, "degree", e.target.value)
								}
								placeholder={
									defaultResumeData.education[
										index % defaultResumeData.education.length
									].degree
								}
							/>
						</div>
						<DateRangeSelect
							startMonth={startMonth}
							startYear={startYear}
							endMonth={endMonth}
							endYear={endYear}
							onDateChange={handleDateChange}
							checkboxLabel="I currently study at this institution"
							id={`education-${index}`}
						/>
					</div>
				</CardContent>
			</Card>
		);
	},
);

EducationCard.displayName = "EducationCard";

export default function EducationForm({
	education,
	addEducation,
	updateEducation,
	removeEducation,
}: EducationFormProps) {
	return (
		<>
			{education.map((edu, index) => (
				<EducationCard
					key={`education-${edu.institution}-${index}`}
					edu={edu}
					index={index}
					updateEducation={updateEducation}
					removeEducation={removeEducation}
					disabled={education.length <= 1}
				/>
			))}
			<Button
				onClick={addEducation}
				className="w-full"
				disabled={education.length >= 2}
			>
				<Plus className="h-4 w-4 mr-2" /> Add Education
			</Button>
		</>
	);
}
