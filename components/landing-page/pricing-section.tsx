import PricingCard from "@/components/pricing-card";

interface PricingSectionProps {
	onSubscribe?: (plan: string) => void;
	showActionButtons?: boolean;
	className?: string;
}

export default function PricingSection({
	onSubscribe,
	showActionButtons = true,
	className = "",
}: PricingSectionProps) {
	return (
		<section
			id="pricing"
			className={`py-8 md:py-20 px-4 md:px-6 bg-muted/50 ${className}`}
		>
			<div className="container mx-auto max-w-6xl">
				<div className="text-center mb-8 md:mb-16">
					<h2 className="text-2xl md:text-4xl font-bold text-foreground mb-3 md:mb-4">
						Simple, transparent pricing
					</h2>
					<p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto">
						Choose the plan that works best for your needs.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 max-w-md md:max-w-none mx-auto">
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
						buttonText={showActionButtons ? "Select Plan" : "Get Started"}
						popular={false}
						onClick={
							showActionButtons ? () => onSubscribe?.("monthly") : undefined
						}
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
						buttonText={showActionButtons ? "Select Plan" : "Get Started"}
						popular={true}
						onClick={
							showActionButtons ? () => onSubscribe?.("annual") : undefined
						}
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
						buttonText={showActionButtons ? "Select Plan" : "Get Started"}
						popular={false}
						onClick={
							showActionButtons ? () => onSubscribe?.("lifetime") : undefined
						}
					/>
				</div>
			</div>
		</section>
	);
}
