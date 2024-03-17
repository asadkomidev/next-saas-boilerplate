import { BillingPage } from "@/modules/billing/pages/billing-page";
import { getUserSubscriptionPlan } from "@/modules/stripe/stripe";

export default async function Page() {
  const plan = await getUserSubscriptionPlan();
  return <BillingPage plan={plan} />;
}
