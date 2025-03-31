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
        <div className="h-fit overflow-auto bg-white rounded-lg shadow-md p-4">
          <ResumeForm data={data} setData={setData} />
        </div>

        {/* Preview */}
        <div className="h-fit overflow-auto bg-white rounded-lg shadow-md p-4">
          <ResumePreview data={data} />
        </div>
      </div>
    </main>
  );
}
