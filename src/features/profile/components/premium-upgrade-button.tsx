"use client";

import { useAction } from "next-safe-action/hooks";
import { createPremiumCheckout } from "../actions/create-premium-checkout";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Loader2, Zap } from "lucide-react";

function PremiumUpgradeButton() {
  const { execute, isPending } = useAction(createPremiumCheckout, {
    onSuccess: ({ data }) => {
      if (data?.url) {
        window.location.href = data.url;
      } else {
        toast.error("Could not find checkout URL");
      }
    },
    onError: () => {
      toast.error("Failed to initiate checkout");
    },
  });

  return (
    <Button
      size="lg"
      className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-full shadow-lg transition-transform active:scale-95"
      onClick={() => execute({})}
      disabled={isPending}
    >
      {isPending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Preparing...
        </>
      ) : (
        <>
          <Zap className="mr-2 h-4 w-4 fill-current" />
          Upgrade to Premium
        </>
      )}
    </Button>
  );
}

export default PremiumUpgradeButton;
