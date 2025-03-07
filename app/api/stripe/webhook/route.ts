import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not set in environment variables');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-02-24.acacia",
    typescript: true,
});

export async function POST(req: Request) {
    try {
        const body = await req.text();
        const headersList = await headers();
        const signature = headersList.get("Stripe-Signature");

        if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
            return new NextResponse("Missing signature or webhook secret", { status: 400 });
        }

        let event: Stripe.Event;

        try {
            event = stripe.webhooks.constructEvent(
                body,
                signature,
                process.env.STRIPE_WEBHOOK_SECRET
            );
        } catch (err) {
            console.error("Webhook signature verification failed:", err);
            return new NextResponse("Webhook signature verification failed.", { status: 400 });
        }

        switch (event.type) {
            case "checkout.session.completed": {
                const session = event.data.object as Stripe.Checkout.Session;
                const userId = session.metadata?.userId;
                const plan = session.metadata?.plan;

                if (userId && plan) {
                    // Log the successful payment - in a real app, you might want to store this in a database
                    console.log(`User ${userId} has completed payment for ${plan} plan`);
                }
                break;
            }

            case "customer.subscription.updated":
            case "customer.subscription.deleted": {
                const subscription = event.data.object as Stripe.Subscription;
                const userId = subscription.metadata?.userId;

                if (userId) {
                    // Log the subscription update - in a real app, you might want to store this in a database
                    console.log(`Subscription ${subscription.id} ${event.type} for user ${userId}`);
                }
                break;
            }
        }

        return new NextResponse(null, { status: 200 });
    } catch (error) {
        console.error("Error processing webhook:", error);
        return new NextResponse("Webhook handler failed.", { status: 500 });
    }
} 