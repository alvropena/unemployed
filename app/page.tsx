"use client"

import { useState, useRef } from "react"
import ResumeForm from "@/components/resume-form"
import ResumePreview from "@/components/resume-preview"
import { defaultResumeData } from "@/lib/default-data"
import type { ResumeData } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export default function Home() {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData)
  const resumeRef = useRef<HTMLDivElement>(null)

  const handleDownload = () => {}

  return (
    <main className="container mx-auto p-4">
      <div className="flex justify-between items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold">Resume Generator</h1>
        <Button onClick={handleDownload}>
          <Download className="h-4 w-4" />
          Download PDF
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-lg shadow p-4 overflow-auto max-h-[calc(100vh-150px)]">
          <h2 className="text-xl font-semibold mb-4">Resume Information</h2>
          <ResumeForm data={resumeData} setData={setResumeData} />
        </div>
        <div className="bg-white rounded-lg shadow p-4 overflow-auto max-h-[calc(100vh-150px)]">
          <h2 className="text-xl font-semibold mb-4">Resume Preview</h2>
          <div ref={resumeRef}>
            <ResumePreview data={resumeData} />
          </div>
        </div>
      </div>
    </main>
  )
}

