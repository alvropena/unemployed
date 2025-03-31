export interface ResumeData {
  personal: {
    name: string
    email: string
    phone: string
    linkedin: string
    github: string
  }
  education: Array<{
    id?: string
    institution: string
    degree: string
    location: string
    startDate: Date
    endDate?: Date | null
    current: boolean
    description?: string | null
  }>
  experience: Array<{
    id?: string
    company: string
    position: string
    location: string
    startDate: Date
    endDate?: Date | null
    current: boolean
    description: string[]
  }>
  projects: Array<{
    id?: string
    name: string
    startDate?: Date | null
    endDate?: Date | null
    current: boolean
    description: string[]
  }>
  skills: Array<{
    id?: string
    name: string
    category: 'languages' | 'frameworks' | 'developer_tools' | 'libraries'
  }>
}

