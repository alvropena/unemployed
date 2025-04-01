import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const session = await auth();
    const userId = session.userId;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const subscription = await db.subscription.findUnique({
      where: { userId },
    });

    const hasActiveSubscription = subscription?.status === "active";

    return NextResponse.json({ hasActiveSubscription });
  } catch (error) {
    console.error("Error checking subscription status:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
} 