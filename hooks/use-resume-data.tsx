import { useState, useEffect } from "react";
import { loadResumeData, saveResumeDataLocally } from "@/lib/resume-service";
import { defaultResumeData } from "@/lib/default-data";
import type { ResumeData } from "@/lib/types";

export function useResumeData(
  setData: React.Dispatch<React.SetStateAction<ResumeData>>,
  data: ResumeData
) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchResumeData = async () => {
      setIsLoading(true);
      const savedData = await loadResumeData();
      if (savedData) {
        setData(savedData);
      } else {
        // Initialize with defaultResumeData directly
        setData({
          personal: {
            name: "",
            phone: "",
            email: "",
            linkedin: "",
            github: "",
          },
          // Use the exact education entries from defaultResumeData
          education: defaultResumeData.education,
          // Use the exact experience entries from defaultResumeData
          experience: defaultResumeData.experience,
          // Use the exact project entries from defaultResumeData
          projects: defaultResumeData.projects,
          skills: {
            languages: "",
            frameworks: "",
            tools: "",
            libraries: ""
          }
        });
      }
      setIsLoading(false);
    };

    fetchResumeData();
  }, [setData]);

  // Auto-save effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!isLoading) {
        saveResumeDataLocally(data);
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [data, isLoading]);

  return { isLoading };
}