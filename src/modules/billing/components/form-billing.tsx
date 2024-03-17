"use client";

import { getUserSubscriptionPlan } from "@/modules/stripe/stripe";
import { trpc } from "@/modules/trpc/trpc-client";
import { toast } from "sonner";
import { format } from "date-fns";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useTransition } from "react";

type Props = {
  plan: Awaited<ReturnType<typeof getUserSubscriptionPlan>>;
};

export const BillingForm = ({ plan }: Props) => {
  const [isPending, startTransition] = useTransition();
  console.log("srv: plan: ", plan);

  const onSubmit = () => {
    startTransition(async () => {
      const data = await trpc.createStripeSession.mutate({});
      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.error("Failed to create a session");
      }
    });
  };
  return (
    <form
      className=""
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}>
      <Card>
        <CardHeader>
          <CardTitle>Subscription Plan</CardTitle>
          <CardDescription>
            You are currently on the <strong>{plan.name}</strong> plan.
          </CardDescription>
        </CardHeader>

        <CardFooter className="flex flex-col items-start space-y-2 md:flex-row md:justify-between md:space-x-0">
          <Button type="submit">
            {isPending ? (
              <Loader2 className="mr-4 h-4 w-4 animate-spin" />
            ) : null}
            {plan.isSubscribed ? "Manage Subscription" : "Upgrade now"}
          </Button>

          {plan.isSubscribed ? (
            <p className="rounded-full text-xs font-medium">
              {plan.isCanceled
                ? "Your plan will be canceled on "
                : "Your plan renews on"}
              {format(plan.stripeCurrentPeriodEnd!, "MMM dd, yyyy")}.
            </p>
          ) : null}
        </CardFooter>
      </Card>
    </form>
  );
};
