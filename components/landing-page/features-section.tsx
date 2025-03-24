interface Feature {
	title: string;
	description: string;
	icon: string;
}

const features: Feature[] = [
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
];

export default function FeaturesSection() {
	return (
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
					{features.map((feature) => (
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
	);
}
