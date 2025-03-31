"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

interface SubscriptionHandlerProps {
	userId: string | null;
	isSignedIn: boolean;
	setHasPaid: (value: boolean) => void;
	setShowSubscriptionModal: (value: boolean) => void;
}

export default function SubscriptionHandler({
	userId,
	isSignedIn,
	setHasPaid,
	setShowSubscriptionModal,
}: SubscriptionHandlerProps) {
	const searchParams = useSearchParams();

	// Handle successful payment
	useEffect(() => {
		if (searchParams.get("success") === "true" && userId) {
			// Immediately hide the subscription modal and set hasPaid to true
			setHasPaid(true);
			setShowSubscriptionModal(false);

			// Store the payment success in localStorage to persist across page refreshes
			localStorage.setItem("hasActiveSubscription", "true");

			// Refresh subscription status after successful payment
			fetch("/api/subscription")
				.then((res) => res.json())
				.then((data) => {
					if (data.hasActiveSubscription) {
						setHasPaid(true);
						setShowSubscriptionModal(false);
					}
				})
				.catch(() => {
					// Silently handle the error since we've already set the state
					console.log("Could not verify subscription status after payment");
				});

			toast.success(
				"Payment successful! Your premium features are now active.",
			);
		}

		if (searchParams.get("canceled") === "true") {
			toast.error("Payment was canceled. Please try again when you're ready.");
		}
	}, [searchParams, userId, setHasPaid, setShowSubscriptionModal]);

	// Check subscription status
	useEffect(() => {
		if (!isSignedIn || !userId) {
			setHasPaid(false);
			setShowSubscriptionModal(false);
			return;
		}

		const checkSubscriptionStatus = async () => {
			// First check if we have a successful payment in the URL
			if (searchParams.get("success") === "true") {
				setHasPaid(true);
				setShowSubscriptionModal(false);
				localStorage.setItem("hasActiveSubscription", "true");
				return;
			}

			// Then check localStorage for cached subscription status
			if (
				typeof window !== "undefined" &&
				localStorage.getItem("hasActiveSubscription") === "true"
			) {
				setHasPaid(true);
				setShowSubscriptionModal(false);
				return;
			}

			try {
				const response = await fetch("/api/subscription");

				// Check if response is HTML (error page)
				const contentType = response.headers.get("content-type");
				if (contentType?.includes("text/html")) {
					console.log("Received HTML response instead of JSON");
					setHasPaid(false);
					setShowSubscriptionModal(false);
					return;
				}

				if (!response.ok) {
					console.log("Subscription status check failed");
					setHasPaid(false);
					setShowSubscriptionModal(false);
					return;
				}

				const data = await response.json();

				if (data.hasActiveSubscription) {
					setHasPaid(true);
					setShowSubscriptionModal(false);
					// Cache the subscription status
					if (typeof window !== "undefined") {
						localStorage.setItem("hasActiveSubscription", "true");
					}
				} else {
					setHasPaid(false);
					setShowSubscriptionModal(true);
				}
			} catch (error) {
				// Handle the error silently and set default states
				console.log("Error checking subscription:", error);
				setHasPaid(false);
				setShowSubscriptionModal(false);
			}
		};

		checkSubscriptionStatus();
	}, [isSignedIn, userId, searchParams, setHasPaid, setShowSubscriptionModal]);

	return null;
}
