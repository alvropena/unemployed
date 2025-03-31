import { useState, useEffect } from "react";
import { loadResumeData, saveResumeData } from "@/lib/resume-service";
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
        // Ensure there's at least one education entry
        const education = savedData.education && savedData.education.length > 0
          ? savedData.education
          : [{
              institution: "",
              degree: "",
              location: "",
              startDate: new Date(),
              endDate: null,
              current: false,
              description: null
            }];

        setData({
          ...savedData,
          education,
          // Initialize other sections if they're empty
          experience: savedData.experience && savedData.experience.length > 0
            ? savedData.experience
            : [{
                company: "",
                position: "",
                location: "",
                startDate: new Date(),
                endDate: null,
                current: false,
                description: [""]
              }],
          projects: savedData.projects && savedData.projects.length > 0
            ? savedData.projects
            : [{
                name: "",
                startDate: new Date(),
                endDate: null,
                current: false
              }],
          skills: savedData.skills || [],
          personal: savedData.personal || {
            name: "",
            phone: "",
            email: "",
            linkedin: "",
            github: "",
          }
        });
      } else {
        // Initialize with empty data but keep one entry for each section
        setData({
          personal: {
            name: "",
            phone: "",
            email: "",
            linkedin: "",
            github: "",
          },
          education: [{
            institution: "",
            degree: "",
            location: "",
            startDate: new Date(),
            endDate: null,
            current: false,
            description: null
          }],
          experience: [{
            company: "",
            position: "",
            location: "",
            startDate: new Date(),
            endDate: null,
            current: false,
            description: [""]
          }],
          projects: [{
            name: "",
            startDate: new Date(),
            endDate: null,
            current: false
          }],
          skills: []
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
        saveResumeData(data);
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [data, isLoading]);

  return { isLoading };
}