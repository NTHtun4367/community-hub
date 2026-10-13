import Stripe from "stripe";

const secretKey = process.env.STRIPE_SECRET_KEY;

export const getStripe = () => {
  if (!secretKey) {
    throw new Error("STRIPE_SECRET_KEY is required for premium billing.");
  }

  return new Stripe(secretKey, { apiVersion: "2026-04-22.dahlia" });
};
