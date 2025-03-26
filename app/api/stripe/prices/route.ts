import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2025-02-24.acacia",
});

export async function GET() {
    try {
        const prices = await stripe.prices.list({
            active: true,
            expand: ["data.product"],
        });

        // Transform the prices into a more usable format
        const formattedPrices = prices.data.map((price) => {
            const product = price.product as Stripe.Product;
            return {
                id: price.id,
                productId: product.id,
                name: product.name,
                description: product.description,
                features: product.metadata.features ? JSON.parse(product.metadata.features) : [],
                price: ((price.unit_amount ?? 0) / 100).toString(),
                period: price.recurring?.interval || "one-time",
                popular: product.metadata.popular === "true",
            };
        });

        return NextResponse.json(formattedPrices);
    } catch (error) {
        console.error("Error fetching prices:", error);
        return NextResponse.json(
            { error: "Failed to fetch prices" },
            { status: 500 }
        );
    }
} 