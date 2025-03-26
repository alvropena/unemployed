export interface ResumeData {
  personal: {
    name: string
    phone: string
    email: string
    linkedin: string
    github: string
  }
  education: Array<{
    institution: string
    location: string
    degree: string
    date: string
  }>
  experience: Array<{
    title: string
    company: string
    location: string
    date: string
    responsibilities: string[]
  }>
  projects: Array<{
    name: string
    technologies: string
    date: string
    details: string[]
  }>
  skills: {
    languages: string
    frameworks: string
    tools: string
    libraries: string
  }
}

