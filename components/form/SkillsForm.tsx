import { useState, type KeyboardEvent } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, X } from "lucide-react";
import type { ResumeData } from "@/types/types";
import { SUGGESTED_SKILLS } from "@/constants/suggestedSkills";
import { Button } from "@/components/ui/button";

interface SkillsFormProps {
	skills?: ResumeData["skills"];
	updateSkills: (index: number, category: string, value: string) => void;
	onBack?: () => void;
}

const defaultSkills: ResumeData["skills"] = [{
	languages: "",
	frameworks: "",
	developerTools: "",
	libraries: "",
}];

export default function SkillsForm({
	skills = defaultSkills,
	updateSkills,
	onBack,
}: SkillsFormProps) {
	const [inputValues, setInputValues] = useState({
		languages: "",
		frameworks: "",
		developerTools: "",
		libraries: "",
	});

	// Ensure skills[0] exists
	const currentSkillsData = skills?.[0] || defaultSkills[0];

	const handleKeyDown = (
		category: keyof typeof SUGGESTED_SKILLS,
		e: KeyboardEvent<HTMLInputElement>,
	) => {
		if (e.key === " " || e.key === "Enter") {
			e.preventDefault();
			const value = inputValues[category].trim();
			if (value) {
				const currentSkills = (currentSkillsData[category] || "")
					.split(",")
					.filter(Boolean)
					.map((s: string) => s.trim());
				if (!currentSkills.includes(value)) {
					const newSkills = [...currentSkills, value].join(", ");
					updateSkills(0, category, newSkills);
				}
				setInputValues((prev) => ({ ...prev, [category]: "" }));
			}
		}
	};

	const handleSuggestionClick = (category: keyof typeof SUGGESTED_SKILLS, skill: string) => {
		const currentSkills = (currentSkillsData[category] || "")
			.split(",")
			.filter(Boolean)
			.map((s: string) => s.trim());
		if (!currentSkills.includes(skill)) {
			const newSkills = [...currentSkills, skill].join(", ");
			updateSkills(0, category, newSkills);
		}
	};

	const removeSkill = (category: keyof typeof SUGGESTED_SKILLS, skillToRemove: string) => {
		const currentSkills = (currentSkillsData[category] || "")
			.split(",")
			.filter(Boolean)
			.map((s: string) => s.trim());
		const newSkills = currentSkills
			.filter((skill: string) => skill !== skillToRemove)
			.join(", ");
		updateSkills(0, category, newSkills);
	};

	const renderSkillSection = (category: keyof typeof SUGGESTED_SKILLS, label: string) => {
		const currentSkills = (currentSkillsData[category] || "")
			.split(",")
			.filter(Boolean)
			.map((s: string) => s.trim());
		const suggestions = SUGGESTED_SKILLS[category].filter((skill) => !currentSkills.includes(skill));

		const inputId = `skill-${category}`;

		return (
			<div className="space-y-3">
				<div>
					<label htmlFor={inputId} className="text-sm font-medium">
						{label}
					</label>
					<div className="mt-1.5">
						<div className="flex flex-wrap items-center gap-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
							{currentSkills.map((skill: string) => (
								<Badge
									key={skill}
									variant="secondary"
									className="px-2 py-0.5 text-xs flex items-center gap-1 bg-muted/50"
								>
									{skill}
									<button
										type="button"
										onClick={() => removeSkill(category, skill)}
										className="inline-flex items-center justify-center hover:bg-destructive/10 rounded-sm"
									>
										<X className="h-3 w-3 hover:text-destructive transition-colors" />
									</button>
								</Badge>
							))}
							<input
								id={inputId}
								value={inputValues[category]}
								onChange={(e) =>
									setInputValues((prev) => ({
										...prev,
										[category]: e.target.value,
									}))
								}
								onKeyDown={(e) => handleKeyDown(category, e)}
								placeholder={
									currentSkills.length === 0
										? category === "languages"
											? "JavaScript, TypeScript, Python, Java, C++"
											: category === "frameworks"
												? "React, Next.js, Vue, Angular, Django"
												: category === "developerTools"
													? "Git, Docker, Kubernetes, AWS, Azure"
													: "Redux, TailwindCSS, Material-UI, Bootstrap, jQuery"
										: ""
								}
								className="flex-1 bg-transparent outline-none min-w-[200px] placeholder:text-muted-foreground"
							/>
						</div>
					</div>

					{/* Suggestions */}
					<div className="flex flex-wrap gap-1.5 mt-2">
						{suggestions.map((skill) => (
							<Badge
								key={skill}
								variant="outline"
								className="px-2 py-0.5 text-xs cursor-pointer hover:bg-accent transition-colors"
								onClick={() => handleSuggestionClick(category, skill)}
							>
								{skill}
							</Badge>
						))}
					</div>
				</div>
			</div>
		);
	};

	return (
		<div className="space-y-4">
			<Card>
				<CardHeader>
					<CardTitle>Technical Skills</CardTitle>
				</CardHeader>
				<CardContent className="grid gap-6">
					{renderSkillSection("languages", "Languages")}
					{renderSkillSection("frameworks", "Frameworks")}
					{renderSkillSection("developerTools", "Developer Tools")}
					{renderSkillSection("libraries", "Libraries")}
				</CardContent>
			</Card>

			<div className="flex justify-between">
				<Button 
					variant="outline" 
					onClick={onBack}
				>
					<ArrowLeft className="w-4 h-4 mr-1" />
					Back
				</Button>
			</div>
		</div>
	);
}
