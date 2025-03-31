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
      const errorData = await response.json();
      console.error('Error loading resume data:', errorData);
      return null;
    }

    const { data } = await response.json();
    console.log('Resume data loaded from API:', data);
    return data;
  } catch (error) {
    console.error('Error loading resume data:', error);
    return null;
  }
};