import { NextResponse } from "next/server";
import { currentUser, auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function GET() {
    const { userId } = await auth();

    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get users's personal information
    const user = await currentUser();

    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    let dbUser = await db.user.findUnique({
        where: {
            id: userId,
        },
    });

    if (!dbUser) {
        dbUser = await db.user.create({
            data: {
                id: userId,
                email: user.emailAddresses[0]?.emailAddress || null,
                personal: {
                    create: {
                        name: user.firstName && user.lastName 
                            ? `${user.firstName} ${user.lastName}` 
                            : null,
                        email: user.emailAddresses[0]?.emailAddress || null,
                    }
                }
            },
        });
    }

    return NextResponse.json({ user: dbUser });
}