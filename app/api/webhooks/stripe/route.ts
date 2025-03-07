import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const headersList = headers();
    const signature = headersList.get("Stripe-Signature");

    if (!signature) {
      return new NextResponse("No signature found.", { status: 400 });
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        webhookSecret
      );
    } catch (err) {
      console.error("Webhook signature verification failed.");
      return new NextResponse("Webhook signature verification failed.", { status: 400 });
    }

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.userId;
        const plan = session.metadata?.plan;

        if (userId && plan) {
          // Here you would update your database to mark the user as paid
          // For example:
          // await db.user.update({
          //   where: { id: userId },
          //   data: { 
          //     hasPaid: true,
          //     plan: plan,
          //     stripeCustomerId: session.customer as string,
          //   }
          // });
          
          console.log(`User ${userId} has completed payment for ${plan} plan`);
        }
        break;
      }
      // Handle other events here
    }

    return new NextResponse(null, { status: 200 });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return new NextResponse("Webhook handler failed.", { status: 500 });
  }
} 