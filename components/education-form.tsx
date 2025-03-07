import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import type { ResumeData } from "@/lib/types";
import { defaultResumeData } from "@/lib/default-data";

interface EducationFormProps {
  education: ResumeData["education"];
  addEducation: () => void;
  updateEducation: (index: number, field: string, value: string) => void;
  removeEducation: (index: number) => void;
}

export default function EducationForm({
  education,
  addEducation,
  updateEducation,
  removeEducation,
}: EducationFormProps) {
  return (
    <>
      {education.map((edu, index) => (
        <Card key={index} className="mb-4">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Education #{index + 1}</h3>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => removeEducation(index)}
                disabled={education.length <= 1}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Institution</label>
                <Input
                  value={edu.institution}
                  onChange={(e) => updateEducation(index, "institution", e.target.value)}
                  placeholder={defaultResumeData.education[index % defaultResumeData.education.length].institution}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <Input
                  value={edu.location}
                  onChange={(e) => updateEducation(index, "location", e.target.value)}
                  placeholder={defaultResumeData.education[index % defaultResumeData.education.length].location}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Degree</label>
                <Input
                  value={edu.degree}
                  onChange={(e) => updateEducation(index, "degree", e.target.value)}
                  placeholder={defaultResumeData.education[index % defaultResumeData.education.length].degree}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <Input
                  value={edu.date}
                  onChange={(e) => updateEducation(index, "date", e.target.value)}
                  placeholder={defaultResumeData.education[index % defaultResumeData.education.length].date}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      <Button onClick={addEducation} className="w-full" disabled={education.length >= 2}>
        <Plus className="h-4 w-4 mr-2" /> Add Education
      </Button>
    </>
  );
}