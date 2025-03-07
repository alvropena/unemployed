import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";
import { auth } from "@clerk/nextjs/server";

// Initialize Stripe with your secret key
// In a real app, you would store this in an environment variable
const stripe = new Stripe("sk_test_your_stripe_secret_key", {
  apiVersion: "2023-10-16" as any,
});

const DOMAIN = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

type PlanInterval = "month" | "year";

const PLANS = {
  pro: {
    name: "Pro Plan",
    price: 999, // $9.99 in cents
    interval: "month" as PlanInterval,
  },
  enterprise: {
    name: "Enterprise Plan",
    price: 2999, // $29.99 in cents
    interval: "month" as PlanInterval,
  },
};

export async function POST(request: NextRequest) {
  try {
    const authSession = await auth();
    const userId = authSession.userId;
    
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { planId } = body;
    
    const plan = PLANS[planId as keyof typeof PLANS];
    if (!plan) {
      return NextResponse.json(
        { error: "Invalid plan" },
        { status: 400 }
      );
    }

    // Create a checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: plan.name,
            },
            unit_amount: plan.price,
            recurring: {
              interval: plan.interval,
            },
          },
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${DOMAIN}/?success=true`,
      cancel_url: `${DOMAIN}/checkout?canceled=true`,
      metadata: {
        userId,
        planId,
      },
    });

    return NextResponse.json({ sessionId: checkoutSession.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 