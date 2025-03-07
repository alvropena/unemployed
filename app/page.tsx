"use client";

import { useState, useRef } from "react";
import ResumeForm from "@/components/resume-form";
import ResumePreview from "@/components/resume-preview";
import { defaultResumeData } from "@/lib/default-data";
import type { ResumeData } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const resumeRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {}

  return (
    <main className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Resume AI</h1>
        <Button onClick={handleDownload}>
          <Download className="h-4 w-4 mr-2" />
          Download PDF
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Resume Information</CardTitle>
          </CardHeader>
          <CardContent className="overflow-auto max-h-[calc(100vh-200px)]">
            <ResumeForm data={resumeData} setData={setResumeData} />
          </CardContent>
        </Card>
        
        <Card>
          <CardContent>
            <div ref={resumeRef}>
              <ResumePreview data={resumeData} />
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
