import { useToast } from "@/components/ui/use-toast";
import { defaultResumeData } from "@/lib/default-data";
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

  const addEducation = () => {
    setData((prev) => {
      // Only add if less than 2 entries
      if (prev.education.length >= 2) {
        toast({
          title: "Maximum limit reached",
          description: "You can only have up to 2 education entries.",
          variant: "destructive"
        });
        return prev;
      }
      return {
        ...prev,
        education: [
          ...prev.education,
          {
            institution: "",
            location: "",
            degree: "",
            date: ""
          }
        ],
      };
    });
  };

  const updateEducation = (index: number, field: string, value: string) => {
    setData((prev) => {
      const newEducation = [...prev.education];
      newEducation[index] = { ...newEducation[index], [field]: value };
      return { ...prev, education: newEducation };
    });
  };

  const removeEducation = (index: number) => {
    setData((prev) => {
      if (prev.education.length <= 1) {
        toast({
          title: "Cannot remove",
          description: "You must have at least one education entry.",
          variant: "destructive"
        });
        return prev;
      }
      const newEducation = [...prev.education];
      newEducation.splice(index, 1);
      return { ...prev, education: newEducation };
    });
  };

  const addExperience = () => {
    setData((prev) => {
      // Only add if less than 3 entries
      if (prev.experience.length >= 3) {
        toast({
          title: "Maximum limit reached",
          description: "You can only have up to 3 experience entries.",
          variant: "destructive"
        });
        return prev;
      }
      return {
        ...prev,
        experience: [
          ...prev.experience,
          defaultResumeData.experience[0] // Use the first experience entry as template
        ],
      };
    });
  };

  const updateExperience = (
    index: number,
    field: string,
    value: string | string[],
  ) => {
    setData((prev) => {
      const newExperience = [...prev.experience];
      newExperience[index] = { ...newExperience[index], [field]: value };
      return { ...prev, experience: newExperience };
    });
  };

  const addResponsibility = (expIndex: number) => {
    setData((prev) => {
      const newExperience = [...prev.experience];
      newExperience[expIndex] = {
        ...newExperience[expIndex],
        responsibilities: [...newExperience[expIndex].responsibilities, ""],
      };
      return { ...prev, experience: newExperience };
    });
  };

  const updateResponsibility = (
    expIndex: number,
    respIndex: number,
    value: string,
  ) => {
    setData((prev) => {
      const newExperience = [...prev.experience];
      const newResponsibilities = [...newExperience[expIndex].responsibilities];
      newResponsibilities[respIndex] = value;
      newExperience[expIndex] = {
        ...newExperience[expIndex],
        responsibilities: newResponsibilities,
      };
      return { ...prev, experience: newExperience };
    });
  };

  const removeResponsibility = (expIndex: number, respIndex: number) => {
    setData((prev) => {
      const newExperience = [...prev.experience];
      const newResponsibilities = [...newExperience[expIndex].responsibilities];
      newResponsibilities.splice(respIndex, 1);
      newExperience[expIndex] = {
        ...newExperience[expIndex],
        responsibilities: newResponsibilities,
      };
      return { ...prev, experience: newExperience };
    });
  };

  const removeExperience = (index: number) => {
    setData((prev) => {
      const newExperience = [...prev.experience];
      newExperience.splice(index, 1);
      return { ...prev, experience: newExperience };
    });
  };

  const addProject = () => {
    setData((prev) => {
      // Only add if less than 2 entries
      if (prev.projects.length >= 2) {
        toast({
          title: "Maximum limit reached",
          description: "You can only have up to 2 project entries.",
          variant: "destructive"
        });
        return prev;
      }
      return {
        ...prev,
        projects: [
          ...prev.projects,
          defaultResumeData.projects[0] // Use the first project entry as template
        ],
      };
    });
  };

  const updateProject = (
    index: number,
    field: string,
    value: string | string[],
  ) => {
    setData((prev) => {
      const newProjects = [...prev.projects];
      newProjects[index] = { ...newProjects[index], [field]: value };
      return { ...prev, projects: newProjects };
    });
  };

  const addProjectDetail = (projIndex: number) => {
    setData((prev) => {
      const newProjects = [...prev.projects];
      newProjects[projIndex] = {
        ...newProjects[projIndex],
        details: [...newProjects[projIndex].details, ""],
      };
      return { ...prev, projects: newProjects };
    });
  };

  const updateProjectDetail = (
    projIndex: number,
    detailIndex: number,
    value: string,
  ) => {
    setData((prev) => {
      const newProjects = [...prev.projects];
      const newDetails = [...newProjects[projIndex].details];
      newDetails[detailIndex] = value;
      newProjects[projIndex] = {
        ...newProjects[projIndex],
        details: newDetails,
      };
      return { ...prev, projects: newProjects };
    });
  };

  const removeProjectDetail = (projIndex: number, detailIndex: number) => {
    setData((prev) => {
      const newProjects = [...prev.projects];
      const newDetails = [...newProjects[projIndex].details];
      newDetails.splice(detailIndex, 1);
      newProjects[projIndex] = {
        ...newProjects[projIndex],
        details: newDetails,
      };
      return { ...prev, projects: newProjects };
    });
  };

  const removeProject = (index: number) => {
    setData((prev) => {
      const newProjects = [...prev.projects];
      newProjects.splice(index, 1);
      return { ...prev, projects: newProjects };
    });
  };

  const updateSkills = (category: string, value: string) => {
    setData((prev) => ({
      ...prev,
      skills: {
        ...(prev?.skills || {}),
        [category]: value,
      },
    }));
  };

  return {
    updatePersonal,
    addEducation,
    updateEducation,
    removeEducation,
    addExperience,
    updateExperience,
    removeExperience,
    addResponsibility,
    updateResponsibility,
    removeResponsibility,
    addProject,
    updateProject,
    removeProject,
    addProjectDetail,
    updateProjectDetail,
    removeProjectDetail,
    updateSkills
  };
}