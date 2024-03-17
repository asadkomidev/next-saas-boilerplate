"use client";

import { ArrowRight } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { trpc } from "@/modules/trpc/trpc-client";

type Props = {
  priceId: string;
};

const UpgradeButton = ({ priceId: id }: Props) => {
  const onSubmit = async (priceId: string) => {
    const data = await trpc.createStripeSession.mutate({ priceId });
    if (data.url) {
      window.location.href = data.url;
    } else {
      toast.error("Failed to create a session");
    }
  };

  return (
    <Button onClick={() => onSubmit(id)} className="w-full">
      Upgrade now <ArrowRight className="h-5 w-5 ml-1.5" />
    </Button>
  );
};

export default UpgradeButton;
