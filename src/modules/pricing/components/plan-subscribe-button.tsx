import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { trpc } from "@/modules/trpc/trpc-client";
import { ExtendedUser } from "@/next-auth";
import Link from "next/link";
import { toast } from "sonner";

type Props = {
  plan: string;
  user: ExtendedUser | null;
  className?: string;
  id: string;
  popular?: boolean;
};

export const PlanSubscribeButton = ({
  plan,
  user,
  className,
  id,
  popular,
}: Props) => {
  const onSubmit = async (priceId: string) => {
    const data = await trpc.createStripeSession.mutate({ priceId });
    if (data.url) {
      window.location.href = data.url;
    } else {
      toast.error("Failed to create a session");
    }
  };

  return (
    <div className="px-5">
      {plan === "Free" ? (
        <Link
          href={user ? "/account" : "/auth/signin"}
          className={buttonVariants({
            className: "w-full",
            variant: "secondary",
          })}>
          {user ? "Upgrade now" : "Sign in"}
        </Link>
      ) : user ? (
        <Button
          onClick={() => onSubmit(id)}
          className={cn("w-full", className)}>
          Upgrade now
        </Button>
      ) : (
        <Link
          href="/auth/signin"
          className={buttonVariants({
            className: popular
              ? "w-full bg-blue-600 text-white hover:bg-blue-700"
              : "w-full",
          })}>
          {user ? "Upgrade now" : "Sign in"}
        </Link>
      )}
    </div>
  );
};
