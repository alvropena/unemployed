import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const authResult = await auth();
  const userId = authResult.userId;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // First check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        subscription: true
      }
    });

    if (!user) {
      return NextResponse.json({ 
        hasActiveSubscription: false,
        subscription: null
      });
    }

    const subscription = user.subscription;

    // Check if subscription exists and is active
    const hasActiveSubscription = Boolean(subscription && subscription.status === "active");

    return NextResponse.json({ 
      subscription,
      hasActiveSubscription
    });
  } catch (error) {
    console.error("Error fetching subscription:", error);
    return NextResponse.json({ 
      error: "Failed to fetch subscription",
      hasActiveSubscription: false
    }, { status: 500 });
  }
} 