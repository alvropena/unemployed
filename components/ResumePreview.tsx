import type { ResumeData } from "@/types/types";
import { Card, CardContent } from "@/components/ui/card";

interface ResumePreviewProps {
  data: ResumeData;
  isSaving?: boolean;
}

export default function ResumePreview({ data, isSaving }: ResumePreviewProps) {
  return (
    <Card className="h-fit relative">
      <CardContent className="p-6">
        {/* Header - Name and contact info */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">
            {data?.personal?.name || "Your Name"}
          </h1>
          <div className="text-sm text-muted-foreground space-x-2">
            {data?.personal?.phone && <span>{data.personal.phone}</span>}
            {data?.personal?.email && <span>•</span>}
            {data?.personal?.email && <span>{data.personal.email}</span>}
            {data?.personal?.linkedin && <span>•</span>}
            {data?.personal?.linkedin && (
              <a
                href={data.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                LinkedIn
              </a>
            )}
            {data?.personal?.github && <span>•</span>}
            {data?.personal?.github && (
              <a
                href={data.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                GitHub
              </a>
            )}
          </div>
        </div>

        {/* Education Section */}
        {data?.education && data.education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3">Education</h2>
            {data.education.map((edu, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium">{edu.institution}</h3>
                    <p className="text-sm text-muted-foreground">
                      {edu.degree}
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {edu.startDate.toLocaleDateString()} -{" "}
                    {edu.current
                      ? "Present"
                      : edu.endDate?.toLocaleDateString()}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{edu.location}</p>
              </div>
            ))}
          </div>
        )}

        {/* Experience Section */}
        {data?.experience && data.experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3">Experience</h2>
            {data.experience.map((exp, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium">{exp.position}</h3>
                    <p className="text-sm text-muted-foreground">
                      {exp.company}
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {exp.startDate.toLocaleDateString()} -{" "}
                    {exp.current
                      ? "Present"
                      : exp.endDate?.toLocaleDateString()}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{exp.location}</p>
                <ul className="list-disc list-inside mt-2 text-sm">
                  {exp.responsibilityOne && <li>{exp.responsibilityOne}</li>}
                  {exp.responsibilityTwo && <li>{exp.responsibilityTwo}</li>}
                  {exp.responsibilityThree && (
                    <li>{exp.responsibilityThree}</li>
                  )}
                  {exp.responsibilityFour && <li>{exp.responsibilityFour}</li>}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Projects Section */}
        {data?.projects && data.projects.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3">Projects</h2>
            {data.projects.map((project, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between">
                  <h3 className="font-medium">{project.name}</h3>
                  <div className="text-sm text-muted-foreground">
                    {project.startDate?.toLocaleDateString()} -{" "}
                    {project.current
                      ? "Present"
                      : project.endDate?.toLocaleDateString()}
                  </div>
                </div>
                <ul className="list-disc list-inside mt-2 text-sm">
                  {project.responsibilityOne && (
                    <li>{project.responsibilityOne}</li>
                  )}
                  {project.responsibilityTwo && (
                    <li>{project.responsibilityTwo}</li>
                  )}
                  {project.responsibilityThree && (
                    <li>{project.responsibilityThree}</li>
                  )}
                  {project.responsibilityFour && (
                    <li>{project.responsibilityFour}</li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Skills Section */}
        {data?.skills && data.skills.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-3">Skills</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              {data.skills[0].languages && (
                <div>
                  <h3 className="font-medium mb-1">Languages</h3>
                  <p className="text-muted-foreground">
                    {data.skills[0].languages}
                  </p>
                </div>
              )}
              {data.skills[0].frameworks && (
                <div>
                  <h3 className="font-medium mb-1">Frameworks</h3>
                  <p className="text-muted-foreground">
                    {data.skills[0].frameworks}
                  </p>
                </div>
              )}
              {data.skills[0].developerTools && (
                <div>
                  <h3 className="font-medium mb-1">Developer Tools</h3>
                  <p className="text-muted-foreground">
                    {data.skills[0].developerTools}
                  </p>
                </div>
              )}
              {data.skills[0].libraries && (
                <div>
                  <h3 className="font-medium mb-1">Libraries</h3>
                  <p className="text-muted-foreground">
                    {data.skills[0].libraries}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
