import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";

function isPremiumActive(status: Stripe.Subscription.Status) {
  return status === "active" || status === "trialing";
}

const syncSubscription = async (subscription: Stripe.Subscription) => {
  const currentPeriodEndUnix = subscription.items.data[0]?.current_period_end;
  const customerId =
    typeof subscription.customer === "string"
      ? subscription.customer
      : subscription.customer?.id;
  const metadataCustomerId = subscription.metadata?.userId;

  const whereCondition = metadataCustomerId
    ? { OR: [{ stripeCustomerId: customerId }, { id: metadataCustomerId }] }
    : { stripeCustomerId: customerId };

  const user = await prisma.user.findFirst({
    where: whereCondition,
    select: { id: true },
  });

  if (!user) return;

  await prisma.user.update({
    where: { id: user.id },
    data: {
      stripeCustomerId: customerId,
      stripeSubscriptionId: subscription.id,
      isPremium: isPremiumActive(subscription.status),
      premiumExpiresAt:
        typeof currentPeriodEndUnix === "number"
          ? new Date(currentPeriodEndUnix * 1000)
          : null,
    },
  });
};

const syncInvoice = async (invoice: Stripe.Invoice) => {
  const customerId =
    typeof invoice.customer === "string"
      ? invoice.customer
      : invoice.customer?.id;

  if (customerId) {
    await prisma.user.update({
      where: { stripeCustomerId: customerId },
      data: {
        premiumAmount: invoice.amount_paid,
        premiumCurrency: invoice.currency,
        premiumLastPaymentAt: new Date(invoice.created * 1000),
      },
    });
  }
};

export async function POST(req: Request) {
  const signature = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

  if (!signature || !webhookSecret) {
    return new Response("Missing stripe webhook config", { status: 400 });
  }

  const payload = await req.text();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (error) {
    console.error(error);
    return new Response("Invalid signature", { status: 400 });
  }

  try {
    if (
      event.type === "customer.subscription.created" ||
      event.type === "customer.subscription.updated" ||
      event.type === "customer.subscription.deleted"
    ) {
      const subscription = event.data.object as Stripe.Subscription;
      await syncSubscription(subscription);
    }

    if (event.type === "invoice.payment_succeeded") {
      const invoice = event.data.object as Stripe.Invoice;
      await syncInvoice(invoice);
    }

    return new Response("ok", { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Webhook failed", { status: 500 });
  }
}
