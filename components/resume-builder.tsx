import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Save, Download } from "lucide-react";
import ResumeForm from "@/components/resume-form";
import ResumePreview from "@/components/resume-preview";
import type { ResumeData } from "@/lib/types";
import { useState } from "react";
import { exportResumeToPDF } from "@/lib/pdf-export";
import { saveResumeData } from "@/lib/resume-service";
import { useToast } from "@/components/ui/use-toast";
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
	const [isExporting, setIsExporting] = useState(false);
	const [isSaving, setIsSaving] = useState(false);
	const { toast } = useToast();

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

	const handleSaveChanges = async () => {
		setIsSaving(true);
		try {
			const success = await saveResumeData(data);
			if (success) {
				toast({
					title: "Success",
					description: "Your resume has been saved successfully.",
				});
			} else {
				toast({
					title: "Error",
					description: "Failed to save your resume. Please try again.",
					variant: "destructive",
				});
			}
		} catch (error) {
			console.error("Error saving resume:", error);
			toast({
				title: "Error",
				description: "An unexpected error occurred. Please try again.",
				variant: "destructive",
			});
		} finally {
			setIsSaving(false);
		}
	};

	return (
		<main
			className={`container mx-auto min-h-[calc(100vh-2rem)] px-4 md:px-8 py-2 relative ${
				showSubscriptionModal ? "pointer-events-none opacity-80" : ""
			}`}
		>
			{/* Action Buttons */}
			<div className="flex flex-col md:flex-row md:justify-between gap-2 my-4">
				{/* Mobile: Full width grid, Desktop: Inline buttons */}
				<div className="grid grid-cols-1 md:flex gap-2 w-full md:w-auto">
					{/* <Button
						variant="outline"
						className="flex items-center justify-center gap-2 w-full md:w-auto"
						onClick={() => {}}
						size="sm"
					>
						<Wand2 className="h-4 w-4" />
						Enhance with AI
					</Button> */}
				</div>
				<div className="grid grid-cols-2 md:flex gap-2 w-full md:w-auto">
					<Button
						variant="default"
						className="flex items-center justify-center gap-2 w-full md:w-auto"
						onClick={handleSaveChanges}
						disabled={isSaving}
						size="sm"
					>
						<Save className="h-4 w-4" />
						{isSaving ? "Saving..." : "Save Changes"}
					</Button>
					<Button
						variant="default"
						className="flex items-center justify-center gap-2 w-full md:w-auto"
						onClick={handleExportPDF}
						disabled={isExporting}
						size="sm"
					>
						<Download className="h-4 w-4" />
						{isExporting ? "Exporting..." : "Download PDF"}
					</Button>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[calc(100vh-5rem)]">
				{/* Editor */}
				<Card className="h-full overflow-auto">
					<CardContent className="px-4 py-2">
						<ResumeForm data={data} setData={setData} />
					</CardContent>
				</Card>

				{/* Preview */}
				<Card className="h-full overflow-auto">
					<CardContent className="px-4 py-2">
						<ResumePreview data={data} />
					</CardContent>
				</Card>
			</div>
		</main>
	);
}
