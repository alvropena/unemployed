"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Trash2 } from "lucide-react"
import type { ResumeData } from "@/lib/types"

interface ResumeFormProps {
  data: ResumeData
  setData: React.Dispatch<React.SetStateAction<ResumeData>>
}

export default function ResumeForm({ data, setData }: ResumeFormProps) {
  const [activeTab, setActiveTab] = useState("personal")

  const updatePersonal = (field: string, value: string) => {
    setData((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        [field]: value,
      },
    }))
  }

  const addEducation = () => {
    setData((prev) => ({
      ...prev,
      education: [...prev.education, { institution: "", location: "", degree: "", date: "" }],
    }))
  }

  const updateEducation = (index: number, field: string, value: string) => {
    setData((prev) => {
      const newEducation = [...prev.education]
      newEducation[index] = { ...newEducation[index], [field]: value }
      return { ...prev, education: newEducation }
    })
  }

  const removeEducation = (index: number) => {
    setData((prev) => {
      const newEducation = [...prev.education]
      newEducation.splice(index, 1)
      return { ...prev, education: newEducation }
    })
  }

  const addExperience = () => {
    setData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          title: "",
          company: "",
          location: "",
          date: "",
          responsibilities: [""],
        },
      ],
    }))
  }

  const updateExperience = (index: number, field: string, value: string | string[]) => {
    setData((prev) => {
      const newExperience = [...prev.experience]
      newExperience[index] = { ...newExperience[index], [field]: value }
      return { ...prev, experience: newExperience }
    })
  }

  const addResponsibility = (expIndex: number) => {
    setData((prev) => {
      const newExperience = [...prev.experience]
      newExperience[expIndex] = {
        ...newExperience[expIndex],
        responsibilities: [...newExperience[expIndex].responsibilities, ""],
      }
      return { ...prev, experience: newExperience }
    })
  }

  const updateResponsibility = (expIndex: number, respIndex: number, value: string) => {
    setData((prev) => {
      const newExperience = [...prev.experience]
      const newResponsibilities = [...newExperience[expIndex].responsibilities]
      newResponsibilities[respIndex] = value
      newExperience[expIndex] = {
        ...newExperience[expIndex],
        responsibilities: newResponsibilities,
      }
      return { ...prev, experience: newExperience }
    })
  }

  const removeResponsibility = (expIndex: number, respIndex: number) => {
    setData((prev) => {
      const newExperience = [...prev.experience]
      const newResponsibilities = [...newExperience[expIndex].responsibilities]
      newResponsibilities.splice(respIndex, 1)
      newExperience[expIndex] = {
        ...newExperience[expIndex],
        responsibilities: newResponsibilities,
      }
      return { ...prev, experience: newExperience }
    })
  }

  const removeExperience = (index: number) => {
    setData((prev) => {
      const newExperience = [...prev.experience]
      newExperience.splice(index, 1)
      return { ...prev, experience: newExperience }
    })
  }

  const addProject = () => {
    setData((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          name: "",
          technologies: "",
          date: "",
          details: [""],
        },
      ],
    }))
  }

  const updateProject = (index: number, field: string, value: string | string[]) => {
    setData((prev) => {
      const newProjects = [...prev.projects]
      newProjects[index] = { ...newProjects[index], [field]: value }
      return { ...prev, projects: newProjects }
    })
  }

  const addProjectDetail = (projIndex: number) => {
    setData((prev) => {
      const newProjects = [...prev.projects]
      newProjects[projIndex] = {
        ...newProjects[projIndex],
        details: [...newProjects[projIndex].details, ""],
      }
      return { ...prev, projects: newProjects }
    })
  }

  const updateProjectDetail = (projIndex: number, detailIndex: number, value: string) => {
    setData((prev) => {
      const newProjects = [...prev.projects]
      const newDetails = [...newProjects[projIndex].details]
      newDetails[detailIndex] = value
      newProjects[projIndex] = {
        ...newProjects[projIndex],
        details: newDetails,
      }
      return { ...prev, projects: newProjects }
    })
  }

  const removeProjectDetail = (projIndex: number, detailIndex: number) => {
    setData((prev) => {
      const newProjects = [...prev.projects]
      const newDetails = [...newProjects[projIndex].details]
      newDetails.splice(detailIndex, 1)
      newProjects[projIndex] = {
        ...newProjects[projIndex],
        details: newDetails,
      }
      return { ...prev, projects: newProjects }
    })
  }

  const removeProject = (index: number) => {
    setData((prev) => {
      const newProjects = [...prev.projects]
      newProjects.splice(index, 1)
      return { ...prev, projects: newProjects }
    })
  }

  const updateSkills = (category: string, value: string) => {
    setData((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        [category]: value,
      },
    }))
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="grid grid-cols-5 mb-4">
        <TabsTrigger value="personal">Personal</TabsTrigger>
        <TabsTrigger value="education">Education</TabsTrigger>
        <TabsTrigger value="experience">Experience</TabsTrigger>
        <TabsTrigger value="projects">Projects</TabsTrigger>
        <TabsTrigger value="skills">Skills</TabsTrigger>
      </TabsList>

      <TabsContent value="personal" className="space-y-4">
        <div className="grid gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <Input
              value={data.personal.name}
              onChange={(e) => updatePersonal("name", e.target.value)}
              placeholder="Full Name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <Input
              value={data.personal.phone}
              onChange={(e) => updatePersonal("phone", e.target.value)}
              placeholder="Phone Number"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <Input
              value={data.personal.email}
              onChange={(e) => updatePersonal("email", e.target.value)}
              placeholder="Email Address"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">LinkedIn</label>
            <Input
              value={data.personal.linkedin}
              onChange={(e) => updatePersonal("linkedin", e.target.value)}
              placeholder="LinkedIn URL"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">GitHub</label>
            <Input
              value={data.personal.github}
              onChange={(e) => updatePersonal("github", e.target.value)}
              placeholder="GitHub URL"
            />
          </div>
        </div>
      </TabsContent>

      <TabsContent value="education" className="space-y-4">
        {data.education.map((edu, index) => (
          <Card key={index} className="mb-4">
            <CardContent className="pt-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Education #{index + 1}</h3>
                <Button variant="destructive" size="sm" onClick={() => removeEducation(index)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Institution</label>
                  <Input
                    value={edu.institution}
                    onChange={(e) => updateEducation(index, "institution", e.target.value)}
                    placeholder="University/College Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Location</label>
                  <Input
                    value={edu.location}
                    onChange={(e) => updateEducation(index, "location", e.target.value)}
                    placeholder="City, State"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Degree</label>
                  <Input
                    value={edu.degree}
                    onChange={(e) => updateEducation(index, "degree", e.target.value)}
                    placeholder="Degree and Major"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Date</label>
                  <Input
                    value={edu.date}
                    onChange={(e) => updateEducation(index, "date", e.target.value)}
                    placeholder="Aug. 2018 – May 2021"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        <Button onClick={addEducation} className="w-full">
          <Plus className="h-4 w-4 mr-2" /> Add Education
        </Button>
      </TabsContent>

      <TabsContent value="experience" className="space-y-4">
        {data.experience.map((exp, index) => (
          <Card key={index} className="mb-4">
            <CardContent className="pt-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Experience #{index + 1}</h3>
                <Button variant="destructive" size="sm" onClick={() => removeExperience(index)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <Input
                    value={exp.title}
                    onChange={(e) => updateExperience(index, "title", e.target.value)}
                    placeholder="Job Title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Company</label>
                  <Input
                    value={exp.company}
                    onChange={(e) => updateExperience(index, "company", e.target.value)}
                    placeholder="Company Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Location</label>
                  <Input
                    value={exp.location}
                    onChange={(e) => updateExperience(index, "location", e.target.value)}
                    placeholder="City, State"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Date</label>
                  <Input
                    value={exp.date}
                    onChange={(e) => updateExperience(index, "date", e.target.value)}
                    placeholder="June 2020 – Present"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Responsibilities</label>
                  {exp.responsibilities.map((resp, respIndex) => (
                    <div key={respIndex} className="flex gap-2 mb-2">
                      <Textarea
                        value={resp}
                        onChange={(e) => updateResponsibility(index, respIndex, e.target.value)}
                        placeholder="Responsibility description"
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
                  <Button onClick={() => addResponsibility(index)} size="sm" variant="outline" className="mt-1">
                    <Plus className="h-4 w-4 mr-2" /> Add Responsibility
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        <Button onClick={addExperience} className="w-full">
          <Plus className="h-4 w-4 mr-2" /> Add Experience
        </Button>
      </TabsContent>

      <TabsContent value="projects" className="space-y-4">
        {data.projects.map((project, index) => (
          <Card key={index} className="mb-4">
            <CardContent className="pt-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Project #{index + 1}</h3>
                <Button variant="destructive" size="sm" onClick={() => removeProject(index)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Project Name</label>
                  <Input
                    value={project.name}
                    onChange={(e) => updateProject(index, "name", e.target.value)}
                    placeholder="Project Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Technologies</label>
                  <Input
                    value={project.technologies}
                    onChange={(e) => updateProject(index, "technologies", e.target.value)}
                    placeholder="Python, Flask, React, PostgreSQL, Docker"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Date</label>
                  <Input
                    value={project.date}
                    onChange={(e) => updateProject(index, "date", e.target.value)}
                    placeholder="June 2020 – Present"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Details</label>
                  {project.details.map((detail, detailIndex) => (
                    <div key={detailIndex} className="flex gap-2 mb-2">
                      <Textarea
                        value={detail}
                        onChange={(e) => updateProjectDetail(index, detailIndex, e.target.value)}
                        placeholder="Project detail"
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
                  <Button onClick={() => addProjectDetail(index)} size="sm" variant="outline" className="mt-1">
                    <Plus className="h-4 w-4 mr-2" /> Add Detail
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        <Button onClick={addProject} className="w-full">
          <Plus className="h-4 w-4 mr-2" /> Add Project
        </Button>
      </TabsContent>

      <TabsContent value="skills" className="space-y-4">
        <div className="grid gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Languages</label>
            <Input
              value={data.skills.languages}
              onChange={(e) => updateSkills("languages", e.target.value)}
              placeholder="Java, Python, C/C++, SQL, JavaScript, HTML/CSS, R"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Frameworks</label>
            <Input
              value={data.skills.frameworks}
              onChange={(e) => updateSkills("frameworks", e.target.value)}
              placeholder="React, Node.js, Flask, JUnit, WordPress, Material-UI"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Developer Tools</label>
            <Input
              value={data.skills.tools}
              onChange={(e) => updateSkills("tools", e.target.value)}
              placeholder="Git, Docker, TravisCI, Google Cloud Platform, VS Code"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Libraries</label>
            <Input
              value={data.skills.libraries}
              onChange={(e) => updateSkills("libraries", e.target.value)}
              placeholder="pandas, NumPy, Matplotlib"
            />
          </div>
        </div>
      </TabsContent>
    </Tabs>
  )
}

