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
import { Checkbox } from "@/components/ui/checkbox";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
] as const;

type Month = (typeof months)[number];
type Year = string;

const years = Array.from(
	{ length: 50 },
	(_, i) => new Date().getFullYear() - i,
);

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

export default function ExperienceForm({
	experience,
	addExperience,
	updateExperience,
	removeExperience,
	addResponsibility,
	updateResponsibility,
	removeResponsibility,
}: ExperienceFormProps) {
	const formatDate = (
		startMonth: Month,
		startYear: Year,
		endMonth: Month,
		endYear: Year | "Present",
	) => {
		const start = `${startMonth} ${startYear}`;
		const end = endYear === "Present" ? "Present" : `${endMonth} ${endYear}`;
		return `${start} – ${end}`;
	};

	return (
		<>
			{experience.map((exp, index) => {
				const [startMonth, startYear, endMonth, endYear] = exp.date
					.split(" – ")
					.flatMap((part) => part.split(" "))
					.map((part) => part.trim());

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
								>
									<Trash2 className="h-4 w-4" />
								</Button>
							</div>
							<div className="grid gap-4">
								<div>
									<Label htmlFor={`title-${index}`}>Title</Label>
									<Input
										id={`title-${index}`}
										value={exp.title}
										onChange={(e) =>
											updateExperience(index, "title", e.target.value)
										}
										placeholder={
											defaultResumeData.experience[
												index % defaultResumeData.experience.length
											].title
										}
									/>
								</div>
								<div>
									<Label htmlFor={`company-${index}`}>Company</Label>
									<Input
										id={`company-${index}`}
										value={exp.company}
										onChange={(e) =>
											updateExperience(index, "company", e.target.value)
										}
										placeholder="Company Name"
									/>
								</div>
								<div>
									<Label htmlFor={`location-${index}`}>Location</Label>
									<Input
										id={`location-${index}`}
										value={exp.location}
										onChange={(e) =>
											updateExperience(index, "location", e.target.value)
										}
										placeholder="City, State"
									/>
								</div>
								<div className="space-y-4">
									<Label>Date Range</Label>
									<div className="grid grid-cols-4 gap-2">
										<Select
											value={startMonth as Month}
											onValueChange={(value: Month) =>
												updateExperience(
													index,
													"date",
													formatDate(
														value,
														startYear || years[0].toString(),
														(endMonth as Month) || "December",
														endYear || "Present",
													),
												)
											}
										>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Month" />
											</SelectTrigger>
											<SelectContent>
												{months.map((month) => (
													<SelectItem key={month} value={month}>
														{month}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<Select
											value={startYear}
											onValueChange={(value: Year) =>
												updateExperience(
													index,
													"date",
													formatDate(
														(startMonth as Month) || "January",
														value,
														(endMonth as Month) || "December",
														endYear || "Present",
													),
												)
											}
										>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Year" />
											</SelectTrigger>
											<SelectContent>
												{years.map((year) => (
													<SelectItem key={year} value={year.toString()}>
														{year}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<Select
											value={endMonth as Month}
											onValueChange={(value: Month) =>
												updateExperience(
													index,
													"date",
													formatDate(
														(startMonth as Month) || "January",
														startYear || years[0].toString(),
														value,
														endYear || "Present",
													),
												)
											}
											disabled={endYear === "Present"}
										>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Month" />
											</SelectTrigger>
											<SelectContent>
												{months.map((month) => (
													<SelectItem key={month} value={month}>
														{month}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<Select
											value={endYear}
											onValueChange={(value: Year | "Present") => {
												if (value === "Present") {
													updateExperience(
														index,
														"date",
														formatDate(
															(startMonth as Month) || "January",
															startYear || years[0].toString(),
															"December",
															"Present",
														),
													);
												} else {
													updateExperience(
														index,
														"date",
														formatDate(
															(startMonth as Month) || "January",
															startYear || years[0].toString(),
															(endMonth as Month) || "December",
															value,
														),
													);
												}
											}}
											disabled={endYear === "Present"}
										>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Year" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="Present">Present</SelectItem>
												{years.map((year) => (
													<SelectItem key={year} value={year.toString()}>
														{year}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</div>
									<div className="items-top flex space-x-2">
										<Checkbox
											id={`current-position-${index}`}
											checked={endYear === "Present"}
											onCheckedChange={(checked: boolean) => {
												if (checked) {
													updateExperience(
														index,
														"date",
														formatDate(
															(startMonth as Month) || "January",
															startYear || years[0].toString(),
															"December",
															"Present",
														),
													);
												} else {
													updateExperience(
														index,
														"date",
														formatDate(
															(startMonth as Month) || "January",
															startYear || years[0].toString(),
															"December",
															years[0].toString(),
														),
													);
												}
											}}
										/>
										<div className="grid gap-1.5 leading-none">
											<Label
												htmlFor={`current-position-${index}`}
												className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
											>
												I currently work at this company
											</Label>
										</div>
									</div>
								</div>
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
