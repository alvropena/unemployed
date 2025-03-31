"use client";

import { useEffect, useState } from "react";
import PricingCard from "@/components/paywall/PricingCard";

interface Price {
	id: string;
	productId: string;
	name: string;
	description: string;
	features: string[];
	price: string;
	period: string;
	popular: boolean;
}

interface PricingSectionProps {
	onSubscribe?: (plan: string) => void;
	showActionButtons?: boolean;
	className?: string;
	isCompact?: boolean;
}

export default function PricingSection({
	onSubscribe,
	showActionButtons = true,
	className = "",
	isCompact = false,
}: PricingSectionProps) {
	const [prices, setPrices] = useState<Price[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchPrices = async () => {
			try {
				const response = await fetch("/api/prices");
				if (!response.ok) {
					throw new Error("Failed to fetch prices");
				}
				const data = await response.json();
				setPrices(data);
			} catch (error) {
				console.error("Error fetching prices:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchPrices();
	}, []);

	// Format the period for display
	const formatPeriod = (period: string) => {
		switch (period) {
			case "month":
				return "per month";
			case "year":
				return "per year";
			default:
				return "one-time payment";
		}
	};

	return (
		<section
			id="pricing"
			className={`${isCompact ? "py-2" : "py-8 md:py-20"} px-4 md:px-6 bg-muted/50 ${className}`}
		>
			<div className="container mx-auto max-w-6xl">
				{!isCompact && (
					<div className="text-center mb-8 md:mb-16">
						<h2 className="text-2xl md:text-4xl font-bold text-foreground mb-3 md:mb-4">
							Simple, transparent pricing
						</h2>
						<p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto">
							Choose the plan that works best for your needs.
						</p>
					</div>
				)}

				<div
					className={`grid grid-cols-1 md:grid-cols-3 ${
						isCompact ? "gap-2" : "gap-4 md:gap-8"
					} max-w-md md:max-w-none mx-auto`}
				>
					{isLoading ? (
						// Show loading skeleton
						<>
							<div className="animate-pulse bg-muted rounded-xl h-96" />
							<div className="animate-pulse bg-muted rounded-xl h-96" />
							<div className="animate-pulse bg-muted rounded-xl h-96" />
						</>
					) : (
						prices.map((price) => (
							<PricingCard
								key={price.id}
								title={price.name}
								price={`$${price.price}`}
								period={formatPeriod(price.period)}
								description={price.description}
								features={price.features}
								buttonText={showActionButtons ? "Select Plan" : "Get Started"}
								popular={price.popular}
								onClick={
									showActionButtons ? () => onSubscribe?.(price.id) : undefined
								}
							/>
						))
					)}
				</div>
			</div>
		</section>
	);
}
