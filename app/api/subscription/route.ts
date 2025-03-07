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
    const subscription = await prisma.subscription.findUnique({
      where: { userId },
    });

    return NextResponse.json({ 
      subscription,
      hasActiveSubscription: subscription?.status === "active"
    });
  } catch (error) {
    console.error("Error fetching subscription:", error);
    return NextResponse.json({ 
      error: "Failed to fetch subscription",
      hasActiveSubscription: false
    }, { status: 500 });
  }
} 