import React from "react";
import { Input } from "@/components/ui/input";
import type { ResumeData } from "@/lib/types";
import { defaultResumeData } from "@/lib/default-data";

interface PersonalFormProps {
  personal: ResumeData["personal"];
  updatePersonal: (field: string, value: string) => void;
}

export default function PersonalForm({ personal, updatePersonal }: PersonalFormProps) {
  return (
    <div className="grid gap-4">
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <Input
          value={personal.name || ""}
          onChange={(e) => updatePersonal("name", e.target.value)}
          placeholder={defaultResumeData.personal.name}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Phone</label>
        <Input
          value={personal.phone || ""}
          onChange={(e) => updatePersonal("phone", e.target.value)}
          placeholder={defaultResumeData.personal.phone}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <Input
          value={personal.email || ""}
          onChange={(e) => updatePersonal("email", e.target.value)}
          placeholder={defaultResumeData.personal.email}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">LinkedIn</label>
        <div className="relative flex">
          <div className="flex items-center bg-muted border border-r-0 rounded-l-md px-3 text-muted-foreground text-sm">
            linkedin.com/in/
          </div>
          <Input
            value={(personal.linkedin || "").replace("https://linkedin.com/in/", "")}
            onChange={(e) =>
              updatePersonal("linkedin", `https://linkedin.com/in/${e.target.value}`)
            }
            placeholder={defaultResumeData.personal.linkedin.replace("https://linkedin.com/in/", "")}
            className="rounded-l-none"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">GitHub</label>
        <div className="relative flex">
          <div className="flex items-center bg-muted border border-r-0 rounded-l-md px-3 text-muted-foreground text-sm">
            github.com/
          </div>
          <Input
            value={(personal.github || "").replace("https://github.com/", "")}
            onChange={(e) =>
              updatePersonal("github", `https://github.com/${e.target.value}`)
            }
            placeholder={defaultResumeData.personal.github.replace("https://github.com/", "")}
            className="rounded-l-none"
          />
        </div>
      </div>
    </div>
  );
}