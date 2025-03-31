import { Card, CardContent } from "@/components/ui/card";
import ResumeForm from "@/components/ResumeForm";
import ResumePreview from "@/components/ResumePreview";
import type { ResumeData } from "@/lib/types";
import type { Dispatch, SetStateAction } from "react";

interface ResumeBuilderProps {
  data: ResumeData;
  setData: Dispatch<SetStateAction<ResumeData>>;
  showSubscriptionModal?: boolean;
}

export default function ResumeBuilder({
  data,
  setData,
  showSubscriptionModal,
}: ResumeBuilderProps) {
  return (
    <main
      className={`container mx-auto min-h-[calc(100vh-2rem)] px-4 md:px-8 py-2 relative ${
        showSubscriptionModal ? "pointer-events-none opacity-80" : ""
      }`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[calc(100vh-5rem)]">
        {/* Editor */}
        <Card className="h-fit overflow-auto">
          <CardContent className="px-4 py-2">
            <ResumeForm data={data} setData={setData} />
          </CardContent>
        </Card>

        {/* Preview */}
        <Card className="h-fit overflow-auto">
          <CardContent className="px-4 py-2">
            <ResumePreview data={data} />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
