"use client";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqItem {
	question: string;
	answer: string;
}

interface FaqAccordionProps {
	items: FaqItem[];
}

export default function FaqAccordion({ items }: FaqAccordionProps) {
	return (
		<Accordion type="single" collapsible className="w-full">
			{items.map((item, index) => (
				<AccordionItem key={item.question} value={`item-${index}`}>
					<AccordionTrigger className="text-left font-medium text-foreground">
						{item.question}
					</AccordionTrigger>
					<AccordionContent className="text-muted-foreground">
						{item.answer}
					</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>
	);
}
