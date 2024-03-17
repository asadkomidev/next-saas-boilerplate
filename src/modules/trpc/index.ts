import { TRPCError } from "@trpc/server";
import { absoluteUrl } from "@/lib/absolute-url";
import { db } from "@/prisma-client";
import { z } from "zod";

import { privateProcedure, router } from "./trpc";
import { getUserSubscriptionPlan, stripe } from "../stripe/stripe";

export const appRouter = router({
  createStripeSession: privateProcedure
    .input(
      z.object({
        priceId: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;

      const billingUrl = absoluteUrl("/billing");

      if (!userId) throw new TRPCError({ code: "UNAUTHORIZED" });

      const dbUser = await db.user.findFirst({
        where: {
          id: userId,
        },
      });

      if (!dbUser) throw new TRPCError({ code: "UNAUTHORIZED" });

      const subscriptionPlan = await getUserSubscriptionPlan();

      if (subscriptionPlan.isSubscribed && dbUser.stripeCustomerId) {
        const stripeSession = await stripe.billingPortal.sessions.create({
          customer: dbUser.stripeCustomerId,
          return_url: billingUrl,
        });

        return { url: stripeSession.url };
      }

      const stripeSession = await stripe.checkout.sessions.create({
        success_url: billingUrl,
        cancel_url: billingUrl,
        payment_method_types: ["card", "paypal"],
        mode: "subscription",
        billing_address_collection: "auto",
        line_items: [
          {
            price: input.priceId,
            quantity: 1,
          },
        ],
        metadata: {
          userId: userId,
        },
      });

      return { url: stripeSession.url };
    }),
});

export type AppRouter = typeof appRouter;
