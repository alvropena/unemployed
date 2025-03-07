import { NextResponse } from "next/server";
import Stripe from "stripe";
import { auth } from "@clerk/nextjs/server";

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
});

const PLANS = {
  monthly: {
    price: "price_monthly", // Replace with your actual Stripe price ID
    amount: 1200, // $12.00
  },
  annual: {
    price: "price_annual", // Replace with your actual Stripe price ID
    amount: 8900, // $89.00
  },
  lifetime: {
    price: "price_lifetime", // Replace with your actual Stripe price ID
    amount: 24900, // $249.00
  },
};

export async function POST(req: Request) {
  try {
    const session = await auth();
    const userId = session.userId;
    
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { plan } = await req.json();
    
    if (!plan || !PLANS[plan as keyof typeof PLANS]) {
      return new NextResponse("Invalid plan selected", { status: 400 });
    }

    const selectedPlan = PLANS[plan as keyof typeof PLANS];

    // Create Stripe checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Resume AI ${plan.charAt(0).toUpperCase() + plan.slice(1)} Plan`,
              description: `Access to all Resume AI features with ${plan} billing`,
            },
            unit_amount: selectedPlan.amount,
            recurring: plan === "lifetime" ? undefined : {
              interval: plan === "monthly" ? "month" : "year",
            },
          },
          quantity: 1,
        },
      ],
      mode: plan === "lifetime" ? "payment" : "subscription",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}?canceled=true`,
      customer_email: undefined, // Clerk will handle this
      metadata: {
        userId,
        plan,
      },
    });

    return NextResponse.json({ sessionId: checkoutSession.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
} 