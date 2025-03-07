import type { ResumeData } from "@/lib/types"

interface ResumePreviewProps {
  data: ResumeData
}

export default function ResumePreview({ data }: ResumePreviewProps) {
  return (
    <div className="font-sans text-sm leading-tight text-black">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-black">{data.personal.name || "Your Name"}</h1>
        <p className="text-sm text-gray-700 mt-1">
          {[data.personal.phone, data.personal.email, data.personal.linkedin, data.personal.github]
            .filter(Boolean)
            .join(" | ")}
        </p>
      </div>

      {/* Education Section */}
      {data.education.length > 0 && (
        <div className="mb-5">
          <h2 className="text-lg font-bold border-b border-gray-400 mb-2 pb-1 text-black">Education</h2>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between">
                <div className="font-semibold text-black">{edu.institution}</div>
                <div className="text-gray-700">{edu.location}</div>
              </div>
              <div className="flex justify-between">
                <div className="text-gray-800">{edu.degree}</div>
                <div className="text-gray-700">{edu.date}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Experience Section */}
      {data.experience.length > 0 && (
        <div className="mb-5">
          <h2 className="text-lg font-bold border-b border-gray-400 mb-2 pb-1 text-black">Experience</h2>
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between">
                <div className="font-semibold text-black">{exp.title}</div>
                <div className="text-gray-700">{exp.date}</div>
              </div>
              <div className="flex justify-between">
                <div className="text-gray-800">{exp.company}</div>
                <div className="text-gray-700">{exp.location}</div>
              </div>
              <ul className="list-disc pl-5 mt-2 text-gray-800">
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
        <div className="mb-5">
          <h2 className="text-lg font-bold border-b border-gray-400 mb-2 pb-1 text-black">Projects</h2>
          {data.projects.map((project, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between">
                <div className="font-semibold text-black">
                  {project.name}
                  {project.technologies && <span className="text-gray-700"> | {project.technologies}</span>}
                </div>
                <div className="text-gray-700">{project.date}</div>
              </div>
              <ul className="list-disc pl-5 mt-2 text-gray-800">
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
          <h2 className="text-lg font-bold border-b border-gray-400 mb-2 pb-1 text-black">Technical Skills</h2>
          {data.skills.languages && (
            <div className="mb-1">
              <span className="font-semibold text-black">Languages: </span>
              <span className="text-gray-800">{data.skills.languages}</span>
            </div>
          )}
          {data.skills.frameworks && (
            <div className="mb-1">
              <span className="font-semibold text-black">Frameworks: </span>
              <span className="text-gray-800">{data.skills.frameworks}</span>
            </div>
          )}
          {data.skills.tools && (
            <div className="mb-1">
              <span className="font-semibold text-black">Developer Tools: </span>
              <span className="text-gray-800">{data.skills.tools}</span>
            </div>
          )}
          {data.skills.libraries && (
            <div className="mb-1">
              <span className="font-semibold text-black">Libraries: </span>
              <span className="text-gray-800">{data.skills.libraries}</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

