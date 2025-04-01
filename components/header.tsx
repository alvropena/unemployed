"use client";

import Link from "next/link";
import { SignInButton, SignUpButton, UserButton, useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { Download } from "lucide-react";
import { exportResumeToPDF } from "@/lib/pdfExport";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { loadStripe } from "@stripe/stripe-js";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface Plan {
  id: string;
  name: string;
  description: string;
  price: string;
  period: string;
  features: string[];
  popular: boolean;
}

export function Header() {
  const { isSignedIn } = useAuth();
  const pathname = usePathname();
  const [isExporting, setIsExporting] = useState(false);
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false);
  const [showSubscriptionDialog, setShowSubscriptionDialog] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Fetch prices from Stripe
  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch("/api/stripe/prices");
        const data = await response.json();
        setPlans(data);
        // Set the most popular plan as default selected
        const popularPlan = data.find((plan: any) => plan.popular);
        if (popularPlan) {
          setSelectedPlan(popularPlan.id);
        }
      } catch (error) {
        console.error("Error fetching prices:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrices();
  }, []);

  // Check subscription status when user is signed in
  useEffect(() => {
    const checkSubscription = async () => {
      if (isSignedIn) {
        try {
          const response = await fetch("/api/subscription/status");
          const data = await response.json();
          setHasActiveSubscription(data.hasActiveSubscription);
        } catch (error) {
          console.error("Error checking subscription:", error);
        }
      }
    };

    checkSubscription();
  }, [isSignedIn]);

  // Sync user data with our database when they sign in
  useEffect(() => {
    const syncUser = async () => {
      if (isSignedIn) {
        try {
          const response = await fetch("/api/auth", {
            method: "GET",
          });

          if (!response.ok) {
            console.error("Failed to sync user data");
          }
        } catch (error) {
          console.error("Error syncing user data:", error);
        }
      }
    };

    syncUser();
  }, [isSignedIn]);

  const handleExportPDF = async () => {
    if (!isSignedIn) {
      setShowSubscriptionDialog(true);
      return;
    }

    if (!hasActiveSubscription) {
      setShowSubscriptionDialog(true);
      return;
    }

    setIsExporting(true);
    try {
      exportResumeToPDF();
    } catch (error) {
      console.error("Error exporting PDF:", error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleSubscribe = async () => {
    try {
      // Find the selected plan from the plans array
      const selectedPlanData = plans.find((plan: any) => plan.id === selectedPlan);
      if (!selectedPlanData) {
        throw new Error("Selected plan not found");
      }

      // Determine the plan type based on the period
      let planType = "monthly"; // default
      if (selectedPlanData.period === "year") {
        planType = "annual";
      } else if (selectedPlanData.period === "one-time") {
        planType = "lifetime";
      }

      const response = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ plan: planType }),
      });

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const { sessionId } = await response.json();

      // Redirect to Stripe Checkout
      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
      );
      if (stripe) {
        await stripe.redirectToCheckout({ sessionId });
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
    }
  };

  // Only enable scrolling on the home page
  const isHomePage = pathname === "/";

  const scrollToSection = (
    e: React.MouseEvent<HTMLElement>,
    sectionId: string
  ) => {
    e.preventDefault();

    // Only scroll if we're on the home page
    if (isHomePage) {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // If not on home page, navigate to home page with hash
      window.location.href = `/#${sectionId}`;
    }
  };

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold">
          Unemployed
        </Link>

        {!isSignedIn && (
          <nav className="hidden md:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
            <Link
              href="/#features"
              className="text-muted-foreground hover:text-foreground transition-colors"
              onClick={(e) => scrollToSection(e, "features")}
            >
              Features
            </Link>
            <Link
              href="/#pricing"
              className="text-muted-foreground hover:text-foreground transition-colors"
              onClick={(e) => scrollToSection(e, "pricing")}
            >
              Pricing
            </Link>
            <Link
              href="/#testimonials"
              className="text-muted-foreground hover:text-foreground transition-colors"
              onClick={(e) => scrollToSection(e, "testimonials")}
            >
              Testimonials
            </Link>
            <Link
              href="/#faq"
              className="text-muted-foreground hover:text-foreground transition-colors"
              onClick={(e) => scrollToSection(e, "faq")}
            >
              FAQ
            </Link>
          </nav>
        )}

        <div className="flex items-center gap-4">
          <Dialog
            open={showSubscriptionDialog}
            onOpenChange={setShowSubscriptionDialog}
          >
            <DialogTrigger asChild>
              <Button
                variant="default"
                className="flex items-center justify-center gap-2 w-full md:w-auto"
                onClick={handleExportPDF}
                disabled={isExporting}
                size="sm"
              >
                <Download className="h-4 w-4" />
                {isExporting ? "Exporting..." : "Download PDF"}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle className="text-center text-2xl font-bold">
                  Choose Your Plan
                </DialogTitle>
                <DialogDescription className="text-center">
                  Select the plan that works best for you. Cancel anytime.
                </DialogDescription>
              </DialogHeader>
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : (
                <RadioGroup
                  value={selectedPlan}
                  onValueChange={setSelectedPlan}
                  className="grid gap-6 pt-4 md:grid-cols-3"
                >
                  {plans.map((plan: any) => (
                    <div key={plan.id} className="relative">
                      {plan.popular && (
                        <div className="absolute -top-2 left-0 right-0 mx-auto w-fit rounded-full bg-primary px-3 py-0.5 text-xs font-semibold text-primary-foreground">
                          Most Popular
                        </div>
                      )}
                      <label
                        htmlFor={plan.id}
                        className={cn(
                          "flex h-full cursor-pointer flex-col rounded-lg border p-6 shadow-sm transition-all hover:border-primary",
                          selectedPlan === plan.id
                            ? "border-2 border-primary"
                            : "border-border"
                        )}
                      >
                        <RadioGroupItem
                          value={plan.id}
                          id={plan.id}
                          className="sr-only"
                        />
                        <div className="mb-4 flex flex-col gap-1">
                          <h3 className="font-medium">{plan.name}</h3>
                          <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-bold">
                              ${plan.price}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {plan.period === "one-time"
                                ? "one-time payment"
                                : `per ${plan.period}`}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {plan.description}
                          </p>
                        </div>
                        <ul className="mb-6 flex flex-1 flex-col gap-2 text-sm">
                          {plan.features.map(
                            (feature: string, index: number) => (
                              <li
                                key={index}
                                className="flex items-center gap-2"
                              >
                                <Check className="h-4 w-4 text-primary" />
                                <span>{feature}</span>
                              </li>
                            )
                          )}
                        </ul>
                        <Button
                          variant={
                            selectedPlan === plan.id ? "default" : "outline"
                          }
                          className="w-full"
                          onClick={() => {
                            setSelectedPlan(plan.id);
                            handleSubscribe();
                          }}
                        >
                          Select Plan
                        </Button>
                      </label>
                    </div>
                  ))}
                </RadioGroup>
              )}
            </DialogContent>
          </Dialog>
          <ThemeSwitcher />
          {isSignedIn ? (
            <>
              <UserButton afterSignOutUrl="/" />
            </>
          ) : (
            <>
              <SignInButton mode="modal">
                <Button variant="outline">Log in</Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button variant="default" size="sm">
                  Sign up
                </Button>
              </SignUpButton>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
