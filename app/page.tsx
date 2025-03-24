"use client";

import { Loader } from "lucide-react";
import Footer from "@/components/footer";
import type { ResumeData } from "@/lib/types";
import { defaultResumeData } from "@/lib/default-data";
import { useEffect, useState, Suspense } from "react";
import { useAuth } from "@clerk/nextjs";
import { loadResumeData } from "@/lib/resume-service";
import { loadStripe } from "@stripe/stripe-js";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import SubscriptionHandler from "@/components/subscription-handler";

// Import new components
import HeroSection from "@/components/landing-page/hero-section";
import FeaturesSection from "@/components/landing-page/features-section";
import PricingSection from "@/components/landing-page/pricing-section";
import TestimonialsSection from "@/components/landing-page/testimonials-section";
import FaqSection from "@/components/landing-page/faq-section";
import CtaSection from "@/components/landing-page/cta-section";
import ResumeBuilder from "@/app/components/resume-builder";

// Initialize Stripe
const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
	? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
	: null;

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
	const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

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

	// Function to handle subscription checkout
	const handleSubscribe = async (plan: string) => {
		try {
			const response = await fetch("/api/stripe", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ plan }),
			});

			if (!response.ok) {
				throw new Error("Failed to create checkout session");
			}

			const { sessionId } = await response.json();

			// Redirect to Stripe checkout
			const stripe = await stripePromise;
			if (!stripe) throw new Error("Failed to load Stripe");

			const { error } = await stripe.redirectToCheckout({ sessionId });

			if (error) {
				console.error("Stripe checkout error:", error);
				toast.error("Failed to open checkout. Please try again.");
			}
		} catch (error) {
			console.error("Error:", error);
			toast.error("Something went wrong. Please try again later.");
		}
	};

	// If not loaded yet, show loading
	if (!isLoaded || isLoadingData) {
		return (
			<div className="h-screen w-full flex items-center justify-center">
				<Loader className="h-8 w-8 animate-spin text-primary" />
			</div>
		);
	}

	// If signed in, show the resume builder with subscription modal if needed
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
					<SubscriptionHandler
						userId={userId}
						isSignedIn={isSignedIn}
						setHasPaid={setHasPaid}
						setShowSubscriptionModal={setShowSubscriptionModal}
					/>

					{/* Dark overlay when modal is open */}
					{showSubscriptionModal && (
						<div className="fixed inset-0 bg-black/50 z-40" />
					)}

					<ResumeBuilder
						data={resumeData}
						setData={setResumeData}
						showSubscriptionModal={showSubscriptionModal}
					/>

					{/* Subscription Modal */}
					<Dialog
						open={showSubscriptionModal && !hasPaid}
						onOpenChange={(open) => {
							if (!open) {
								setShowSubscriptionModal(false);
							}
						}}
					>
						<DialogContent
							className="max-h-[90vh] w-full md:max-w-4xl overflow-y-auto"
							onInteractOutside={() => {
								// Allow closing on outside click
								setShowSubscriptionModal(false);
							}}
							onEscapeKeyDown={() => {
								// Allow closing on escape key
								setShowSubscriptionModal(false);
							}}
						>
							<DialogHeader className="bg-background z-10 pb-4">
								<DialogTitle className="text-xl md:text-2xl font-bold text-center">
									Choose a Subscription Plan
								</DialogTitle>
								<DialogDescription className="text-sm md:text-base mt-2 md:mt-3 text-center">
									Select a plan to access all features of the resume generator.
								</DialogDescription>
							</DialogHeader>

							<div className="py-4">
								<PricingSection
									onSubscribe={handleSubscribe}
									className="bg-transparent py-0"
								/>
							</div>
						</DialogContent>
					</Dialog>
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
