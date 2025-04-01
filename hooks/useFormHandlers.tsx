import { useToast } from "@/components/ui/useToast";
import { defaultResumeData } from "@/lib/defaultData";
import type { ResumeData } from "@/types/types";

export function useFormHandlers(
  setData: React.Dispatch<React.SetStateAction<ResumeData>>,
  setIsSaving: React.Dispatch<React.SetStateAction<boolean>>
) {
  const { toast } = useToast();

  const updatePersonal = (field: string, value: string | null) => {
    setData((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        [field]: value,
      },
    }));
  };

  const updateEducation = (index: number, field: string, value: string | boolean | Date | null) => {
    setData((prev) => {
      const newEducation = [...prev.education];
      newEducation[index] = { ...newEducation[index], [field]: value };
      return { ...prev, education: newEducation };
    });
  };

  const updateExperience = (
    index: number,
    field: string,
    value: string | boolean | Date | null
  ) => {
    setData((prev) => {
      const newExperience = [...prev.experience];
      newExperience[index] = { ...newExperience[index], [field]: value };
      return { ...prev, experience: newExperience };
    });
  };

  const updateProject = (
    index: number,
    field: string,
    value: string | boolean | Date | null
  ) => {
    setData((prev) => {
      const newProjects = [...prev.projects];
      newProjects[index] = { ...newProjects[index], [field]: value };
      return { ...prev, projects: newProjects };
    });
  };

  const updateSkills = (index: number, category: 'languages' | 'frameworks' | 'developerTools' | 'libraries', value: string | null) => {
    setData((prev) => {
      const newSkills = [...prev.skills];
      newSkills[index] = { ...newSkills[index], [category]: value };
      return { ...prev, skills: newSkills };
    });
  };

  const saveChanges = async (data: ResumeData) => {
    setIsSaving(true);
    try {
      const response = await fetch("/api/resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to save changes");
      }

      const result = await response.json();
      if (!result.success) {
        throw new Error(result.error || "Failed to save changes");
      }
    } catch (error) {
      console.error("Error saving changes:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return {
    updatePersonal,
    updateEducation,
    updateExperience,
    updateProject,
    updateSkills,
    saveChanges
  };
}