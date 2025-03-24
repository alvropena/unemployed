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

interface ProjectsFormProps {
	projects: ResumeData["projects"];
	addProject: () => void;
	updateProject: (
		index: number,
		field: string,
		value: string | string[],
	) => void;
	removeProject: (index: number) => void;
	addProjectDetail: (projIndex: number) => void;
	updateProjectDetail: (
		projIndex: number,
		detailIndex: number,
		value: string,
	) => void;
	removeProjectDetail: (projIndex: number, detailIndex: number) => void;
}

export default function ProjectsForm({
	projects,
	addProject,
	updateProject,
	removeProject,
	addProjectDetail,
	updateProjectDetail,
	removeProjectDetail,
}: ProjectsFormProps) {
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
			{projects.map((project, index) => {
				const [startMonth, startYear, endMonth, endYear] = project.date
					.split(" – ")
					.flatMap((part) => part.split(" "))
					.map((part) => part.trim());

				return (
					<Card
						key={`${project.name}-${project.date}`
							.toLowerCase()
							.replace(/\s+/g, "-")}
						className="mb-4"
					>
						<CardContent className="pt-4">
							<div className="flex justify-between items-center mb-2">
								<h3 className="font-medium">Project #{index + 1}</h3>
								<Button
									variant="destructive"
									size="sm"
									onClick={() => removeProject(index)}
								>
									<Trash2 className="h-4 w-4" />
								</Button>
							</div>
							<div className="grid gap-4">
								<div>
									<Label htmlFor={`project-name-${index}`}>Project Name</Label>
									<Input
										id={`project-name-${index}`}
										value={project.name}
										onChange={(e) =>
											updateProject(index, "name", e.target.value)
										}
										placeholder={
											defaultResumeData.projects[
												index % defaultResumeData.projects.length
											].name
										}
									/>
								</div>
								<div>
									<Label htmlFor={`project-tech-${index}`}>Technologies</Label>
									<Input
										id={`project-tech-${index}`}
										value={project.technologies}
										onChange={(e) =>
											updateProject(index, "technologies", e.target.value)
										}
										placeholder={
											defaultResumeData.projects[
												index % defaultResumeData.projects.length
											].technologies
										}
									/>
								</div>
								<div className="space-y-4">
									<Label>Date Range</Label>
									<div className="grid grid-cols-4 gap-2">
										<Select
											value={startMonth as Month}
											onValueChange={(value: Month) =>
												updateProject(
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
												updateProject(
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
												updateProject(
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
													updateProject(
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
													updateProject(
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
											id={`current-project-${index}`}
											checked={endYear === "Present"}
											onCheckedChange={(checked: boolean) => {
												if (checked) {
													updateProject(
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
													updateProject(
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
												htmlFor={`current-project-${index}`}
												className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
											>
												This is an ongoing project
											</label>
										</div>
									</div>
								</div>
								<div>
									<Label>Details</Label>
									{project.details.map((detail, detailIndex) => (
										<div
											key={`${project.name}-detail-${detailIndex}`}
											className="flex gap-2 mb-2"
										>
											<Textarea
												value={detail}
												onChange={(e) =>
													updateProjectDetail(
														index,
														detailIndex,
														e.target.value,
													)
												}
												placeholder={
													defaultResumeData.projects[
														index % defaultResumeData.projects.length
													].details[
														detailIndex %
															defaultResumeData.projects[
																index % defaultResumeData.projects.length
															].details.length
													]
												}
												className="min-h-[80px]"
											/>
											<Button
												variant="destructive"
												size="icon"
												onClick={() => removeProjectDetail(index, detailIndex)}
												disabled={project.details.length <= 1}
											>
												<Trash2 className="h-4 w-4" />
											</Button>
										</div>
									))}
									<Button
										onClick={() => addProjectDetail(index)}
										variant="outline"
										size="sm"
										className="mt-1"
									>
										<Plus className="h-4 w-4 mr-2" /> Add Detail
									</Button>
								</div>
							</div>
						</CardContent>
					</Card>
				);
			})}
			<Button
				onClick={addProject}
				className="w-full"
				disabled={projects.length >= 2}
			>
				<Plus className="h-4 w-4 mr-2" /> Add Project
			</Button>
		</>
	);
}
