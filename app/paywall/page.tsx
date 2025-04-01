"use client";

import { loadStripe } from "@stripe/stripe-js";
import PricingSection from "@/components/landing-page/PricingSection";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import confetti from "canvas-confetti";

// Initialize Stripe
const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
	? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
	: null;

export default function PaywallPage() {
	const [isSuccess, setIsSuccess] = useState(false);
	const searchParams = useSearchParams();

	useEffect(() => {
		const success = searchParams.get("success");
		if (success === "true") {
			setIsSuccess(true);
			// Trigger confetti
			confetti({
				particleCount: 100,
				spread: 70,
				origin: { y: 0.6 },
			});
		}
	}, [searchParams]);

	const handleSubscribe = async (priceId: string) => {
		try {
			const response = await fetch("/api/stripe", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ priceId }),
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
			}
		} catch (error) {
			console.error("Error:", error);
		}
	};

	if (isSuccess) {
		return (
			<main className="h-[100dvh] overflow-hidden bg-background flex flex-col">
				<div className="flex-1 flex flex-col justify-center items-center max-h-[100dvh]">
					<div className="container max-w-4xl mx-auto px-4 text-center">
						<h1 className="text-2xl font-bold mb-4">🎉 Congratulations! 🎉</h1>
						<p className="text-lg text-muted-foreground mb-8">
							Your subscription has been activated successfully. You now have
							access to all features!
						</p>
						<a
							href="/dashboard"
							className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
						>
							Go to Dashboard
						</a>
					</div>
				</div>
			</main>
		);
	}

	return (
		<main className="h-[100dvh] overflow-hidden bg-background flex flex-col">
			<div className="flex-1 flex flex-col justify-center max-h-[100dvh]">
				<div className="container max-w-4xl mx-auto px-4">
					<div className="text-center mb-2">
						<h1 className="text-lg font-medium">Upgrade to Continue</h1>
						<p className="text-sm text-muted-foreground">
							Choose a plan to unlock all features and continue building your
							professional resume.
						</p>
					</div>

					<PricingSection
						onSubscribe={handleSubscribe}
						className="bg-transparent py-0"
						isCompact={true}
					/>
				</div>
			</div>
		</main>
	);
}
