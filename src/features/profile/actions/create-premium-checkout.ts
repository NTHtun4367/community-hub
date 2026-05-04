"use server";

import { getSession } from "@/lib/get-session";
import { prisma } from "@/lib/prisma";
import { actionClient } from "@/lib/safe-action";
import { stripe } from "@/lib/stripe";
import { profilePath, signInPath } from "@/path";
import { redirect } from "next/navigation";
import z from "zod";

const createPreimumCheckoutSchema = z.object({});

export const createPremiumCheckout = actionClient
  .inputSchema(createPreimumCheckoutSchema)
  .action(async () => {
    const session = await getSession();

    if (!session) {
      redirect(signInPath);
    }

    const siteUrl = process.env.NEXT_PUBLIC_APP_URL;
    const priceId = process.env.STRIPE_PREMIUM_PRICE_ID;

    if (!siteUrl || !priceId) {
      throw new Error("Stripe env variables are missing!");
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        email: true,
        name: true,
        stripeCustomerId: true,
      },
    });

    if (!user) {
      throw new Error("User not found!");
    }

    let customerId = user.stripeCustomerId;

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name,
        metadata: {
          userId: session.user.id,
        },
      });

      customerId = customer.id;

      await prisma.user.update({
        where: { id: session.user.id },
        data: { stripeCustomerId: customerId },
      });
    }

    const checkout = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: customerId,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${siteUrl}${profilePath}?checkout=success`,
      cancel_url: `${siteUrl}${profilePath}?checkout=cancelled`,
      subscription_data: {
        metadata: {
          userId: session.user.id,
        },
      },
    });

    return { url: checkout.url };
  });
