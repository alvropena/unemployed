import { NextResponse } from "next/server";
import Stripe from "stripe";
import { auth } from "@clerk/nextjs/server";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set in environment variables');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-02-24.acacia",
  typescript: true,
});

const PLANS = {
  monthly: {
    priceId: 'price_XXXXX', // Replace with your monthly plan price ID from Stripe
    trial_period_days: 14,
  },
  annual: {
    priceId: 'price_XXXXX', // Replace with your annual plan price ID from Stripe
    trial_period_days: 14,
  },
  lifetime: {
    priceId: 'price_XXXXX', // Replace with your lifetime plan price ID from Stripe
  },
};

// POST /api/stripe/create-checkout - Create checkout session
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
          price: selectedPlan.priceId,
          quantity: 1,
        },
      ],
      mode: plan === "lifetime" ? "payment" : "subscription",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}?canceled=true`,
      metadata: {
        userId,
        plan,
      },
      subscription_data: plan !== "lifetime" && 'trial_period_days' in selectedPlan ? {
        trial_period_days: selectedPlan.trial_period_days,
      } : undefined,
    });

    return NextResponse.json({ sessionId: checkoutSession.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
} 