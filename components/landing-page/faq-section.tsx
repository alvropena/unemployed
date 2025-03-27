import FaqAccordion from "@/components/landing-page/faq-accordion";

const faqItems = [
	{
		question: "Is Unemployed really worth the cost?",
		answer:
			"Absolutely. Our users report a 3x increase in interview callbacks after using Unemployed. The investment pays for itself when you land your dream job faster.",
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
		question: "Can I use Unemployed on my mobile device?",
		answer:
			"Yes, Unemployed is fully responsive and works on desktop, tablet, and mobile devices.",
	},
];

export default function FaqSection() {
	return (
		<section id="faq" className="py-20 px-4 md:px-6 bg-muted/50">
			<div className="container mx-auto max-w-3xl">
				<div className="text-center mb-16">
					<h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
						Frequently asked questions
					</h2>
					<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
						Everything you need to know about Unemployed.
					</p>
				</div>

				<FaqAccordion items={faqItems} />
			</div>
		</section>
	);
}
