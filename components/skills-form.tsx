import React from "react";
import { Input } from "@/components/ui/input";
import type { ResumeData } from "@/lib/types";
import { defaultResumeData } from "@/lib/default-data";

interface SkillsFormProps {
  skills: ResumeData["skills"];
  updateSkills: (category: string, value: string) => void;
}

export default function SkillsForm({ skills, updateSkills }: SkillsFormProps) {
  return (
    <div className="grid gap-4">
      <div>
        <label className="block text-sm font-medium mb-1">Languages</label>
        <Input
          value={skills.languages || ""}
          onChange={(e) => updateSkills("languages", e.target.value)}
          placeholder={defaultResumeData.skills.languages}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Frameworks</label>
        <Input
          value={skills.frameworks || ""}
          onChange={(e) => updateSkills("frameworks", e.target.value)}
          placeholder={defaultResumeData.skills.frameworks}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Developer Tools</label>
        <Input
          value={skills.tools || ""}
          onChange={(e) => updateSkills("tools", e.target.value)}
          placeholder={defaultResumeData.skills.tools}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Libraries</label>
        <Input
          value={skills.libraries || ""}
          onChange={(e) => updateSkills("libraries", e.target.value)}
          placeholder={defaultResumeData.skills.libraries}
        />
      </div>
    </div>
  );
}