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
                    // Here you would update your database to mark the user as paid
                    // For example with Prisma:
                    // await prisma.user.update({
                    //   where: { id: userId },
                    //   data: { 
                    //     subscriptionStatus: 'active',
                    //     plan: plan,
                    //     stripeCustomerId: session.customer as string,
                    //   }
                    // });

                    console.log(`User ${userId} has completed payment for ${plan} plan`);
                }
                break;
            }

            case "customer.subscription.updated":
            case "customer.subscription.deleted": {
                const subscription = event.data.object as Stripe.Subscription;
                // Handle subscription updates
                // Update user's subscription status in your database
                break;
            }
        }

        return new NextResponse(null, { status: 200 });
    } catch (error) {
        console.error("Error processing webhook:", error);
        return new NextResponse("Webhook handler failed.", { status: 500 });
    }
} 