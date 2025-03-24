import { Button } from "@/components/ui/button";

export default function CtaSection() {
	return (
		<section className="py-20 px-4 md:px-6 bg-primary text-primary-foreground">
			<div className="container mx-auto max-w-4xl text-center">
				<h2 className="text-3xl md:text-4xl font-bold mb-6">
					Ready to create your standout resume?
				</h2>
				<p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
					Join thousands of professionals who&apos;ve accelerated their careers
					with Resume AI.
				</p>
				<Button
					size="lg"
					className="text-base px-8 py-6 bg-background text-foreground hover:bg-background/90"
				>
					Get Started Today
				</Button>
			</div>
		</section>
	);
}
