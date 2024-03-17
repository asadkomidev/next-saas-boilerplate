"use client";

import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { PLANS } from "@/modules/stripe/plans";
import { ExtendedUser } from "@/next-auth";
import { pricingPlansType } from "../types/type-pricing-plan";
import { PlanFeature } from "./plan-features";
import { PlanSubscribeButton } from "./plan-subscribe-button";

type Props = {
  data: pricingPlansType[];
  user: ExtendedUser | null;
};

export const PlanCards = ({ data, user }: Props) => {
  return (
    <TooltipProvider>
      {data.map(({ plan, tagline, popular, features }, i) => {
        const price = PLANS.find((p) => p.name === plan)?.price.amount || 0;
        return (
          <div
            key={i}
            className={cn("relative rounded-lg bg-background shadow-sm", {
              "border border-blue-600": popular,
              "border ": popular === false,
            })}>
            {popular && (
              <div className="absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full bg-blue-600 px-3 py-2 text-sm font-medium text-white">
                Most popular
              </div>
            )}
            <div className="p-5">
              <h3 className="my-3 text-center font-display text-3xl font-bold">
                {plan}
              </h3>
              <p className="text-muted-foreground text-sm">{tagline}</p>
              <p className="my-5 font-display text-6xl font-semibold">
                ${price}
                <span className="text-sm text-muted-foreground">/month</span>
              </p>
            </div>
            <PlanSubscribeButton
              plan={plan}
              popular={popular}
              user={user}
              id={PLANS[i].price.priceIds.test}
              className={
                popular ? "bg-blue-600 text-white hover:bg-blue-700" : ""
              }
            />
            <ul className="mb-10 mt-8 space-y-5 px-8">
              {features.map(({ text, footnote, negative }, i) => (
                <PlanFeature
                  key={i}
                  text={text}
                  footnote={footnote}
                  negative={negative}
                />
              ))}
            </ul>
          </div>
        );
      })}
    </TooltipProvider>
  );
};
