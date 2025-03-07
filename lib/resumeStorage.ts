import { ResumeData } from "@/lib/types";

const STORAGE_KEY = "resume_data";

// Save resume data to localStorage
export const saveResumeData = (data: ResumeData): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }
};

// Load resume data from localStorage
export const loadResumeData = (): ResumeData | null => {
  if (typeof window !== "undefined") {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        return JSON.parse(savedData) as ResumeData;
      } catch (error) {
        console.error("Error parsing saved resume data:", error);
      }
    }
  }
  return null;
};

// Clear resume data from localStorage
export const clearResumeData = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(STORAGE_KEY);
  }
}; 