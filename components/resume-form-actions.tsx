import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Save, Download } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { saveResumeData, saveResumeDataLocally } from "@/lib/resume-service";
import { exportResumeToPDF } from "@/lib/pdf-export";
import type { ResumeData } from "@/lib/types";

interface ResumeFormActionsProps {
  data: ResumeData;
}

export default function ResumeFormActions({ data }: ResumeFormActionsProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const handleSaveResume = async () => {
    setIsSaving(true);

    saveResumeDataLocally(data);

    const success = await saveResumeData(data);

    setIsSaving(false);

    if (success) {
      toast({
        title: "Resume saved",
        description: "Your resume has been saved successfully.",
      });
    } else {
      toast({
        title: "Failed to save",
        description:
          "There was an error saving your resume. Your changes have been saved locally.",
        variant: "destructive",
      });
    }
  };

  const handleExportPDF = () => {
    setIsExporting(true);
    try {
      exportResumeToPDF();
    } catch (error) {
      console.error('Error exporting PDF:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold">Resume Information</h2>
      <div className="flex gap-2">
        <Button
          onClick={handleExportPDF}
          disabled={isExporting}
          className="flex items-center gap-2"
          variant="outline"
        >
          {isExporting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Exporting...
            </>
          ) : (
            <>
              <Download className="h-4 w-4" />
              Download PDF
            </>
          )}
        </Button>
        <Button
          onClick={handleSaveResume}
          disabled={isSaving}
          className="flex items-center gap-2"							
        >
          {isSaving ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Save Resume
            </>
          )}
        </Button>
      </div>
    </div>
  );
}