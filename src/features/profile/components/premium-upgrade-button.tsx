"use client";

import { useAction } from "next-safe-action/hooks";
import { createPremiumCheckout } from "../actions/create-premium-checkout";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

function PremiumUpgradeButton() {
  const { execute, isPending } = useAction(createPremiumCheckout, {
    onSuccess: ({ data }) => {
      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.error("Unable to reach checkout url!");
      }
    },
    onError: () => {
      toast.error("Unable to reach checkout!");
    },
  });

  return (
    <div className="float-right">
      <Button onClick={() => execute({})} disabled={isPending}>
        {isPending ? "Redirecting..." : "Buy Premium"}
      </Button>
    </div>
  );
}

export default PremiumUpgradeButton;
