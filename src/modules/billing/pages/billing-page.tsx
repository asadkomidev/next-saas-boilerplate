import { getUserSubscriptionPlan } from "@/modules/stripe/stripe";
import { BillingForm } from "../components/form-billing";
import { AccountPageLayout } from "@/modules/shared/layouts/account-page-layout";
import { Suspense } from "react";
import { AccountSkeleton } from "@/modules/account/components/account-skeleton";

type Props = {
  plan: Awaited<ReturnType<typeof getUserSubscriptionPlan>>;
};

export const BillingPage = ({ plan }: Props) => {
  return (
    <AccountPageLayout title="Billing" description="Manage your billing here.">
      <Suspense fallback={<AccountSkeleton />}>
        <BillingForm plan={plan} />
      </Suspense>
    </AccountPageLayout>
  );
};
