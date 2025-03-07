"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { loadStripe } from "@stripe/stripe-js";

// Initialize Stripe with your publishable key
// In a real app, you would store this in an environment variable
const stripePromise = loadStripe("pk_test_your_stripe_key");

const plans = {
  pro: {
    name: "Pro Plan",
    price: "$9.99",
    description: "For serious job seekers",
    features: [
      "Premium templates",
      "PDF & DOCX downloads",
      "Up to 5 resumes",
      "AI suggestions"
    ]
  },
  enterprise: {
    name: "Enterprise Plan",
    price: "$29.99",
    description: "For teams and businesses",
    features: [
      "All Pro features",
      "Unlimited resumes",
      "Custom branding",
      "Team management",
      "Priority support"
    ]
  }
};

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const planId = searchParams.get("plan") || "pro";
  const plan = plans[planId as keyof typeof plans] || plans.pro;
  
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    
    try {
      // In a real implementation, you would call your API to create a Stripe checkout session
      // const response = await fetch('/api/create-checkout-session', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     planId,
      //   }),
      // });
      
      // const { sessionId } = await response.json();
      // const stripe = await stripePromise;
      // await stripe?.redirectToCheckout({ sessionId });
      
      // For demo purposes, we'll just show a loading state
      setTimeout(() => {
        setLoading(false);
        alert("In a real app, this would redirect to Stripe Checkout. Implementation requires a Stripe account and backend API.");
      }, 2000);
    } catch (error) {
      console.error("Error during checkout:", error);
      setLoading(false);
    }
  };

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Checkout</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>{plan.name}</CardTitle>
            <CardDescription>{plan.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold mb-4">{plan.price}</div>
            <div className="space-y-2">
              {plan.features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4 text-primary"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full" 
              onClick={handleCheckout}
              disabled={loading}
            >
              {loading ? "Processing..." : "Subscribe Now"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
} 