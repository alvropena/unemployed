import TestimonialCard from "@/components/landing-page/TestimonialCard";

export default function TestimonialsSection() {
	return (
		<section id="testimonials" className="py-20 px-4 md:px-6 bg-background">
			<div className="container mx-auto max-w-6xl">
				<div className="text-center mb-16">
					<h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
						What our users say
					</h2>
					<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
						Join thousands of professionals who&apos;ve landed their dream jobs
						with Unemployed.
					</p>
				</div>

				<div className="grid md:grid-cols-3 gap-8">
					<TestimonialCard
						quote="Unemployed helped me land interviews at 3 top tech companies. The AI suggestions were spot-on!"
						author="Sarah J."
						jobTitle="Software Engineer"
						avatarUrl="/placeholder.svg?height=100&width=100"
					/>

					<TestimonialCard
						quote="I was struggling with my resume for weeks. Unemployed helped me create a professional resume in just 30 minutes."
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
	);
}
