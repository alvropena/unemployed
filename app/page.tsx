"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader } from "lucide-react";
import Footer from "@/components/footer";
import PricingCard from "@/components/pricing-card";
import TestimonialCard from "@/components/testimonial-card";
import FaqAccordion from "@/components/faq-accordion";
import Image from "next/image";
import ResumePreview from "@/components/resume-preview";
import ResumeForm from "@/components/resume-form";
import type { ResumeData } from "@/lib/types";
import { defaultResumeData } from "@/lib/default-data";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { loadResumeData } from "@/lib/resumeService";
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

// Initialize Stripe
const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
	? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
	: null;

export default function Home() {
	const { isSignedIn, isLoaded } = useAuth();
	const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
	const [hasPaid, setHasPaid] = useState(false);
	const [isLoadingData, setIsLoadingData] = useState(true);
	const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
	const searchParams = useSearchParams();

	// Check if user has paid - this would be replaced with your actual payment verification
	useEffect(() => {
		if (!isSignedIn) return;

		// Mock implementation - replace with your actual API call to check payment status
		const checkPaymentStatus = async () => {
			// Replace this with your actual payment verification logic
			// For example: const response = await fetch('/api/check-payment')
			// setHasPaid(response.data.hasPaid)

			// For now, we'll just mock it
			const isPaid = false; // Set to false to test the unpaid state
			setHasPaid(isPaid);
			setShowSubscriptionModal(!isPaid);
		};

		checkPaymentStatus();
	}, [isSignedIn]); // Only run when isSignedIn changes

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

	// Check for success or canceled payment status
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

	// Function to handle subscription checkout
	const handleSubscribe = async (plan: string) => {
		try {
			const response = await fetch("/api/stripe/create-checkout", {
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
				{/* Dark overlay when modal is open - using standard opacity */}
				{showSubscriptionModal && (
					<div className="fixed inset-0 bg-black/50 z-40" />
				)}

				<main
					className={`container mx-auto p-4 relative ${showSubscriptionModal ? "pointer-events-none opacity-80" : ""}`}
				>
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
						<div className="bg-card rounded-lg shadow p-4 overflow-auto max-h-[calc(100vh-150px)]">
							<ResumeForm data={resumeData} setData={setResumeData} />
						</div>
						<div className="bg-muted/10 rounded-lg shadow-md p-4 max-h-[calc(100vh-150px)]">
							<div className="bg-white border border-gray-200 shadow-sm p-6 rounded-md min-h-[800px]">
								<ResumePreview data={resumeData} />
							</div>
						</div>
					</div>
				</main>

				{/* Subscription Modal */}
				<Dialog
					open={showSubscriptionModal}
					onOpenChange={(open) => {
						// Only allow closing if user has paid
						if (hasPaid) {
							setShowSubscriptionModal(open);
						}
					}}
				>
					<DialogContent
						className="max-w-5xl w-[90vw] z-50"
						onInteractOutside={(e) => e.preventDefault()}
						onEscapeKeyDown={(e) => e.preventDefault()}
						forceMount
					>
						<DialogHeader className="pb-4">
							<DialogTitle className="text-2xl font-bold text-center">
								Choose a Subscription Plan
							</DialogTitle>
							<DialogDescription className="text-base mt-3 text-center">
								Select a plan to access all features of the resume generator.
							</DialogDescription>
						</DialogHeader>

						<div className="grid md:grid-cols-3 gap-4">
							<div className="cursor-pointer">
								<PricingCard
									title="Monthly"
									price="$12"
									period="per month"
									description="Perfect for job seekers who need a quick resume update."
									features={[
										"Unlimited resume creation",
										"AI-powered suggestions",
										"Export to PDF, Word, and more",
										"Access to all templates",
									]}
									buttonText="Select Plan"
									popular={false}
									onClick={() => handleSubscribe("monthly")}
								/>
							</div>

							<div className="cursor-pointer">
								<PricingCard
									title="Annual"
									price="$89"
									period="per year"
									description="Our most popular plan for serious job seekers."
									features={[
										"Everything in Monthly",
										"Save $55 compared to monthly",
										"Priority customer support",
										"Cover letter generator",
									]}
									buttonText="Select Plan"
									popular={true}
									onClick={() => handleSubscribe("annual")}
								/>
							</div>

							<div className="cursor-pointer">
								<PricingCard
									title="Lifetime"
									price="$249"
									period="one-time payment"
									description="For professionals who want lifetime access."
									features={[
										"Everything in Annual",
										"One-time payment",
										"Free updates for life",
										"LinkedIn profile optimization",
									]}
									buttonText="Select Plan"
									popular={false}
									onClick={() => handleSubscribe("lifetime")}
								/>
							</div>
						</div>
					</DialogContent>
				</Dialog>
			</>
		);
	}

	// If not signed in, show the landing page
	return (
		<div className="min-h-screen flex flex-col">
			{/* Hero Section */}
			<section
				id="hero"
				className="py-20 px-4 md:px-6 lg:py-32 bg-gradient-to-b from-background to-background/50"
			>
				<div className="container mx-auto max-w-6xl">
					<div className="flex flex-col lg:flex-row items-center gap-12">
						<div className="flex-1 space-y-6">
							<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
								Craft the perfect resume in minutes
							</h1>
							<p className="text-xl text-muted-foreground max-w-2xl">
								Resume AI uses advanced technology to help you create
								professional, ATS-friendly resumes that stand out to employers.
							</p>
							<div className="pt-4 flex flex-col sm:flex-row gap-4">
								<Button size="lg" className="text-base px-8 py-6">
									Get Started
								</Button>
								<Button
									size="lg"
									variant="outline"
									className="text-base px-8 py-6"
								>
									View Demo
								</Button>
							</div>
						</div>
						<div className="flex-1 relative">
							<div className="bg-card rounded-xl shadow-2xl overflow-hidden border border-border">
								<Image
									src="/placeholder.svg?height=600&width=800"
									alt="Resume AI interface"
									className="w-full h-auto"
									width={800}
									height={600}
								/>
							</div>
							<div className="absolute -bottom-6 -left-6 bg-card p-4 rounded-lg shadow-lg border border-border">
								<div className="flex items-center gap-2">
									<CheckCircle2 className="text-primary h-5 w-5" />
									<span className="text-sm font-medium">ATS-Optimized</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section id="features" className="py-20 px-4 md:px-6 bg-background">
				<div className="container mx-auto max-w-6xl">
					<div className="text-center mb-16">
						<h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
							Why choose Resume AI?
						</h2>
						<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
							Our platform offers everything you need to create professional
							resumes that get results.
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-8">
						{[
							{
								title: "AI-Powered Templates",
								description:
									"Smart templates that adapt to your experience and career goals.",
								icon: "✨",
							},
							{
								title: "ATS-Friendly Format",
								description:
									"Optimized for Applicant Tracking Systems to ensure your resume gets seen.",
								icon: "🔍",
							},
							{
								title: "Expert Suggestions",
								description:
									"Get real-time feedback and suggestions to improve your resume.",
								icon: "💡",
							},
						].map((feature) => (
							<div
								key={feature.title}
								className="bg-card p-8 rounded-xl border border-border"
							>
								<div className="text-4xl mb-4">{feature.icon}</div>
								<h3 className="text-xl font-semibold mb-2 text-foreground">
									{feature.title}
								</h3>
								<p className="text-muted-foreground">{feature.description}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Pricing Section */}
			<section id="pricing" className="py-20 px-4 md:px-6 bg-muted/50">
				<div className="container mx-auto max-w-6xl">
					<div className="text-center mb-16">
						<h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
							Simple, transparent pricing
						</h2>
						<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
							Choose the plan that works best for your needs.
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-8">
						<PricingCard
							title="Monthly"
							price="$12"
							period="per month"
							description="Perfect for job seekers who need a quick resume update."
							features={[
								"Unlimited resume creation",
								"AI-powered suggestions",
								"Export to PDF, Word, and more",
								"Access to all templates",
							]}
							buttonText="Get Started"
							popular={false}
						/>

						<PricingCard
							title="Annual"
							price="$89"
							period="per year"
							description="Our most popular plan for serious job seekers."
							features={[
								"Everything in Monthly",
								"Save $55 compared to monthly",
								"Priority customer support",
								"Cover letter generator",
							]}
							buttonText="Get Started"
							popular={true}
						/>

						<PricingCard
							title="Lifetime"
							price="$249"
							period="one-time payment"
							description="For professionals who want lifetime access."
							features={[
								"Everything in Annual",
								"One-time payment",
								"Free updates for life",
								"LinkedIn profile optimization",
							]}
							buttonText="Get Started"
							popular={false}
						/>
					</div>
				</div>
			</section>

			{/* Testimonials Section */}
			<section id="testimonials" className="py-20 px-4 md:px-6 bg-background">
				<div className="container mx-auto max-w-6xl">
					<div className="text-center mb-16">
						<h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
							What our users say
						</h2>
						<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
							Join thousands of professionals who&apos;ve landed their dream
							jobs with Resume AI.
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-8">
						<TestimonialCard
							quote="Resume AI helped me land interviews at 3 top tech companies. The AI suggestions were spot-on!"
							author="Sarah J."
							jobTitle="Software Engineer"
							avatarUrl="/placeholder.svg?height=100&width=100"
						/>

						<TestimonialCard
							quote="I was struggling with my resume for weeks. Resume AI helped me create a professional resume in just 30 minutes."
							author="Michael T."
							jobTitle="Marketing Manager"
							avatarUrl="/placeholder.svg?height=100&width=100"
						/>

						<TestimonialCard
							quote="The templates are beautiful and the AI suggestions helped me highlight achievements I would have otherwise missed."
							author="Jessica L."
							jobTitle="Product Designer"
							avatarUrl="/placeholder.svg?height=100&width=100"
						/>
					</div>
				</div>
			</section>

			{/* FAQ Section */}
			<section id="faq" className="py-20 px-4 md:px-6 bg-muted/50">
				<div className="container mx-auto max-w-3xl">
					<div className="text-center mb-16">
						<h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
							Frequently asked questions
						</h2>
						<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
							Everything you need to know about Resume AI.
						</p>
					</div>

					<FaqAccordion
						items={[
							{
								question: "Is Resume AI really worth the cost?",
								answer:
									"Absolutely. Our users report a 3x increase in interview callbacks after using Resume AI. The investment pays for itself when you land your dream job faster.",
							},
							{
								question: "Can I cancel my subscription anytime?",
								answer:
									"Yes, you can cancel your monthly or annual subscription at any time. Your access will continue until the end of your billing period.",
							},
							{
								question: "How does the AI technology work?",
								answer:
									"Our AI analyzes millions of successful resumes to provide tailored suggestions for your specific industry and role. It helps optimize your content for ATS systems and highlights your achievements effectively.",
							},
							{
								question: "Do you offer refunds?",
								answer:
									"We offer a 14-day money-back guarantee if you&apos;re not satisfied with our service. Simply contact our support team within 14 days of your purchase.",
							},
							{
								question: "Can I use Resume AI on my mobile device?",
								answer:
									"Yes, Resume AI is fully responsive and works on desktop, tablet, and mobile devices.",
							},
						]}
					/>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-20 px-4 md:px-6 bg-primary text-primary-foreground">
				<div className="container mx-auto max-w-4xl text-center">
					<h2 className="text-3xl md:text-4xl font-bold mb-6">
						Ready to create your standout resume?
					</h2>
					<p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
						Join thousands of professionals who&apos;ve accelerated their
						careers with Resume AI.
					</p>
					<Button
						size="lg"
						className="text-base px-8 py-6 bg-background text-foreground hover:bg-background/90"
					>
						Get Started Today
					</Button>
				</div>
			</section>

			<Footer />
		</div>
	);
}
