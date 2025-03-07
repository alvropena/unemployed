import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface PricingCardProps {
  title: string
  price: string
  period: string
  description: string
  features: string[]
  buttonText: string
  popular?: boolean
}

export default function PricingCard({
  title,
  price,
  period,
  description,
  features,
  buttonText,
  popular = false,
}: PricingCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border p-8 flex flex-col h-full",
        popular ? "border-primary shadow-lg bg-card relative" : "border-border bg-card",
      )}
    >
      {popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
          Most Popular
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2 text-foreground">{title}</h3>
        <div className="flex items-baseline">
          <span className="text-3xl font-bold text-foreground">{price}</span>
          <span className="text-muted-foreground ml-2">{period}</span>
        </div>
        <p className="text-muted-foreground mt-3">{description}</p>
      </div>

      <ul className="space-y-3 mb-8 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
            <span className="text-foreground">{feature}</span>
          </li>
        ))}
      </ul>

      <Button
        className={cn("w-full mt-auto", popular ? "" : "")}
        variant={popular ? "default" : "outline"}
      >
        {buttonText}
      </Button>
    </div>
  )
}

