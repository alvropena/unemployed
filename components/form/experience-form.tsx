"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import type { ResumeData } from "@/lib/types";
import { defaultResumeData } from "@/lib/default-data";
import { Label } from "@/components/ui/label";
import { DateRangeSelect } from "@/components/ui/date-range-select";

interface ExperienceFormProps {
	experience: ResumeData["experience"];
	addExperience: () => void;
	updateExperience: (
		index: number,
		field: string,
		value: string | string[],
	) => void;
	removeExperience: (index: number) => void;
	addResponsibility: (expIndex: number) => void;
	updateResponsibility: (
		expIndex: number,
		respIndex: number,
		value: string,
	) => void;
	removeResponsibility: (expIndex: number, respIndex: number) => void;
}

const ExperienceInput = React.memo(
	({
		id,
		value,
		onChange,
		placeholder,
	}: {
		id: string;
		value: string;
		onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
		placeholder: string;
	}) => (
		<Input
			id={id}
			value={value}
			onChange={onChange}
			placeholder={placeholder}
		/>
	),
);

ExperienceInput.displayName = "ExperienceInput";

export default function ExperienceForm({
	experience,
	addExperience,
	updateExperience,
	removeExperience,
	addResponsibility,
	updateResponsibility,
	removeResponsibility,
}: ExperienceFormProps) {
	return (
		<>
			{experience.map((exp, index) => {
				const [startMonth, startYear, endMonth, endYear] = exp.date
					.split(" – ")
					.flatMap((part) => part.split(" "))
					.map((part) => part.trim());

				const handleDateChange = (
					startMonth: string,
					startYear: string,
					endMonth: string,
					endYear: string,
				) => {
					const formattedDate = `${startMonth} ${startYear} – ${endYear === "Present" ? "Present" : `${endMonth} ${endYear}`}`;
					updateExperience(index, "date", formattedDate);
				};

				return (
					<Card
						key={`${exp.company}-${exp.date}`
							.toLowerCase()
							.replace(/\s+/g, "-")}
						className="mb-4"
					>
						<CardContent className="pt-6">
							<div className="flex justify-between items-center mb-2">
								<h3 className="font-medium">Experience #{index + 1}</h3>
								<Button
									variant="destructive"
									size="sm"
									onClick={() => removeExperience(index)}
									disabled={experience.length <= 1}
								>
									<Trash2 className="h-4 w-4" />
								</Button>
							</div>
							<div className="grid gap-4">
								<div>
									<Label htmlFor={`title-${index}`}>Title</Label>
									<ExperienceInput
										id={`title-${index}`}
										value={exp.title}
										onChange={(e) =>
											updateExperience(index, "title", e.target.value)
										}
										placeholder="Software Engineer"
									/>
								</div>
								<div>
									<Label htmlFor={`company-${index}`}>Company</Label>
									<ExperienceInput
										id={`company-${index}`}
										value={exp.company}
										onChange={(e) =>
											updateExperience(index, "company", e.target.value)
										}
										placeholder="Google"
									/>
								</div>
								<div>
									<Label htmlFor={`location-${index}`}>Location</Label>
									<ExperienceInput
										id={`location-${index}`}
										value={exp.location}
										onChange={(e) =>
											updateExperience(index, "location", e.target.value)
										}
										placeholder="Mountain View, CA"
									/>
								</div>
								<DateRangeSelect
									startMonth={startMonth}
									startYear={startYear}
									endMonth={endMonth}
									endYear={endYear}
									onDateChange={handleDateChange}
									checkboxLabel="I currently work at this company"
									id={`experience-${index}`}
								/>
								<div>
									<Label>Responsibilities</Label>
									{exp.responsibilities.map((resp, respIndex) => (
										<div
											key={`${exp.company}-${exp.date}-resp-${respIndex}`
												.toLowerCase()
												.replace(/\s+/g, "-")}
											className="flex gap-2 mb-2"
										>
											<Textarea
												value={resp}
												onChange={(e) =>
													updateResponsibility(index, respIndex, e.target.value)
												}
												placeholder={
													defaultResumeData.experience[
														index % defaultResumeData.experience.length
													].responsibilities[
														respIndex %
															defaultResumeData.experience[
																index % defaultResumeData.experience.length
															].responsibilities.length
													]
												}
												className="min-h-[80px]"
											/>
											<Button
												variant="destructive"
												size="icon"
												onClick={() => removeResponsibility(index, respIndex)}
												disabled={exp.responsibilities.length <= 1}
											>
												<Trash2 className="h-4 w-4" />
											</Button>
										</div>
									))}
									<Button
										onClick={() => addResponsibility(index)}
										size="sm"
										variant="outline"
										className="mt-1"
									>
										<Plus className="h-4 w-4 mr-2" /> Add Responsibility
									</Button>
								</div>
							</div>
						</CardContent>
					</Card>
				);
			})}
			<Button
				onClick={addExperience}
				className="w-full"
				disabled={experience.length >= 3}
			>
				<Plus className="h-4 w-4 mr-2" /> Add Experience
			</Button>
		</>
	);
}
