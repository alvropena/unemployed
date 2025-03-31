import { useToast } from "@/components/ui/useToast";
import { defaultResumeData } from "@/lib/defaultData";
import type { ResumeData } from "@/lib/types";

export function useFormHandlers(
  setData: React.Dispatch<React.SetStateAction<ResumeData>>
) {
  const { toast } = useToast();

  const updatePersonal = (field: string, value: string) => {
    setData((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        [field]: value,
      },
    }));
  };

  const updateEducation = (index: number, field: string, value: string | Date | boolean) => {
    setData((prev) => {
      const newEducation = [...prev.education];
      newEducation[index] = { ...newEducation[index], [field]: value };
      return { ...prev, education: newEducation };
    });
  };

  const updateExperience = (
    index: number,
    field: string,
    value: string | Date | boolean | null
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
    value: string | Date | boolean | null
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

  return {
    updatePersonal,
    updateEducation,
    updateExperience,
    updateProject,
    updateSkills
  };
}