"use client";

import { ExtendedUser } from "@/next-auth";
import PageWrapper from "../components/page-wrapper";
import { pricingPlans } from "../data/pricing-plans";
import { PlanCards } from "../components/plan-cards";

type Props = {
  user: ExtendedUser | null;
};

export const PricingPage = ({ user }: Props) => {
  return (
    <PageWrapper className="text-center mb-8 mt-24">
      <div className="mx-auto mb-10 sm:max-w-3xl">
        <p className="font-bold text-blue-600">Pricing</p>
        <h1 className="text-3xl md:text-5xl font-bold text-center">
          Simple and transparent pricing.
        </h1>
        <p className="text-muted-foreground text-center mt-4 max-w-2xl mx-auto">
          Choose the plan that works best for your team. All plans include a
          14-day free trial. No credit card required. You can cancel at any
          time.
        </p>
      </div>
      <div className="pt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* @ts-ignore */}
        <PlanCards data={pricingPlans} user={user} />
      </div>
    </PageWrapper>
  );
};
