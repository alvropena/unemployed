"use client";

import { Loader } from "lucide-react";
import Footer from "@/components/footer";
import type { ResumeData } from "@/lib/types";
import { defaultResumeData } from "@/lib/default-data";
import { useEffect, useState, Suspense } from "react";
import { useAuth } from "@clerk/nextjs";
import { loadResumeData } from "@/lib/resume-service";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import SubscriptionHandler from "@/components/paywall/subscription-handler";

// Import components
import HeroSection from "@/components/landing-page/hero-section";
import FeaturesSection from "@/components/landing-page/features-section";
import PricingSection from "@/components/landing-page/pricing-section";
import TestimonialsSection from "@/components/landing-page/testimonials-section";
import FaqSection from "@/components/landing-page/faq-section";
import CtaSection from "@/components/landing-page/cta-section";
import ResumeBuilder from "@/components/resume-builder";

function PaymentStatusHandler() {
	const searchParams = useSearchParams();

	useEffect(() => {
		// Check if payment was successful
		if (searchParams.get("success") === "true") {
			toast.success(
				"Payment successful! Your premium features are now active.",
			);
		}

		// Check if payment was canceled
		if (searchParams.get("canceled") === "true") {
			toast.error("Payment was canceled. Please try again when you're ready.");
		}
	}, [searchParams]);

	return null;
}

export default function Home() {
	const { isSignedIn, isLoaded, userId } = useAuth();
	const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
	const [hasPaid, setHasPaid] = useState(false);
	const [isLoadingData, setIsLoadingData] = useState(true);

	// Load saved resume data when authenticated
	useEffect(() => {
		if (isSignedIn) {
			const fetchResumeData = async () => {
				setIsLoadingData(true);
				const savedData = await loadResumeData();
				if (savedData) {
					setResumeData(savedData);
				}
				setIsLoadingData(false);
			};

			fetchResumeData();
		} else {
			setIsLoadingData(false);
		}
	}, [isSignedIn]);

	// If not loaded yet, show loading
	if (!isLoaded || isLoadingData) {
		return (
			<div className="h-screen w-full flex items-center justify-center">
				<Loader className="h-8 w-8 animate-spin text-primary" />
			</div>
		);
	}

	// If signed in, show the resume builder
	if (isSignedIn) {
		return (
			<>
				<Suspense
					fallback={
						<div className="h-screen w-full flex items-center justify-center">
							<Loader className="h-8 w-8 animate-spin text-primary" />
						</div>
					}
				>
					<PaymentStatusHandler />

					<ResumeBuilder
						data={resumeData}
						setData={setResumeData}
						showSubscriptionModal={false}
					/>
				</Suspense>
			</>
		);
	}

	// If not signed in, show the landing page
	return (
		<div className="min-h-screen flex flex-col">
			<HeroSection />
			<FeaturesSection />
			<PricingSection showActionButtons={false} />
			<TestimonialsSection />
			<FaqSection />
			<CtaSection />
			<Footer />
		</div>
	);
}
