import type { ResumeData } from "@/lib/types"

interface ResumePreviewProps {
  data: ResumeData
}

export default function ResumePreview({ data }: ResumePreviewProps) {
  return (
    <div className="font-sans text-sm leading-tight">
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold">{data.personal.name || "Your Name"}</h1>
        <p className="text-sm">
          {[data.personal.phone, data.personal.email, data.personal.linkedin, data.personal.github]
            .filter(Boolean)
            .join(" | ")}
        </p>
      </div>

      {/* Education Section */}
      {data.education.length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-bold border-b border-gray-300 mb-2">Education</h2>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-2">
              <div className="flex justify-between">
                <div className="font-semibold">{edu.institution}</div>
                <div>{edu.location}</div>
              </div>
              <div className="flex justify-between">
                <div>{edu.degree}</div>
                <div>{edu.date}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Experience Section */}
      {data.experience.length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-bold border-b border-gray-300 mb-2">Experience</h2>
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between">
                <div className="font-semibold">{exp.title}</div>
                <div>{exp.date}</div>
              </div>
              <div className="flex justify-between">
                <div>{exp.company}</div>
                <div>{exp.location}</div>
              </div>
              <ul className="list-disc pl-5 mt-1">
                {exp.responsibilities.map((resp, respIndex) => (
                  <li key={respIndex}>{resp}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Projects Section */}
      {data.projects.length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-bold border-b border-gray-300 mb-2">Projects</h2>
          {data.projects.map((project, index) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between">
                <div className="font-semibold">
                  {project.name}
                  {project.technologies && ` | ${project.technologies}`}
                </div>
                <div>{project.date}</div>
              </div>
              <ul className="list-disc pl-5 mt-1">
                {project.details.map((detail, detailIndex) => (
                  <li key={detailIndex}>{detail}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Technical Skills Section */}
      {(data.skills.languages || data.skills.frameworks || data.skills.tools || data.skills.libraries) && (
        <div>
          <h2 className="text-lg font-bold border-b border-gray-300 mb-2">Technical Skills</h2>
          {data.skills.languages && (
            <div className="mb-1">
              <span className="font-semibold">Languages: </span>
              {data.skills.languages}
            </div>
          )}
          {data.skills.frameworks && (
            <div className="mb-1">
              <span className="font-semibold">Frameworks: </span>
              {data.skills.frameworks}
            </div>
          )}
          {data.skills.tools && (
            <div className="mb-1">
              <span className="font-semibold">Developer Tools: </span>
              {data.skills.tools}
            </div>
          )}
          {data.skills.libraries && (
            <div className="mb-1">
              <span className="font-semibold">Libraries: </span>
              {data.skills.libraries}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

