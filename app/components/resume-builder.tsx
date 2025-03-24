import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Download, Eye } from "lucide-react";
import ResumeForm from "@/components/resume-form";
import ResumePreview from "@/components/resume-preview";
import type { ResumeData } from "@/lib/types";
import { useState } from "react";
import { exportResumeToPDF } from "@/lib/pdf-export";
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
	const [showEditor, setShowEditor] = useState(false);
	const [isExporting, setIsExporting] = useState(false);

	const handleExportPDF = () => {
		setIsExporting(true);
		try {
			exportResumeToPDF();
		} catch (error) {
			console.error("Error exporting PDF:", error);
		} finally {
			setIsExporting(false);
		}
	};

	return (
		<main
			className={`container mx-auto h-[calc(100vh-2rem)] p-4 relative ${
				showSubscriptionModal ? "pointer-events-none opacity-80" : ""
			}`}
		>
			{/* Action Buttons */}
			<div className="grid grid-cols-2 gap-4 mb-6">
				<Button
					variant="outline"
					className="flex items-center justify-center gap-2 w-full"
					onClick={() => setShowEditor(!showEditor)}
					size="sm"
				>
					{showEditor ? (
						<Eye className="h-4 w-4" />
					) : (
						<Edit className="h-4 w-4" />
					)}
					{showEditor ? "Preview Resume" : "Edit Resume"}
				</Button>
				<Button
					variant="default"
					className="flex items-center justify-center gap-2 w-full"
					onClick={handleExportPDF}
					disabled={isExporting}
					size="sm"
				>
					<Download className="h-4 w-4" />
					{isExporting ? "Exporting..." : "Download PDF"}
				</Button>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100%-4rem)]">
				{/* Editor - Hidden on mobile by default */}
				<Card
					className={`h-full overflow-auto ${showEditor ? "block" : "hidden lg:block"}`}
				>
					<CardContent className="p-6">
						<ResumeForm data={data} setData={setData} />
					</CardContent>
				</Card>

				{/* Preview */}
				<Card
					className={`h-full overflow-auto ${!showEditor ? "block" : "hidden lg:block"}`}
				>
					<CardContent className="p-6">
						<ResumePreview data={data} />
					</CardContent>
				</Card>
			</div>
		</main>
	);
}
