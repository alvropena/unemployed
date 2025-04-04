import { useState, useEffect } from "react";
import { loadResumeData, saveResumeData } from "@/lib/resumeUtils";
import type { ResumeData } from "@/types/types";

export function useResumeData(
  setData: React.Dispatch<React.SetStateAction<ResumeData>>,
  data: ResumeData
) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchResumeData = async () => {
      setIsLoading(true);
      const savedData = await loadResumeData();
      
      if (savedData?.personal) {
        // If we have user data, use it with proper schema structure
        setData({
          personal: savedData.personal,
          education: savedData.education?.length ? savedData.education : [
            {
              institution: "",
              degree: "",
              location: "",
              current: false
            },
            {
              institution: "",
              degree: "",
              location: "",
              current: false
            }
          ],
          experience: savedData.experience?.length ? savedData.experience : [
            {
              company: "",
              position: "",
              location: "",
              current: false,
              responsibilityOne: null,
              responsibilityTwo: null,
              responsibilityThree: null,
              responsibilityFour: null
            },
            {
              company: "",
              position: "",
              location: "",
              current: false,
              responsibilityOne: null,
              responsibilityTwo: null,
              responsibilityThree: null,
              responsibilityFour: null
            }
          ],
          projects: savedData.projects?.length ? savedData.projects : [
            {
              name: "",
              current: false,
              responsibilityOne: null,
              responsibilityTwo: null,
              responsibilityThree: null,
              responsibilityFour: null
            },
            {
              name: "",
              current: false,
              responsibilityOne: null,
              responsibilityTwo: null,
              responsibilityThree: null,
              responsibilityFour: null
            }
          ],
          skills: savedData.skills?.length ? savedData.skills : [{
            languages: null,
            frameworks: null,
            developerTools: null,
            libraries: null
          }]
        });
      } else {
        // Initialize with empty data following the schema structure
        setData({
          personal: {
            name: "",
            phone: "",
            email: "",
            linkedin: "",
            github: "",
          },
          education: [
            {
              institution: "",
              degree: "",
              location: "",
              current: false
            },
            {
              institution: "",
              degree: "",
              location: "",
              current: false
            }
          ],
          experience: [
            {
              company: "",
              position: "",
              location: "",
              current: false,
              responsibilityOne: null,
              responsibilityTwo: null,
              responsibilityThree: null,
              responsibilityFour: null
            },
            {
              company: "",
              position: "",
              location: "",
              current: false,
              responsibilityOne: null,
              responsibilityTwo: null,
              responsibilityThree: null,
              responsibilityFour: null
            }
          ],
          projects: [
            {
              name: "",
              current: false,
              responsibilityOne: null,
              responsibilityTwo: null,
              responsibilityThree: null,
              responsibilityFour: null
            },
            {
              name: "",
              current: false,
              responsibilityOne: null,
              responsibilityTwo: null,
              responsibilityThree: null,
              responsibilityFour: null
            }
          ],
          skills: [{
            languages: null,
            frameworks: null,
            developerTools: null,
            libraries: null
          }]
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