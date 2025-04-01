export interface ResumeData {
  personal: {
    name: string | null
    email: string | null
    phone: string | null
    linkedin: string | null
    github: string | null
  }
  education: {
    id?: string
    institution: string
    degree: string
    location: string
    current: boolean
  }[]
  experience: {
    id?: string
    company: string
    position: string
    location: string
    current: boolean
    responsibilityOne: string | null
    responsibilityTwo: string | null
    responsibilityThree: string | null
    responsibilityFour: string | null
  }[]
  projects: {
    id?: string
    name: string
    current: boolean
    responsibilityOne: string | null
    responsibilityTwo: string | null
    responsibilityThree: string | null
    responsibilityFour: string | null
  }[]
  skills: {
    id?: string
    languages: string | null
    frameworks: string | null
    developerTools: string | null
    libraries: string | null
  }[]
}

