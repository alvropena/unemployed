import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import type { ResumeData } from "@/lib/types";
import { defaultResumeData } from "@/lib/default-data";

interface ExperienceFormProps {
  experience: ResumeData["experience"];
  addExperience: () => void;
  updateExperience: (index: number, field: string, value: string | string[]) => void;
  removeExperience: (index: number) => void;
  addResponsibility: (expIndex: number) => void;
  updateResponsibility: (expIndex: number, respIndex: number, value: string) => void;
  removeResponsibility: (expIndex: number, respIndex: number) => void;
}

export default function ExperienceForm({
  experience,
  addExperience,
  updateExperience,
  removeExperience,
  addResponsibility,
  updateResponsibility,
  removeResponsibility,
}: ExperienceFormProps) {
  return (
    <>
      {experience.map((exp, index) => (
        <Card key={index} className="mb-4">
          <CardContent className="pt-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Experience #{index + 1}</h3>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => removeExperience(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <Input
                  value={exp.title}
                  onChange={(e) => updateExperience(index, "title", e.target.value)}
                  placeholder={defaultResumeData.experience[index % defaultResumeData.experience.length].title}
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
                      placeholder={defaultResumeData.experience[index % defaultResumeData.experience.length].responsibilities[respIndex % defaultResumeData.experience[index % defaultResumeData.experience.length].responsibilities.length]}
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
                <Button
                  onClick={() => addResponsibility(index)}
                  size="sm"
                  variant="outline"
                  className="mt-1"
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Responsibility
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      <Button onClick={addExperience} className="w-full" disabled={experience.length >= 3}>
        <Plus className="h-4 w-4 mr-2" /> Add Experience
      </Button>
    </>
  );
}