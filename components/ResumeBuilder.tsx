import ResumeForm from "@/components/ResumeForm";
import ResumePreview from "@/components/ResumePreview";
import type { ResumeData } from "@/types/types";
import type { Dispatch, SetStateAction } from "react";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { useState, useEffect } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ResumeBuilderProps {
  data: ResumeData;
  setData: Dispatch<SetStateAction<ResumeData>>;
  showSubscriptionModal?: boolean;
}

type SaveStatus = 'saving' | 'saved' | 'error';

export default function ResumeBuilder({
  data,
  setData,
  showSubscriptionModal,
}: ResumeBuilderProps) {
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('saved');
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Simulate save status changes for demo
  useEffect(() => {
    const handleSave = async () => {
      setSaveStatus('saving');
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSaveStatus('saved');
        setLastSaved(new Date());
      } catch (error) {
        setSaveStatus('error');
      }
    };

    const timer = setTimeout(handleSave, 500);
    return () => clearTimeout(timer);
  }, [data]);

  const statusConfig = {
    saving: {
      icon: <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />,
      text: "Saving changes...",
      textColor: "text-muted-foreground"
    },
    saved: {
      icon: <CheckCircle2 className="h-4 w-4 text-green-500" />,
      text: "All changes saved",
      textColor: "text-green-500"
    },
    error: {
      icon: <XCircle className="h-4 w-4 text-red-500" />,
      text: "Failed to save",
      textColor: "text-red-500"
    }
  };

  const { icon, text, textColor } = statusConfig[saveStatus];

  return (
    <main
      className={`container mx-auto min-h-[calc(100vh-2rem)] px-4 md:px-8 py-2 relative ${
        showSubscriptionModal ? "pointer-events-none opacity-80" : ""
      }`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[calc(100vh-5rem)]">
        {/* Editor */}
        <div className="h-fit overflow-auto rounded-lg shadow-md p-4">
          <ResumeForm data={data} setData={setData} />
        </div>

        {/* Preview */}
        <div className="h-fit overflow-auto rounded-lg shadow-md p-4">
          <div className="flex items-center justify-end gap-2 h-10 text-sm mb-4">
            {icon}
            {saveStatus === 'saved' && lastSaved ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className={textColor}>{text}</span>
                  </TooltipTrigger>
                  <TooltipContent side="right" >
                    <p>Last saved at {lastSaved.toLocaleTimeString()}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <span className={textColor}>{text}</span>
            )}
          </div>
          <ResumePreview data={data} />
        </div>
      </div>
    </main>
  );
}
