"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

interface EducationFormProps {
	education: ResumeData["education"];
	addEducation: () => void;
	updateEducation: (index: number, field: string, value: string) => void;
	removeEducation: (index: number) => void;
}

export default function EducationForm({
	education,
	addEducation,
	updateEducation,
	removeEducation,
}: EducationFormProps) {
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
			{education.map((edu, index) => {
				const [startMonth, startYear, endMonth, endYear] = edu.date
					.split(" – ")
					.flatMap((part) => part.split(" "))
					.map((part) => part.trim());

				return (
					<Card
						key={`${edu.institution}-${edu.date}`
							.toLowerCase()
							.replace(/\s+/g, "-")}
						className="mb-4"
					>
						<CardContent className="pt-6">
							<div className="flex justify-between items-center mb-2">
								<h3 className="font-medium">Education #{index + 1}</h3>
								<Button
									variant="destructive"
									size="sm"
									onClick={() => removeEducation(index)}
									disabled={education.length <= 1}
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
								<div className="space-y-4">
									<Label>Date Range</Label>
									<div className="grid grid-cols-4 gap-2">
										<Select
											value={startMonth as Month}
											onValueChange={(value: Month) =>
												updateEducation(
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
												updateEducation(
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
												updateEducation(
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
													updateEducation(
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
													updateEducation(
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
											id={`current-education-${index}`}
											checked={endYear === "Present"}
											onCheckedChange={(checked: boolean) => {
												if (checked) {
													updateEducation(
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
													updateEducation(
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
											<label
												htmlFor={`current-education-${index}`}
												className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
											>
												I currently study at this institution
											</label>
										</div>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				);
			})}
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
