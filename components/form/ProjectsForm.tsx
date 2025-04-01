"use client";

import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import type { ResumeData } from "@/types/types";
import { defaultResumeData } from "@/lib/defaultData";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface ProjectsFormProps {
  projects: ResumeData["projects"];
  updateProject: (
    index: number,
    field: string,
    value: string | Date | boolean | null
  ) => void;
  onContinue?: () => void;
  onBack?: () => void;
}

interface ProjectState {
  name: string;
  startDate: Date | null;
  endDate: Date | null;
  current: boolean;
  responsibilityOne: string | null;
  responsibilityTwo: string | null;
  responsibilityThree: string | null;
  responsibilityFour: string | null;
}

export default function ProjectsForm({
  projects,
  updateProject,
  onContinue,
  onBack,
}: ProjectsFormProps) {
  const projectName1Ref = useRef<HTMLInputElement>(null);
  const [currentProject, setCurrentProject] = useState(0);

  useEffect(() => {
    // Focus the first project name input when component mounts
    projectName1Ref.current?.focus();
  }, []);

  // Project 1 State
  const [project1, setProject1] = React.useState<ProjectState>({
    name: projects[0]?.name || "",
    startDate: projects[0]?.startDate || null,
    endDate: projects[0]?.endDate || null,
    current: projects[0]?.current || false,
    responsibilityOne: projects[0]?.responsibilityOne || "",
    responsibilityTwo: projects[0]?.responsibilityTwo || "",
    responsibilityThree: projects[0]?.responsibilityThree || "",
    responsibilityFour: projects[0]?.responsibilityFour || "",
  });

  // Project 2 State
  const [project2, setProject2] = React.useState<ProjectState>({
    name: projects[1]?.name || "",
    startDate: projects[1]?.startDate || null,
    endDate: projects[1]?.endDate || null,
    current: projects[1]?.current || false,
    responsibilityOne: projects[1]?.responsibilityOne || "",
    responsibilityTwo: projects[1]?.responsibilityTwo || "",
    responsibilityThree: projects[1]?.responsibilityThree || "",
    responsibilityFour: projects[1]?.responsibilityFour || "",
  });

  // Handler for updating project fields
  const handleProjectChange = React.useCallback(
    (
      index: number,
      field: keyof ProjectState,
      value: string | Date | boolean | null,
      setter: React.Dispatch<React.SetStateAction<ProjectState>>
    ) => {
      setter((prev) => ({ ...prev, [field]: value }));
      updateProject(index, field, value);
    },
    [updateProject]
  );

  const handleNext = () => {
    if (currentProject === 1) {
      onContinue?.();
    } else {
      setCurrentProject((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentProject === 0) {
      onBack?.();
    } else {
      setCurrentProject((prev) => prev - 1);
    }
  };

  return (
    <div className="relative">
      <div className="space-y-4">
        {currentProject === 0 && (
          <Card>
            <CardContent className="pt-6">
              <div className="mb-6">
                <h3 className="font-medium">Project #1</h3>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name1">Project Name</Label>
                  <Input
                    ref={projectName1Ref}
                    id="name1"
                    value={project1.name}
                    onChange={(e) =>
                      handleProjectChange(
                        0,
                        "name",
                        e.target.value,
                        setProject1
                      )
                    }
                    placeholder={defaultResumeData.projects[0].name}
                  />
                </div>
                <div>
                  <Label>Responsibilities</Label>
                  <div className="space-y-2">
                    <Textarea
                      value={project1.responsibilityOne || ""}
                      onChange={(e) =>
                        handleProjectChange(
                          0,
                          "responsibilityOne",
                          e.target.value,
                          setProject1
                        )
                      }
                      placeholder={
                        defaultResumeData.projects[0].responsibilityOne || ""
                      }
                      className="min-h-[80px]"
                    />
                    <Textarea
                      value={project1.responsibilityTwo || ""}
                      onChange={(e) =>
                        handleProjectChange(
                          0,
                          "responsibilityTwo",
                          e.target.value,
                          setProject1
                        )
                      }
                      placeholder={
                        defaultResumeData.projects[0].responsibilityTwo || ""
                      }
                      className="min-h-[80px]"
                    />
                    <Textarea
                      value={project1.responsibilityThree || ""}
                      onChange={(e) =>
                        handleProjectChange(
                          0,
                          "responsibilityThree",
                          e.target.value,
                          setProject1
                        )
                      }
                      placeholder={
                        defaultResumeData.projects[0].responsibilityThree || ""
                      }
                      className="min-h-[80px]"
                    />
                    <Textarea
                      value={project1.responsibilityFour || ""}
                      onChange={(e) =>
                        handleProjectChange(
                          0,
                          "responsibilityFour",
                          e.target.value,
                          setProject1
                        )
                      }
                      placeholder={
                        defaultResumeData.projects[0].responsibilityFour || ""
                      }
                      className="min-h-[80px]"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {currentProject === 1 && (
          <Card>
            <CardContent className="pt-6">
              <div className="mb-6">
                <h3 className="font-medium">Project #2</h3>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name2">Project Name</Label>
                  <Input
                    id="name2"
                    value={project2.name}
                    onChange={(e) =>
                      handleProjectChange(
                        1,
                        "name",
                        e.target.value,
                        setProject2
                      )
                    }
                    placeholder={defaultResumeData.projects[1].name}
                  />
                </div>
                <div>
                  <Label>Responsibilities</Label>
                  <div className="space-y-2">
                    <Textarea
                      value={project2.responsibilityOne || ""}
                      onChange={(e) =>
                        handleProjectChange(
                          1,
                          "responsibilityOne",
                          e.target.value,
                          setProject2
                        )
                      }
                      placeholder={
                        defaultResumeData.projects[1].responsibilityOne || ""
                      }
                      className="min-h-[80px]"
                    />
                    <Textarea
                      value={project2.responsibilityTwo || ""}
                      onChange={(e) =>
                        handleProjectChange(
                          1,
                          "responsibilityTwo",
                          e.target.value,
                          setProject2
                        )
                      }
                      placeholder={
                        defaultResumeData.projects[1].responsibilityTwo || ""
                      }
                      className="min-h-[80px]"
                    />
                    <Textarea
                      value={project2.responsibilityThree || ""}
                      onChange={(e) =>
                        handleProjectChange(
                          1,
                          "responsibilityThree",
                          e.target.value,
                          setProject2
                        )
                      }
                      placeholder={
                        defaultResumeData.projects[1].responsibilityThree || ""
                      }
                      className="min-h-[80px]"
                    />
                    <Textarea
                      value={project2.responsibilityFour || ""}
                      onChange={(e) =>
                        handleProjectChange(
                          1,
                          "responsibilityFour",
                          e.target.value,
                          setProject2
                        )
                      }
                      placeholder={
                        defaultResumeData.projects[1].responsibilityFour || ""
                      }
                      className="min-h-[80px]"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      <div className="mt-4 flex justify-between">
        <Button variant="outline" onClick={handleBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
		  Back
        </Button>
        <Button onClick={handleNext}>
          {currentProject === 1 ? "Continue" : "Next"}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
