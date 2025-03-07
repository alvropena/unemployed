"use client"

import { useState } from "react"
import ResumeForm from "@/components/resume-form"
import ResumePreview from "@/components/resume-preview"
import { defaultResumeData } from "@/lib/default-data"
import type { ResumeData } from "@/lib/types"

export default function Home() {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData)

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Resume Generator</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-lg shadow p-4 overflow-auto max-h-[calc(100vh-150px)]">
          <h2 className="text-xl font-semibold mb-4">Resume Information</h2>
          <ResumeForm data={resumeData} setData={setResumeData} />
        </div>
        <div className="bg-white rounded-lg shadow p-4 overflow-auto max-h-[calc(100vh-150px)]">
          <h2 className="text-xl font-semibold mb-4">Resume Preview</h2>
          <ResumePreview data={resumeData} />
        </div>
      </div>
    </main>
  )
}

