"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

function BackButton() {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => router.back()}
      className="mb-4 gap-1 pl-2 text-muted-foreground hover:text-foreground transition-colors"
    >
      <ChevronLeft className="h-4 w-4" />
      Back
    </Button>
  );
}

export default BackButton;
