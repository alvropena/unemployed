import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/db";

if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not set in environment variables');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
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
        } catch (err: any) {
            console.error("Webhook signature verification failed:", err.message);
            return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
        }

        switch (event.type) {
            case "checkout.session.completed": {
                const session = event.data.object as Stripe.Checkout.Session;
                const userId = session.metadata?.userId;
                const plan = session.metadata?.plan;
                
                if (userId && plan) {
                    // Create or update user record
                    await prisma.user.upsert({
                        where: { id: userId },
                        update: {},
                        create: {
                            id: userId,
                            email: session.customer_details?.email || "unknown",
                        },
                    });
                    
                    // Create or update subscription
                    await prisma.subscription.upsert({
                        where: { userId },
                        update: {
                            status: "active",
                            plan,
                            stripeCustomerId: session.customer as string,
                        },
                        create: {
                            userId,
                            status: "active",
                            plan,
                            stripeCustomerId: session.customer as string,
                        },
                    });
                    
                    console.log(`User ${userId} subscription activated for ${plan} plan`);
                }
                break;
            }
            
            case "customer.subscription.updated": {
                const subscription = event.data.object as Stripe.Subscription;
                const stripeCustomerId = subscription.customer as string;
                
                // Find user by Stripe customer ID
                const userSubscription = await prisma.subscription.findFirst({
                    where: { stripeCustomerId },
                });
                
                if (userSubscription) {
                    await prisma.subscription.update({
                        where: { id: userSubscription.id },
                        data: {
                            status: subscription.status,
                        },
                    });
                    
                    console.log(`Subscription updated for customer ${stripeCustomerId}: ${subscription.status}`);
                }
                break;
            }
            
            case "customer.subscription.deleted": {
                const subscription = event.data.object as Stripe.Subscription;
                const stripeCustomerId = subscription.customer as string;
                
                const userSubscription = await prisma.subscription.findFirst({
                    where: { stripeCustomerId },
                });
                
                if (userSubscription) {
                    await prisma.subscription.update({
                        where: { id: userSubscription.id },
                        data: {
                            status: "canceled",
                        },
                    });
                    
                    console.log(`Subscription canceled for customer ${stripeCustomerId}`);
                }
                break;
            }
        }

        return new NextResponse(null, { status: 200 });
    } catch (error) {
        console.error("Error processing webhook:", error);
        return new NextResponse("Webhook handler failed", { status: 500 });
    }
} 