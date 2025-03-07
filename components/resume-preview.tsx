import type { ResumeData } from "@/lib/types"
import { defaultResumeData } from "@/lib/default-data"
// Load Computer Modern-like font
// Since we can't directly use Computer Modern, we'll use a similar serif font
// and add specific styling to match the LaTeX output

interface ResumePreviewProps {
  data: ResumeData
}

// Helper function to format phone numbers
const formatPhoneNumber = (phoneNumber: string) => {
  return phoneNumber.replace(/\D/g, '') // Remove non-digit characters
    .replace(/(\d{1,3})(?=(\d{3})+(?!\d))/g, '$1-'); // Add dashes every three digits
};

export default function ResumePreview({ data }: ResumePreviewProps) {
  // Helper function to get value or default
  const getValueOrDefault = (value: string | undefined, defaultValue: string) => value || defaultValue;
  
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="bg-white shadow-lg w-full h-full p-6 font-['Times_New_Roman'] text-[12pt] leading-normal text-black">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-[28pt] font-bold text-black">
            {getValueOrDefault(data?.personal?.name, defaultResumeData.personal.name)}
          </h1>
          <p className="text-[11pt] text-black mt-2">
            {[
              formatPhoneNumber(getValueOrDefault(data?.personal?.phone, defaultResumeData.personal.phone)),
              getValueOrDefault(data?.personal?.email, defaultResumeData.personal.email),
              data?.personal?.linkedin && `linkedin.com/in/${data.personal.linkedin.split('/').pop()}` || defaultResumeData.personal.linkedin,
              data?.personal?.github && `github.com/${data.personal.github.split('/').pop()}` || defaultResumeData.personal.github
            ]
              .filter(Boolean)
              .join(" | ")}
          </p>
        </div>

        {/* Education Section */}
        <div className="mb-6">
          <h2 className="text-[14pt] font-bold border-b border-black mb-3 uppercase">
            Education
          </h2>
          {((data?.education?.length ?? 0) > 0 ? data.education : defaultResumeData.education).map((edu, index) => (
            <div key={index} className="mb-2">
              <div className="flex justify-between items-baseline">
                <div className="font-bold">{edu.institution}</div>
                <div>{edu.location}</div>
              </div>
              <div className="flex justify-between items-baseline">
                <div className="italic">{edu.degree}</div>
                <div>{edu.date}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Experience Section */}
        <div className="mb-6">
          <h2 className="text-[14pt] font-bold border-b border-black mb-3 uppercase">
            Experience
          </h2>
          {((data?.experience?.length ?? 0) > 0 ? data.experience : defaultResumeData.experience).map((exp, index) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between items-baseline">
                <div className="font-bold">{exp.title}</div>
                <div>{exp.date}</div>
              </div>
              <div className="flex justify-between items-baseline">
                <div className="italic">{exp.company}</div>
                <div>{exp.location}</div>
              </div>
              <ul className="list-disc ml-4 mt-1">
                {exp.responsibilities.map((resp, respIndex) => (
                  <li key={respIndex} className="text-[11pt]">{resp}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Projects Section */}
        <div className="mb-6">
          <h2 className="text-[14pt] font-bold border-b border-black mb-3 uppercase">
            Projects
          </h2>
          {((data?.projects?.length ?? 0) > 0 ? data.projects : defaultResumeData.projects).map((project, index) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between items-baseline">
                <div>
                  <span className="font-bold">{project.name}</span>
                  {project.technologies && (
                    <span className="italic"> | {project.technologies}</span>
                  )}
                </div>
                <div>{project.date}</div>
              </div>
              <ul className="list-disc ml-4 mt-1">
                {project.details.map((detail, detailIndex) => (
                  <li key={detailIndex} className="text-[11pt]">{detail}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Technical Skills Section */}
        <div>
          <h2 className="text-[14pt] font-bold border-b border-black mb-3 uppercase">
            Technical Skills
          </h2>
          <div className="space-y-2">
            <div>
              <span className="font-bold">Languages:</span>{" "}
              <span>{getValueOrDefault(data?.skills?.languages, defaultResumeData.skills.languages)}</span>
            </div>
            <div>
              <span className="font-bold">Frameworks:</span>{" "}
              <span>{getValueOrDefault(data?.skills?.frameworks, defaultResumeData.skills.frameworks)}</span>
            </div>
            <div>
              <span className="font-bold">Developer Tools:</span>{" "}
              <span>{getValueOrDefault(data?.skills?.tools, defaultResumeData.skills.tools)}</span>
            </div>
            <div>
              <span className="font-bold">Libraries:</span>{" "}
              <span>{getValueOrDefault(data?.skills?.libraries, defaultResumeData.skills.libraries)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

