import { getUser } from "@/modules/auth/lib/get-user";
import { PricingPage } from "@/modules/pricing/pages/pricing-page";
import { User } from "@prisma/client";

export default async function Page() {
  const user = await getUser();

  return <PricingPage user={user || null} />;
}
