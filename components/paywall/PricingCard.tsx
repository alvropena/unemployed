import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface PricingCardProps {
	title: string;
	price: string;
	period: string;
	description: string;
	features: string[];
	buttonText: string;
	popular?: boolean;
	onClick?: () => void;
}

export default function PricingCard({
	title,
	price,
	period,
	description,
	features,
	buttonText,
	popular = false,
	onClick,
}: PricingCardProps) {
	return (
		<div
			className={cn(
				"rounded-xl border flex flex-col h-full",
				popular
					? "border-primary shadow-lg bg-card relative"
					: "border-border bg-card",
			)}
		>
			{popular && (
				<div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-2 py-0.5 rounded-full text-xs font-medium">
					Most Popular
				</div>
			)}

			<div className="p-3">
				<h3 className="text-sm font-semibold mb-1 text-foreground">{title}</h3>
				<div className="flex items-baseline">
					<span className="text-xl font-bold text-foreground">{price}</span>
					<span className="text-muted-foreground ml-1 text-xs">{period}</span>
				</div>
				<p className="text-muted-foreground mt-1 text-xs">{description}</p>
			</div>

			<ul className="space-y-1.5 px-3 mb-3 flex-grow">
				{features.map((feature) => (
					<li key={feature} className="flex items-start">
						<CheckCircle2 className="h-3.5 w-3.5 text-primary mr-1 shrink-0 mt-0.5" />
						<span className="text-foreground text-xs">{feature}</span>
					</li>
				))}
			</ul>

			<div className="p-3 pt-0">
				<Button
					className={cn("w-full text-sm h-8", popular ? "" : "")}
					variant={popular ? "default" : "outline"}
					onClick={onClick}
				>
					{buttonText}
				</Button>
			</div>
		</div>
	);
}
