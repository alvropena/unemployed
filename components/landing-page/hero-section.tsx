import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
	return (
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
	);
}
