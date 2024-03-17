"use client";

import { ExtendedUser } from "@/next-auth";
import PageWrapper from "../components/page-wrapper";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { pricingPlans } from "../data/pricing-plans";
import { PLANS } from "@/modules/stripe/plans";
import { cn } from "@/lib/utils";
import { ArrowRight, Check, HelpCircle, Minus } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import UpgradeButton from "../components/upgrade-button";

type Props = {
  user: ExtendedUser | null;
};

export const PricingPage = ({ user }: Props) => {
  return (
    <PageWrapper className="text-center mb-8 mt-24">
      <div className="mx-auto mb-10 sm:max-w-lg">
        <h1 className="text-5xl font-bold text-center">Pricing page</h1>
        <p className="text-muted-foreground text-center mt-4">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe
          voluptates fugit delectus tempore facilis nihil aliquid assumenda quos
          ut est rem nulla animi similique.
        </p>
      </div>
      <div className="pt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <TooltipProvider>
          {pricingPlans.map(({ plan, tagline, quota, features }, i) => {
            const price = PLANS.find((p) => p.name === plan)?.price.amount || 0;
            return (
              <div
                key={i}
                className={cn("relative rounded-lg bg-background shadow-sm", {
                  "border-2 border-blue-600 shadow-blue-200": plan === "Pro",
                  "border border-gray-200": plan !== "Pro",
                })}>
                {plan === "Plan One" && (
                  <div className="absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 px-3 py-2 text-sm font-medium text-white">
                    Upgrade now
                  </div>
                )}
                <div className="p-5">
                  <h3 className="my-3 text-center font-display text-3xl font-bold">
                    {plan}
                  </h3>
                  <p className="text-gray-500">{tagline}</p>
                  <p className="my-5 font-display text-6xl font-semibold">
                    ${price}
                  </p>
                  <p className="text-gray-500">per month</p>
                </div>
                <div className="flex h-20 items-center justify-center border-b border-t bg-background ">
                  <div className="flex items-center space-x-1">
                    <p className="">
                      {quota.toLocaleString()} PDFs/mo included
                    </p>

                    <Tooltip delayDuration={300}>
                      <TooltipTrigger className="cursor-default ml-1.5">
                        <HelpCircle className="h-4 w-4 text-zinc-500" />
                      </TooltipTrigger>
                      <TooltipContent className="w-80 p-2">
                        How many PDFs you can upload per month.
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
                <ul className="my-10 space-y-5 px-8">
                  {features.map(({ text, footnote, negative }) => (
                    <li key={text} className="flex space-x-5">
                      <div className="flex-shrink-0">
                        {negative ? (
                          <Minus className="h-6 w-6 text-gray-300" />
                        ) : (
                          <Check className="h-6 w-6 text-blue-500" />
                        )}
                      </div>
                      {footnote ? (
                        <div className="flex items-center space-x-1">
                          <p
                            className={cn("text-gray-600", {
                              "text-gray-400": negative,
                            })}>
                            {text}
                          </p>
                          <Tooltip delayDuration={300}>
                            <TooltipTrigger className="cursor-default ml-1.5">
                              <HelpCircle className="h-4 w-4 text-zinc-500" />
                            </TooltipTrigger>
                            <TooltipContent className="w-80 p-2">
                              {footnote}
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      ) : (
                        <p
                          className={cn("text-gray-600", {
                            "text-gray-400": negative,
                          })}>
                          {text}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
                <div className="border-t border-gray-200" />
                <div className="p-5">
                  {plan === "Free" ? (
                    <Link
                      href={user ? "/account" : "/auth/signin"}
                      className={buttonVariants({
                        className: "w-full",
                        variant: "secondary",
                      })}>
                      {user ? "Upgrade now" : "Sign in"}
                      <ArrowRight className="h-5 w-5 ml-1.5" />
                    </Link>
                  ) : user ? (
                    <UpgradeButton priceId={PLANS[i].price.priceIds.test} />
                  ) : (
                    <Link
                      href="/auth/signin"
                      className={buttonVariants({
                        className: "w-full",
                      })}>
                      {user ? "Upgrade now" : "Sign in"}
                      <ArrowRight className="h-5 w-5 ml-1.5" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </TooltipProvider>
      </div>
    </PageWrapper>
  );
};
