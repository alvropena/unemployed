import { useState, type KeyboardEvent } from "react";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import type { ResumeData } from "@/lib/types";

interface SkillsFormProps {
	skills: ResumeData["skills"];
	updateSkills: (category: string, value: string) => void;
}

const SUGGESTED_SKILLS = {
	languages: [
		"JavaScript",
		"TypeScript",
		"Python",
		"Java",
		"C++",
		"Go",
		"Rust",
		"PHP",
		"Ruby",
		"Swift",
	],
	frameworks: [
		"React",
		"Next.js",
		"Vue",
		"Angular",
		"Django",
		"Flask",
		"Express",
		"Spring",
		"Laravel",
	],
	tools: [
		"Git",
		"Docker",
		"Kubernetes",
		"AWS",
		"Azure",
		"GCP",
		"Linux",
		"Nginx",
		"Jenkins",
	],
	libraries: [
		"Redux",
		"TailwindCSS",
		"Material-UI",
		"Bootstrap",
		"jQuery",
		"pandas",
		"NumPy",
		"React Query",
	],
};

const defaultSkills: ResumeData["skills"] = {
	languages: "",
	frameworks: "",
	tools: "",
	libraries: "",
};

export default function SkillsForm({
	skills = defaultSkills,
	updateSkills,
}: SkillsFormProps) {
	const [inputValues, setInputValues] = useState({
		languages: "",
		frameworks: "",
		tools: "",
		libraries: "",
	});

	const handleKeyDown = (
		category: string,
		e: KeyboardEvent<HTMLInputElement>,
	) => {
		if (e.key === " " || e.key === "Enter") {
			e.preventDefault();
			const value = inputValues[category as keyof typeof inputValues].trim();
			if (value) {
				const currentSkills = (skills[category as keyof typeof skills] || "")
					.split(",")
					.filter(Boolean)
					.map((s) => s.trim());
				if (!currentSkills.includes(value)) {
					const newSkills = [...currentSkills, value].join(", ");
					updateSkills(category, newSkills);
				}
				setInputValues((prev) => ({ ...prev, [category]: "" }));
			}
		}
	};

	const handleSuggestionClick = (category: string, skill: string) => {
		const currentSkills = (skills[category as keyof typeof skills] || "")
			.split(",")
			.filter(Boolean)
			.map((s) => s.trim());
		if (!currentSkills.includes(skill)) {
			const newSkills = [...currentSkills, skill].join(", ");
			updateSkills(category, newSkills);
		}
	};

	const removeSkill = (category: string, skillToRemove: string) => {
		const currentSkills = (skills[category as keyof typeof skills] || "")
			.split(",")
			.filter(Boolean)
			.map((s) => s.trim());
		const newSkills = currentSkills
			.filter((skill) => skill !== skillToRemove)
			.join(", ");
		updateSkills(category, newSkills);
	};

	const renderSkillSection = (category: string, label: string) => {
		const currentSkills = (skills[category as keyof typeof skills] || "")
			.split(",")
			.filter(Boolean)
			.map((s) => s.trim());
		const suggestions = SUGGESTED_SKILLS[
			category as keyof typeof SUGGESTED_SKILLS
		].filter((skill) => !currentSkills.includes(skill));

		const inputId = `skill-${category}`;

		return (
			<div className="space-y-3">
				<div>
					<label htmlFor={inputId} className="text-sm font-medium">
						{label}
					</label>
					<div className="mt-1.5">
						<div className="flex flex-wrap items-center gap-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
							{currentSkills.map((skill) => (
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
								value={inputValues[category as keyof typeof inputValues]}
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
												: category === "tools"
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
		<div className="grid gap-6">
			{renderSkillSection("languages", "Languages")}
			{renderSkillSection("frameworks", "Frameworks")}
			{renderSkillSection("tools", "Developer Tools")}
			{renderSkillSection("libraries", "Libraries")}
		</div>
	);
}
