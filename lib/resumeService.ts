import { ResumeData } from "@/lib/types";

// Save resume data to the server
export const saveResumeData = async (data: ResumeData): Promise<boolean> => {
  try {
    const response = await fetch('/api/resume', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error saving resume data:', errorData);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error saving resume data:', error);
    return false;
  }
};

// Load resume data from the server
export const loadResumeData = async (): Promise<ResumeData | null> => {
  try {
    const response = await fetch('/api/resume');

    if (!response.ok) {
      if (response.status === 404) {
        // No data found is not an error, just return null
        return null;
      }
      
      const errorData = await response.json();
      console.error('Error loading resume data:', errorData);
      return null;
    }

    const result = await response.json();
    return result.data as ResumeData;
  } catch (error) {
    console.error('Error loading resume data:', error);
    return null;
  }
};

// Fallback to localStorage for offline support
const STORAGE_KEY = "resume_data_offline";

// Save resume data to localStorage as a backup
export const saveResumeDataLocally = (data: ResumeData): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }
};

// Load resume data from localStorage as a backup
export const loadResumeDataLocally = (): ResumeData | null => {
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