"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import type { ResumeData } from "@/types/types";
import { defaultResumeData } from "@/lib/defaultData";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface EducationFormProps {
  education: ResumeData["education"];
  updateEducation: (index: number, field: string, value: string | Date | boolean | null) => void;
}

interface EducationState {
  institution: string;
  location: string;
  degree: string;
  startDate: Date | null;
  endDate: Date | null;
  current: boolean;
}

export default function EducationForm({
  education,
  updateEducation,
}: EducationFormProps) {
  // Education Block States
  const [education1, setEducation1] = React.useState<EducationState>({
    institution: education[0]?.institution || "",
    location: education[0]?.location || "",
    degree: education[0]?.degree || "",
    startDate: education[0]?.startDate || null,
    endDate: education[0]?.endDate || null,
    current: education[0]?.current || false,
  });

  const [education2, setEducation2] = React.useState<EducationState>({
    institution: education[1]?.institution || "",
    location: education[1]?.location || "",
    degree: education[1]?.degree || "",
    startDate: education[1]?.startDate || null,
    endDate: education[1]?.endDate || null,
    current: education[1]?.current || false,
  });

  // Handlers for state updates
  const handleChange = React.useCallback((
    index: number,
    field: keyof EducationState,
    value: string | Date | boolean | null,
    setter: React.Dispatch<React.SetStateAction<EducationState>>,
  ) => {
    setter(prev => ({ ...prev, [field]: value }));
    updateEducation(index, field, value);
  }, [updateEducation]);

  return (
    <div className="space-y-4">
      {/* First Education Block */}
      <Card>
        <CardContent className="pt-6">
          <div className="mb-6">
            <h3 className="font-medium">Education #1</h3>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="institution1">Institution</Label>
              <Input
                id="institution1"
                value={education1.institution}
                onChange={(e) => handleChange(0, "institution", e.target.value, setEducation1)}
                placeholder={defaultResumeData.education[0].institution}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location1">Location</Label>
              <Input
                id="location1"
                value={education1.location}
                onChange={(e) => handleChange(0, "location", e.target.value, setEducation1)}
                placeholder={defaultResumeData.education[0].location}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="degree1">Degree</Label>
              <Input
                id="degree1"
                value={education1.degree}
                onChange={(e) => handleChange(0, "degree", e.target.value, setEducation1)}
                placeholder={defaultResumeData.education[0].degree}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="current1"
                checked={education1.current}
                onCheckedChange={(checked) => handleChange(0, "current", checked as boolean, setEducation1)}
              />
              <Label htmlFor="current1">Currently Studying</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Second Education Block */}
      <Card>
        <CardContent className="pt-6">
          <div className="mb-6">
            <h3 className="font-medium">Education #2</h3>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="institution2">Institution</Label>
              <Input
                id="institution2"
                value={education2.institution}
                onChange={(e) => handleChange(1, "institution", e.target.value, setEducation2)}
                placeholder={defaultResumeData.education[1].institution}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location2">Location</Label>
              <Input
                id="location2"
                value={education2.location}
                onChange={(e) => handleChange(1, "location", e.target.value, setEducation2)}
                placeholder={defaultResumeData.education[1].location}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="degree2">Degree</Label>
              <Input
                id="degree2"
                value={education2.degree}
                onChange={(e) => handleChange(1, "degree", e.target.value, setEducation2)}
                placeholder={defaultResumeData.education[1].degree}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="current2"
                checked={education2.current}
                onCheckedChange={(checked) => handleChange(1, "current", checked as boolean, setEducation2)}
              />
              <Label htmlFor="current2">Currently Studying</Label>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
