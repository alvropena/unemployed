import type { ResumeData } from "@/types/types";
import { defaultResumeData } from "@/lib/defaultData";
// Load Computer Modern-like font
// Since we can't directly use Computer Modern, we'll use a similar serif font
// and add specific styling to match the LaTeX output

interface ResumePreviewProps {
	data: ResumeData;
}

// Helper function to format phone numbers
const formatPhoneNumber = (phoneNumber: string) => {
	const cleaned = phoneNumber.replace(/\D/g, ""); // Remove non-digit characters
	const length = cleaned.length;
	if (length <= 3) return cleaned;
	if (length <= 6) return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
	if (length <= 10)
		return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
	return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}-${cleaned.slice(10)}`;
};

// Helper function to format dates
const formatDate = (date: Date | null | undefined) => {
	if (!date) return "Present";
	const month = date.toLocaleString('default', { month: 'short' });
	const year = date.getFullYear();
	return `${month} ${year}`;
};

// Helper function to format date range
const formatDateRange = (startDate: Date, endDate?: Date | null) => {
	return `${formatDate(startDate)} – ${formatDate(endDate)}`;
};

export default function ResumePreview({ data }: ResumePreviewProps) {
	// Helper function to get value or default
	const getValueOrDefault = (value: string | undefined, defaultValue: string) =>
		value || defaultValue;

	return (
		<div
			id="resume-preview"
			className="h-fit w-full p-6 bg-white font-['Times_New_Roman'] text-[11pt] leading-[1.3] text-black"
		>
			{/* Header - Name and contact info */}
			<div className="text-center mb-[8pt]">
				<h1 className="text-[24pt] font-bold mb-[4pt]">
					{getValueOrDefault(
						data?.personal?.name,
						defaultResumeData.personal.name,
					)}
				</h1>
				{/* Contact info with pipe separators */}
				<p className="text-[10pt] text-black">
					{[
						formatPhoneNumber(
							getValueOrDefault(
								data?.personal?.phone,
								defaultResumeData.personal.phone,
							),
						),
						<a
							key="email"
							href={`mailto:${getValueOrDefault(data?.personal?.email, defaultResumeData.personal.email)}`}
							className="underline"
						>
							{getValueOrDefault(
								data?.personal?.email,
								defaultResumeData.personal.email,
							)}
						</a>,
						(data?.personal?.linkedin && (
							<a
								key="linkedin"
								href={`https://linkedin.com/in/${data.personal.linkedin.split("/").pop()}`}
								className="underline"
							>
								{`linkedin.com/in/${data.personal.linkedin.split("/").pop()}`}
							</a>
						)) || (
							<a
								key="linkedin-default"
								href={defaultResumeData.personal.linkedin}
								className="underline"
							>
								{defaultResumeData.personal.linkedin}
							</a>
						),
						(data?.personal?.github && (
							<a
								key="github"
								href={`https://github.com/${data.personal.github.split("/").pop()}`}
								className="underline"
							>
								{`github.com/${data.personal.github.split("/").pop()}`}
							</a>
						)) || (
							<a
								key="github-default"
								href={defaultResumeData.personal.github}
								className="underline"
							>
								{defaultResumeData.personal.github}
							</a>
						),
					]
						.filter(Boolean)
						.flatMap((item, index) => {
							if (index === 0) return [item];
							return [" | ", item];
						})}
				</p>
			</div>

			{/* Education Section */}
			<div className="mb-[10pt]">
				<h2 className="text-[14pt] font-bold uppercase border-b border-black pb-[3pt] mb-[6pt] text-left">
					Education
				</h2>
				<ul className="list-none pl-0">
					{((data?.education?.length ?? 0) > 0
						? data.education
						: defaultResumeData.education
					).map((edu) => (
						<li
							key={`${edu.institution}-${edu.degree}-${edu.startDate}`}
							className="mb-[7pt]"
						>
							<div className="flex justify-between items-baseline w-full">
								<div className="font-bold">{edu.institution}</div>
								<div>{edu.location}</div>
							</div>
							<div className="flex justify-between items-baseline w-full">
								<div className="italic text-[10pt]">{edu.degree}</div>
								<div className="italic text-[10pt]">{formatDateRange(edu.startDate, edu.endDate)}</div>
							</div>
							{edu.description && (
								<div className="text-[10pt] mt-[2pt]">{edu.description}</div>
							)}
						</li>
					))}
				</ul>
			</div>

			{/* Experience Section */}
			<div className="mb-[10pt]">
				<h2 className="text-[14pt] font-bold uppercase border-b border-black pb-[3pt] mb-[6pt] text-left">
					Experience
				</h2>
				<ul className="list-none pl-0">
					{((data?.experience?.length ?? 0) > 0
						? data.experience
						: defaultResumeData.experience
					).map((exp) => (
						<li
							key={`${exp.company}-${exp.position}-${exp.startDate}`}
							className="mb-[7pt]"
						>
							<div className="flex justify-between items-baseline w-full">
								<div className="font-bold">{exp.position}</div>
								<div>{formatDateRange(exp.startDate, exp.endDate)}</div>
							</div>
							<div className="flex justify-between items-baseline w-full">
								<div className="italic text-[10pt]">{exp.company}</div>
								<div className="italic text-[10pt]">{exp.location}</div>
							</div>
							<ul className="list-disc pl-[15pt] mt-[2pt]">
								{exp.description.map((desc, index) => (
									<li
										key={`${exp.company}-${exp.position}-desc-${index}`}
										className="text-[10pt] mb-[2pt]"
									>
										{desc}
									</li>
								))}
							</ul>
						</li>
					))}
				</ul>
			</div>

			{/* Projects Section */}
			<div className="mb-[10pt]">
				<h2 className="text-[14pt] font-bold uppercase border-b border-black pb-[3pt] mb-[6pt] text-left">
					Projects
				</h2>
				<ul className="list-none pl-0">
					{((data?.projects?.length ?? 0) > 0
						? data.projects
						: defaultResumeData.projects
					).map((project) => (
						<li 
							key={`${project.name}-${project.startDate}`} 
							className="mb-[7pt]"
						>
							<div className="flex justify-between items-baseline w-full">
								<div className="font-bold">{project.name}</div>
								<div>{formatDateRange(project.startDate!, project.endDate)}</div>
							</div>
							<ul className="list-disc pl-[15pt] mt-[2pt]">
								{(project.description || []).map((desc, index) => (
									<li
										key={`${project.name}-desc-${index}`}
										className="text-[10pt] mb-[2pt]"
									>
										{desc}
									</li>
								))}
							</ul>
						</li>
					))}
				</ul>
			</div>

			{/* Technical Skills Section */}
			<div>
				<h2 className="text-[14pt] font-bold uppercase border-b border-black pb-[3pt] mb-[6pt] text-left">
					Technical Skills
				</h2>
				<ul className="list-none pl-0 text-[10pt]">
					{["languages", "frameworks", "developer_tools", "libraries"].map((category) => (
						<li key={category} className="mb-[2pt]">
							<span className="font-bold capitalize">
								{category.replace("_", " ")}:
							</span>{" "}
							<span>
								{((data?.skills?.length ?? 0) > 0
									? data.skills
									: defaultResumeData.skills
								)
									.filter((skill) => skill.category === category)
									.map((skill) => skill.name)
									.join(", ")}
							</span>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
